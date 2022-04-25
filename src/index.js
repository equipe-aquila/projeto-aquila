const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const db = require('./queries/queriesUsuario')
const db2 = require('./queries/queriesPrestador')
const db3 = require('./queries/queriesServicos')
const port = 3000
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
//var fs = require('fs');
//var http = require('http');
//var https = require('https');
//var privateKey  = fs.readFileSync('certificado.key', 'utf8');
//var certificate = fs.readFileSync('certificado.cert', 'utf8');


//var credentials = {key: privateKey, cert: certificate};
//var express = require('express');
//var app = express();

// your express configuration here
/*app.get('/', function(req,res) {
    res.send('hello');
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, function () {
    console.log("JSON Server is running on  http://localhost:" + 8080);
});
httpsServer.listen(3000, function () {
    console.log("JSON Server is running on  https://localhost:" + 3000);
    app.use((req, res, next) => {
      //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
        res.header("Access-Control-Allow-Origin", "*");
      //Quais são os métodos que a conexão pode realizar na API
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        app.use(cors());
        next();
    });
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    app.get('/', (request, response) => {
      response.json({ info: 'Node.js, Express, and Postgres API' })
    })
    app.get('/usuarios', db.getUsers)
});*/

/*var fs = require('fs');
const https = require("https");

const options = {
  key: fs.readFileSync("certificado.key"),
  cert: fs.readFileSync("certificado.cert")
};
https
  .createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("Hello world using HTTPS!\n");
 // })
 // .listen(3000);*/


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

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

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
app.listen(PORT, HOST, () => {
  console.log('Server started on ' + HOST + ':' + PORT);
})


