const { Router } = require('express');
const { get, append } = require('express/lib/response');
const User = require('./user.model')

const router = Router()


//CRUD


// function routes(app) {

// }
// todos los elementos de una collection R
router.get('/', async (req, res) => {
  const { status } = req.query
  try {
    const user = await User.find({ status }) 
    res.status(200).json(user)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
})

// router.get('/status/:status', async (req, res) => {
//   const { status } = req.params
//   try {
//     const user = await User.find({ status }) 
//     res.status(200).json(user)
//   } catch(err) {
//     console.log(err)
//     res.status(400).json({ error: err})
//   }
// })

router.get('/:id', async (req, res) => { //6201bb235ba27501e3d9190d
  const { id } = req.params
  try {
    const user = await User.findById(id) 
    res.status(200).json(user)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
})


router.post('/', async (req, res) => {
  const info = req.body;
  try {
    const user = await User.create(info)
    res.status(200).json(user)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
  
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const info = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(user)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
})

// router.delete('/', async (req, res) => {
//   const info = req.body;
//   const user = await User.create(info)
//   res.status(200).json(user)
// })





module.exports = router