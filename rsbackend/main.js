// Lê os dados do arquivo .env
require('dotenv').config();

// Importa os frameworks
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./db');

// Cria o servidor web
const app = express();
const http = require('http').createServer(app);

// Configura o middlewate do servidor web
app.use(express.static('static')); // serve os arquivos que estão na pasta ./static
app.use(cors()); // permite requisições CORS de qualquer host
app.use(cookieParser()); // popula req.cookies (os nomes dos cookies são as chaves)
app.use(express.json()); // popula req.body

// Configura os roteamentos
app.use('/login', require('./controllers/login-controller'));
app.use('/usuarios', require('./controllers/usuario-controller'));
app.use('/postagens', require('./controllers/postagem-controller'));

console.log('Conectadondo ao banco de dados ...');
db.conecta(() => {
  console.log('Conectado ao banco de dados com sucesso');
  http.listen(parseInt(process.env.SERVER_PORT), () => {
    console.log('Servidor iniciado com sucesso');
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
  });
});
