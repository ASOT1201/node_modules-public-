const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature']
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  let event

  try {
    // use raw body for signature verification; Vercel provides req.rawBody
    event = stripe.webhooks.constructEvent(req.rawBody, sig, secret)
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch(event.type) {
      case 'invoice.paid': {
        const invoice = event.data.object
        const customerId = invoice.customer
        // update student status to active
        const { data: students } = await supabase.from('students').select('id').eq('stripe_customer_id', customerId).limit(1)
        if(students && students[0]) {
          await supabase.from('students').update({ status: 'active' }).eq('id', students[0].id)
        }
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object
        const customerId = invoice.customer
        const { data: students } = await supabase.from('students').select('id').eq('stripe_customer_id', customerId).limit(1)
        if(students && students[0]) {
          await supabase.from('students').update({ status: 'past_due' }).eq('id', students[0].id)
        }
        break
      }
      // handle other events as needed
    }

    res.json({ received: true })
  } catch (err) {
    console.error('Error handling webhook', err)
    res.status(500).send('Server error')
  }
}

