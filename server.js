require('dotenv').config();  
const mongoose = require('mongoose');  
const express = require('express'); 
const userRoutes = require('./routes/userRoutes');  

const app = express();


app.use(express.json());


const dbURI = process.env.MONGODB_URI;  
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.use('/api/users', userRoutes); 


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
