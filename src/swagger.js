const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'My API',
        description: 'temple API'
    },
    host: 'apiaquila.herokuapp.com',
    schemes: ['https']
}
const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})
