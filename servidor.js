// Variaveis do servidor
//var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Variaveis do banco de dados
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// Banco de dados --------------------------------------------------

var alunoSchema = new mongoose.Schema({
	nome: String
});
var Aluno = mongoose.model('Aluno', alunoSchema);

var novoAluno = new Aluno({
	nome: 'davi'
});

novoAluno.save(function(err, novoAluno) {
	if (err) return console.error(err);
});

// Aluno.remove(function (err) {
//   if (err) return handleError(err);
  // removed!
//});

Aluno.find(function(err, alunos) {
	if (err) return console.error(err);
	console.log(alunos);
})

Aluno.count({}, function( err, count){
    console.log( "Number of users:", count );
})

// Mentor
var mentorSchema = new mongoose.Schema({
	nome: String
});
var Mentor = mongoose.model('Mentor', mentorSchema);



// Servidor --------------------------------------------------------
function submitAluno(req, res) {
	console.log(req.body.first_name);
	res.send(req.body.password);
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
