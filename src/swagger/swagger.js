const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'API',
  },
  host: 'localhost:8080',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    access_token: {
      type: 'apiKey',
      in: 'header', // can be "header", "query" or "cookie"
      name: 'access_token', // name of the header, query parameter or cookie
      description: 'Please enter a valid token to test the requests below...',
    },
  },
}

const outputFile = './src/swagger/swagger_output.json'
const endpointsFiles = ['./src/api/core/routes/index.ts', './src/api/core/routes/*.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)
