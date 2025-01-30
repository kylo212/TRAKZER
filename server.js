require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const dbURI = process.env.MONGODB_URI;

console.log("MongoDB URI:", dbURI);

mongoose.set('strictQuery', false);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
