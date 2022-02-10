const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    age: {
      type: Number
    },
    role: {
      type: String
    },
    deletedAt: {
      type: Date,
      default: new Date()
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Deleted', 'Active', 'Pending'],
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)