const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const crypto = require('crypto')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)

function hmacLast4(last4){
  const key = process.env.HMAC_KEY
  return crypto.createHmac('sha256', key).update(last4).digest('hex')
}

module.exports = async (req, res) => {
  try {
    if(req.method !== 'POST') return res.status(405).send('Method Not Allowed')
    const { fullName, email, phone, lastNamePrefix, last4SSN, useSSN, moduleId } = req.body

    // basic validation
    if(!fullName || !email) return res.status(400).send('Missing required fields')

    // create stripe customer
    const customer = await stripe.customers.create({ email, name: fullName, phone })

    // compute hashed last4 if provided
    let last4_hmac = null
    if(useSSN && last4SSN && /^[0-9]{4}$/.test(last4SSN)){
      last4_hmac = hmacLast4(last4SSN)
    }

    // create a student row in Supabase
    const studentID = (lastNamePrefix ? lastNamePrefix.slice(0,2).toUpperCase() : fullName.slice(0,2).toUpperCase()) + '----' // placeholder; set real ID on verification or via separate generator
    const { data, error } = await supabase
      .from('students')
      .insert([{ full_name: fullName, email, phone, last_name_prefix: lastNamePrefix, last4_ssn_hmac: last4_hmac, stripe_customer_id: customer.id, status: 'pending', student_id: studentID }])
      .select()
    if(error) throw error

    // Create a Stripe Checkout session for a subscription product price already set in your Stripe dashboard
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_MONTHLY_PRICE_ID, quantity: 1 }],
      customer: customer.id,
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL}`,
      metadata: { student_supabase_id: data[0].id }
    })

    res.json({ checkoutUrl: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

