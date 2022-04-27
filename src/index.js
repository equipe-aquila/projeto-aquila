const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const db = require('./queries/queriesUsuario')
const db2 = require('./queries/queriesPrestador')
const db3 = require('./queries/queriesServicos')
const db4 = require('./queries/queriesAgendamentos')
const db5 = require('./queries/queriesFavoritos')
const db6 = require('./queries/queriesMeio_Pagamentos')
const db7 = require('./queries/queriesAvaliacao')

const port = 3000
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

/*app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});*/

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

app.get('/agendamentos', db4.getAgendamentos)
app.get('/agendamentos/:id', db4.getAgendamentosById)
app.post('/agendamentos', db4.createAgendamento)
app.put('/agendamentos/:id', db4.updateAgendamento)
app.delete('/agendamentos/:id', db4.deleteAgendamento)

app.get('/favoritos', db5.getFavoritos)
app.get('/favoritos/:id', db5.getFavoritosById)
app.post('/favoritos', db5.createFavoritos)
app.put('/favoritos/:id', db5.updateFavoritos)
app.delete('/favoritos/:id', db5.deleteFavoritos)

app.get('/meioPagamentos', db6.getMeioPagamentos)
app.get('/meioPagamentos/:id', db6.getMeioPagamentosById)
app.post('/meioPagamentos', db6.createMeioPagamentos)
app.put('/meioPagamentos/:id', db6.updateMeioPagamentos)
app.delete('/meioPagamentos/:id', db6.deleteMeioPagamentos)

app.get('/avaliacao', db7.getAvaliacao)
app.get('/avaliacao/:id', db7.getAvaliacaoById)
app.post('/avaliacao', db7.createAvaliacao)
app.put('/avaliacao/:id', db7.updateAvaliacao)
app.delete('/avaliacao/:id', db7.deleteAvaliacao)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
app.listen(PORT, HOST, () => {
  console.log('Server started on ' + HOST + ':' + PORT);
})


