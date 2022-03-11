require('dotenv').config();

const mongoose = require('mongoose');

const URI = process.env.MONGO_URI

async function connectDB() {

  // await mongoose.connect(URI).catch((err) => {
  //   console.log(err)
  // })

  try {
   await mongoose.connect(URI, { useNewUrlParser: true })
  } catch(err) {
    console.log(err)
    process.exit(1);
  }
  
}

module.exports = connectDB