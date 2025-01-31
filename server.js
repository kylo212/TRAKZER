require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const dbURI = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err))

const User = require('./models/User')

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' })
  }
}

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' })
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'All fields are required' })
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error })
  }
})

app.get('/map', authenticate, (req, res) => res.sendFile(path.join(__dirname, 'public', 'map.html')))
app.get('/dm', authenticate, (req, res) => res.sendFile(path.join(__dirname, 'public', 'dm.html')))

const postsRoutes = require('./routes/posts')
app.use('/api', postsRoutes)

io.on('connection', socket => {
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('sendMessage', message => {
    io.emit('receiveMessage', message)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
