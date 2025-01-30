require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const dbURI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
