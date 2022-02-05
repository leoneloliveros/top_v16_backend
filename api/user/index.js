const { Router } = require('express');
const { get, append } = require('express/lib/response');
const User = require('./user.model')

const router = Router()

// todos los elementos de una collection R
router.get('/users', async (req, res) => {
  const user = await User.find()
  res.status(200).json(user)
})




module.exports = router