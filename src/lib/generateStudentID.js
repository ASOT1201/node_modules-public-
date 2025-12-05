export function generateStudentID(prefix = '', last4 = '', useSSN = false){
  function randLetters(n = 2){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return Array.from({length:n}, () => chars[Math.floor(Math.random()*chars.length)]).join('')
  }
  function randDigits(n = 4){
    return Math.floor(Math.random()*Math.pow(10,n)).toString().padStart(n,'0')
  }

  if(useSSN && prefix.length >= 2 && /^[0-9]{4}$/.test(last4)){
    return prefix.slice(0,2).toUpperCase() + last4
  }
  const letters = prefix && prefix.length >= 2 ? prefix.slice(0,2).toUpperCase() : randLetters()
  return letters + randDigits()
}

