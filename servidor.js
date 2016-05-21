// Variaveis do servidor
var http = require('http');
var fs = require('fs');
var app = require('express');

// Variaveis do banco de dados
var mongoose = require('mongoose');
var db = mongoose.connection;

/*Banco de dados - Mongodb*/
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

//Servidor
function send404Error(res) {
	res.writeHead(404, {"Content-Type": "text/plain"});
	res.write("Error 404: Page not found");
	res.end();
}

function onRequest(req, res) {

}

http.createServer(onRequest).listen(8080);
console.log("Server is running...");
