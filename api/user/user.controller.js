const User = require('./user.model')
const jsonwebtoken = require('jsonwebtoken')

async function getAllUsers(req, res) {
  const { status } = req.query
  // header
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(400).json('You need a token for this request')
  }

  //comprobar que nuestro token corresponde a nuestra aplicacion y que no ha expirado
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

async function createUser(req, res, next) {
  const info = req.body;
  try {
    const user = await User.create(info)
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

async function getUserByEmail(req, res) {
  const { email } = req.body
  try {
    const user = await User.findOne({ email }) || {}
    res.status(200).json({ message: 'userbyEmail', user })
  } catch(error) {
    res.status(500).json({ error })
  }
}

async function loginUserHandler(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(500).json({ message: "Wrong password"})
    }

    //genere un token
    const token = jsonwebtoken.sign(user.profile, 'holaMundo', {
      expiresIn: '100',
    })
    // return res.status(200).json({ message: "correct login", user: user.profile })
    return res.status(200).json({ message: "correct login", token, user: user.profile })


  } catch(error) {

  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  loginUserHandler
}