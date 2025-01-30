require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbURI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/map', (req, res) => res.sendFile(path.join(__dirname, 'public', 'map.html')));
app.get('/dm', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dm.html')));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
