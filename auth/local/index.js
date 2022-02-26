const { Router } = require('express');
const { loginUserHandler, verifyAccount } = require('./local.controller')

const router = Router()


router.post('/login', loginUserHandler)
router.post('/register', loginUserHandler)
router.post('/verify-email', verifyAccount)


module.exports = router