const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    age: {
      type: Number
    },
    role: {
      type: String
    }

  },
)

module.exports = mongoose.model('User', UserSchema)