const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      lowercase: true
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', ProductSchema)