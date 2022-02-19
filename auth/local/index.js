const { Router } = require('express');
const { loginUserHandler } = require('./user.controller')

const router = Router()


router.post('/login', loginUserHandler)
router.post('/register', loginUserHandler)
router.post('/verify-email', loginUserHandler)