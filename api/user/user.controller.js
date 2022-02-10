const User = require('./user.model')

async function getAllUsers(req, res) {
  const { status } = req.query
  try {
    const user = await User.find({ status }) 
    res.status(200).json(user)
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

async function createUser(req, res) {
  const info = req.body;
  try {
    const user = await User.create(info)
    res.status(200).json(user)
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

async function getUserByEmail(req, res) {
  const { email } = req.body
  try {
    const user = await User.findOne({ email }) || {}
    res.status(200).json({ message: 'userbyEmail', user })
  } catch(error) {
    res.status(500).json({ error })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
}