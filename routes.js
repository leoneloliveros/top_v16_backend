const user = require('./api/user')
// const comment = require('./api/comment')

function routes(app) {
  app.use('/api/users', user)
  // app.use(comment)
  // app.use(likes)
  // app.use(compras)

}

module.exports = routes




