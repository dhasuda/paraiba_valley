// Variaveis do servidor
//var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
// Variaveis do banco de dados
var mongoose = require('mongoose');
var db = mongoose.connection;

//Banco de dados - Mongodb
db.on('error', console.error); // Avisa que houve erro na conexao
db.once('open', function(){
	console.log('Conectado ao MongoDB');
});


// aluno
var alunoSchema = new mongoose.Schema({
	nome: String,
	email: String,
	senha: String,
	curso: String,
	serie: String
});

var Aluno = mongoose.model('Aluno', alunoSchema);

// mentor
var mentorSchema = new mongoose.Schema({
	nome: String,
	email: String,
	senha: String,
	curso: String,
	ano: String
});

var Mentor = mongoose.model('Mentor', mentorSchema);

mongoose.connect('mongodb://localhost/test');
*/
// Servidor
function submitAluno(req, res) {
	console.log(req.body.first_name);
	res.send(req.body.first_name);
	//res.writeHead(200, {"Cotent-Type": "text/plain"});
	// res.write('Deu certo');
	// res.end();

	//res.writeHead(200, {"Cotent-Type": "text/html"});
	//fs.createReadStream("./index.html").pipe(res);
}

app.post('/aluno', submitAluno);

app.get('/', function(req, res){
	res.writeHead(200, {"Cotent-Type": "text/html"});
	fs.createReadStream("./index.html").pipe(res);
});

app.listen(8080, function() {
	console.log('app listening port 8080');
});
