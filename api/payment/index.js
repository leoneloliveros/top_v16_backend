const { Router } = require('express')

const { isAuthenticated } = require('../../auth/auth.services')
const { 
  createTokenHandler, 
  createCustomerHandler, 
  makePaymentHandler } = require('./payment.controller')

const router = Router()

router.post('/card-token', isAuthenticated(), createTokenHandler)
router.post('/create-customer', isAuthenticated(), createCustomerHandler)
router.post('/make-payment', isAuthenticated(), makePaymentHandler)

module.exports = router;