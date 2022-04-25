const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries/queriesUsuario')
const db2 = require('./queries/queriesPrestador')
const db3 = require('./queries/queriesServicos')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/usuarios', db.getUsers)
app.get('/usuario/:id', db.getUserById)
app.post('usuario', db.createUser)
app.put('/usuario/:id', db.updateUser)
app.delete('/usuario/:id', db.deleteUser)

app.get('/prestador', db2.getPrestador)
app.get('/prestador/:id', db2.getPrestadorById)
app.post('/prestador', db2.createPrestador)
app.put('/prestador/:id', db2.updatePrestador)
app.delete('/prestador/:id', db2.deletePrestador)

app.get('/servicos', db3.getServicos)
app.get('/servicos/:id', db3.getServicosById)
app.post('/servicos', db3.createServicos)
app.put('/servicos/:id', db3.updateServicos)
app.delete('/servicos/:id', db3.deleteServicos)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
