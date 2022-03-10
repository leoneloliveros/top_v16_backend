const express = require('express')
const { connectDB } = require('./config/database')

const expressConfig = require('./config/express')
const routes = require('./routes')

const app = express()

//connection to mongo atlas
connectDB(); 

expressConfig(app)
routes(app)

module.exports = app