function validateLogin(email, password) {
  if (email.trim() === '' || password.trim() === '') {
    return 'Email and password cannot be empty.'
  }
  if (!email.includes('@')) {
    return 'Email must contain "@".'
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters.'
  }
  return null 
}

document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault() 

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const messageEl = document.getElementById('message')
  const welcomeEl = document.getElementById('welcome')

  const clientError = validateLogin(email, password)
  if (clientError) {
    messageEl.textContent = 'Client-side error: ' + clientError
    return
  }

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    messageEl.textContent = data.message

    if (response.ok) {
      welcomeEl.innerHTML = 'Welcome, ' + email + '!'
    }
  } catch (err) {
    messageEl.textContent = 'Could not reach server. Is it running on port 3001?'
  }
})
