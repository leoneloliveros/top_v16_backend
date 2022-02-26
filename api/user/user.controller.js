const User = require('./user.model')
const { sendEmail } = require('../../utils/email')
const crypto = require('crypto')

async function getAllUsers(req, res) {
  const { status } = req.query
  console.log("🚀 ~ file: user.controller.js ~ line 5 ~ getAllUsers ~ status", status)
  //llegamos
  try {
    const users = await User.find({ }) 
    res.status(200).json({ users })
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
}

async function getUserById(req, res) {
  const { id } = req.params
  try {
    const user = await User.findById(id) 
    res.status(200).json(user)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
}

async function createUser(req, res, next) {
  const info = req.body;
  // info.password = 
  try {
    const hash = crypto
      .createHash('sha256')
      .update(info.email)
      .digest('hex')

      info.passwordResetToken = hash
      info.passwordResetExpires = Date.now() + 3600000 * 24
      console.log("🚀 ~ file: user.controller.js ~ line 39 ~ createUser ~ info", info)
      
      const user = await User.create(info)

      const email = {
        to: user.email,
        subject: 'Activate your account',
        template_id: 'd-7f1ed07a54f24fc1aa0cec826b1aa79b',
        dynamic_template_data: {
          name: user.firstName,
          url: `http://localhost:3000/activate/${hash}`
        }
      }

      sendEmail(email)
      return res.status(200).json(user)
    
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  } 
}

async function updateUser(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(user)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
}

async function deleteUser(req, res) {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)
    res.status(200).json({ message: 'User deleted succesfully', user})
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}