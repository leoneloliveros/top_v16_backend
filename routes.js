const user = require('./api/user')
const product = require('./api/product')
const auth = require('./auth/local')

function routes(app) {
  app.use('/api/users', user)
  app.use('/api/products', product)
  app.use('/api/auth', auth)

}

module.exports = routes




