const user = require('./api/user')
// const comment = require('./api/comment')

function routes(app) {
  app.use(user)
  // app.use(comment)
}




