require('dotenv').config();

const express = require('express')
const connectDB = require('./config/database')

const expressConfig = require('./config/express')
const routes = require('./routes')

const swaggerDocs = require('./config/swagger')

const app = express()

const PORT =  process.env.PORT || 3000

app.listen(PORT, () => {



  //connection to mongo atlas
  connectDB(); 

  expressConfig(app)
  routes(app)

  //swagger

  swaggerDocs(app, PORT)

  console.log('Server is running with express')
})