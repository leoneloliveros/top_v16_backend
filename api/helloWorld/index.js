const { Router } = require('express')

const router = Router()

router.get('/helloWorld', (req, res) => {
  res.status(201).json({ message: 'hola mundo' })
})

module.exports = router;