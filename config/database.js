require('dotenv').config();

const mongoose = require('mongoose');

let mongo

const URI = process.env.MONGO_URI

async function connectDB() {

  // await mongoose.connect(URI).then((resp) => {
  //   console.log(resp)
  //   console.log('MongoDB is connected')
  // }).catch((err) => {
  //   console.log(err)
  // })

  try {
    mongo = await mongoose.connect(URI)
  } catch(err) {
    console.log(err)
    process.exit(1);
  }
  
}

module.exports = { connectDB, mongo }