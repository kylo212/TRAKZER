
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

   
    const users = [
      { name: 'Narein Kylo', email: 'nareinjunior7@gmail.com' },
      { name: 'Delick Junior', email: 'nareinkylo@gmail.com' }
    ];


    User.insertMany(users)
      .then(() => {
        console.log("Users inserted!");
        mongoose.connection.close(); 
      })
      .catch((err) => {
        console.log("Error inserting users:", err);
        mongoose.connection.close();
      });

  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
