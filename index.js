require('dotenv').config();
const app = require('./app')

const swaggerDocs = require('./config/swagger')

const PORT =  process.env.PORT || 3000

app.listen(PORT, () => {

  //swagger
  swaggerDocs(app, PORT)

  console.log('Server is running with express')
})
