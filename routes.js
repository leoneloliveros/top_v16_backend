const user = require('./api/user')
const product = require('./api/product')
const helloWorld = require('./api/helloWorld')
const payment = require('./api/payment')
const auth = require('./auth/local')

function routes(app) {
  app.use('/api/users', user)
  app.use('/api/products', product)
  app.use('/api/payments', payment)
  app.use('/api/auth', auth)
  app.use('/', helloWorld)

}

module.exports = routes




