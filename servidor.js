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
	usuario: String,
	email: String,
	password: String,
	first_name: String,
	last_name: String,
	decidido: String,
	vestibulares: Array, // Nao esquecer de dar split()
	dificuldades: Array, // Cada elemento do array corresponde a uma materia
	// 1: tem dificuldade; 0: nao tem dificuldade
	// Ordem das materias: mat, fis, quim, bio, hist, geo, port, red, filo, socio
	facilidades: Array,
	serie: String 
});
var Aluno = mongoose.model('Aluno', alunoSchema);

var mentorSchema = new mongoose.Schema ({

});
var Mentor = mongoose.model('Mentor', mentorSchema);

// Servidor --------------------------------------------------------
function onToInt(var str) {
	if (str == 'on') return 1;
	return 0;
}

function submitAl(req, res) {
	if (req.body.password == req.body.password_confirmation){
		var dif = [];
		var fac = [];

		dif.push(onToInt(req.body.dificuldade_mat));
		dif.push(onToInt(req.body.dificuldade_fis));
		dif.push(onToInt(req.body.dificuldade_quim));
		dif.push(onToInt(req.body.dificuldade_bio));
		dif.push(onToInt(req.body.dificuldade_hist));
		dif.push(onToInt(req.body.dificuldade_geo));
		dif.push(onToInt(req.body.dificuldade_port));
		dif.push(onToInt(req.body.dificuldade_red));
		dif.push(onToInt(req.body.dificuldade_filo));
		dif.push(onToInt(req.body.dificuldade_socio));
		fac.push(onToInt(req.body.facilidade_mat));
		fac.push(onToInt(req.body.facilidade_fis));
		fac.push(onToInt(req.body.facilidade_quim));
		fac.push(onToInt(req.body.facilidade_bio));
		fac.push(onToInt(req.body.facilidade_hist));
		fac.push(onToInt(req.body.facilidade_geo));
		fac.push(onToInt(req.body.facilidade_port));
		fac.push(onToInt(req.body.facilidade_red));
		fac.push(onToInt(req.body.facilidade_filo));
		fac.push(onToInt(req.body.facilidade_socio));

		var novoAluno = new Aluno({
			usuario: req.body.usuario,
			email: req.body.email,
			password: req.body.password,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			decidido: req.body.decidido,
			vestibulares: req.body.vestiulares.split("/");
			dificuldades: dif,
			facilidades: fac,
			serie: req.body.serie
		});

		novoAluno.save(function(err, novoAluno) {
			if (err) return console.error(err);
		});

		res.writeHed(200, {"Cotent-Type": "text/html"});
		fs.createReadStream("./sucesso.html").pipe(res);
	}
	else {
		// Se a senha nao for confirmada corretamente
	}
	//res.writeHead(200, {"Cotent-Type": "text/plain"});
	// res.write('Deu certo');
	// res.end();

	//res.writeHead(200, {"Cotent-Type": "text/html"});
	//fs.createReadStream("./index.html").pipe(res);
}

function submitMent(req, res) {
	if (req.body.password == req.body.password_confirmation){
		var novoMentor = new Mentor({
			
		});

		novoMentor.save(function(err, novoMentor) {
			if (err) return console.error(err);
		});

		res.writeHed(200, {"Cotent-Type": "text/html"});
		fs.createReadStream("./sucesso.html").pipe(res);
	}
	else {
		// Se a senha nao for confirmada corretamente
	}
}

app.post('/submitAluno', submitAl);
app.post('/submitMentor', submitMent);

app.get('/', function(req, res){
	res.writeHead(200, {"Cotent-Type": "text/html"});
	fs.createReadStream("./index.html").pipe(res);
});

app.listen(8080, function() {
	console.log('app listening port 8080');
});
