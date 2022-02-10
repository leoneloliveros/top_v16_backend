const user = require('./api/user')
const product = require('./api/product')

function routes(app) {
  app.use('/api/users', user)
  app.use('/api/products', product)

}

module.exports = routes




