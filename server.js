const express = require('express')

const app = express()
app.use(express.json())

// Serve the frontend
const path = require('path')
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.get('/script.js', (req, res) => res.sendFile(path.join(__dirname, 'script.js')))

function validateLogin(email, password) {
  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return 'Email and password cannot be empty.'
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    return 'Email must contain "@".'
  }
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters.'
  }
  return null
}

app.post('/login', (req, res) => {
  const { email, password } = req.body

  const error = validateLogin(email, password)
  if (error) {
    return res.status(400).json({ message: 'Server-side error: ' + error })
  }

  return res.status(200).json({ message: 'Server-side validation passed. Login accepted.' })
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
