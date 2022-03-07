const path = require('path')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const { version } = require('../package.json')

const routesApi = path.join(__dirname, '../api/**/index.js')
const schemasApi = path.join(__dirname, '../api/**/**.schema.js')

const option = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API Documentation',
      version, 
      description: 'Api description bla bla ',
      lincense: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/'
      },
      contact: {
        name: 'Leonel Oliveros',
        url: 'https://github.com/leoneloliveros',
        email: 'leoneloliveros.co@gmail.com'
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header'
        }
      }
    }
  },
  apis: [schemasApi, routesApi]
}

const swaggerSpec = swaggerJsDoc(option)

function swaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.use('/docs.json', (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(`Swagger is up: localhost:${port}/docs`)
}

module.exports = swaggerDocs