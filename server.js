const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.set('strictQuery', false);

const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
    console.error('MONGODB_URI is missing in environment variables');
    process.exit(1);
}

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const messageController = require('./controllers/messageController');
const postController = require('./controllers/postController');
const authController = require('./controllers/authController');
const postRoutes = require('./routes/postRoutes');

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dm', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dm.html'));
});

app.get('/kyle', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'kyle.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

app.post('/api/messages', messageController.createMessage);
app.get('/api/messages', messageController.getMessages);

app.use('/api/posts', postRoutes);

io.on('connection', (socket) => {
    socket.on('sendMessage', (messageData) => {
        io.emit('newMessage', messageData);
    });

    socket.on('disconnect', () => {});
});

app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong!');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
