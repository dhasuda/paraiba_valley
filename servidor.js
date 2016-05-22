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
	curso: String,
	vestibulares: Array, // Nao esquecer de dar split()
	dificuldades: Array, // Cada elemento do array corresponde a uma materia
	// 1: tem dificuldade; 0: nao tem dificuldade
	// Ordem das materias: mat, fis, quim, bio, hist, geo, port, red, filo, socio
	facilidades: Array,
	serie: String 
});
var Aluno = mongoose.model('Aluno', alunoSchema);

var mentorSchema = new mongoose.Schema ({
	usuario: String,
	email: String,
	password: String,
	first_name: String,
	last_name: String,
	graduacao: String,
	universidade: String,
	conclusao: String,
	facilidades: Array
});
var Mentor = mongoose.model('Mentor', mentorSchema);

// Servidor --------------------------------------------------------

// Cadastro
function onToInt(str) {
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
			curso: req.body.curso,
			//vestibulares: req.body.vestiulares.split("/"),
			dificuldades: dif,
			facilidades: fac,
			serie: req.body.serie
		});

		novoAluno.save(function(err, novoAluno) {
			if (err) return console.error(err);
		});

		res.writeHead(200, {"Cotent-Type": "text/html"});
		// Aluno.find(function(err, alunos) {
		// 	if (err) return console.error(err);
		// 	console.log(alunos);
		// })
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
		var fac = [];

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

		var novoMentor = new Mentor({
			usuario: req.body.usuario,
			email: req.body.email,
			password: req.body.password,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			graduacao: req.body.graduacao,
			universidade: req.body.universidade,
			conclusao: req.body.conclusao,
			//vestibulares: req.body.vestiulares.split("/"),
			facilidades: fac
		});

		novoMentor.save(function(err, novoMentor) {
			if (err) return console.error(err);
		});

		res.writeHead(200, {"Cotent-Type": "text/html"});
		fs.createReadStream("./sucesso.html").pipe(res);
	}
	else {
		// Se a senha nao for confirmada corretamente
	}
}

// Login
function logIn(req, res) {
	var user = req.body.login_email;
	var pass = req.body.login_password;
	console.log(user);
	var existe = 0; // 1: aluno, 2: mentor, 0: nao existe
	Aluno.count({email: user, password: pass}, function( err, count){
    	
    	if (count > 0) {
    		res.writeHead(200, {"Cotent-Type": "text/html"});
			fs.createReadStream("./cadastro_professor.html").pipe(res);
    	}
    	else {
    		Mentor.count({email: user, password: pass}, function( err, count){
    			if (count > 0) {
    				existe = 2;
    				res.writeHead(200, {"Cotent-Type": "text/html"});
					fs.createReadStream("./cadastro_professor.html").pipe(res);
    			}
    			else {
    				// Login nao existe
					res.writeHead(200, {"Cotent-Type": "text/html"});
					fs.createReadStream("./senha_incorreta.html").pipe(res);
    			}
    		})
    	}	
	})
}

app.post('/aluno', submitAl);

app.post('/mentor', submitMent);

app.post('/login', logIn);

app.get('/', function(req, res){
	res.writeHead(200, {"Cotent-Type": "text/html"});
	fs.createReadStream("./aluno_ou_professor.html").pipe(res);
});


app.get('/aluno_ou_professor.html', function(req, res){
	res.writeHead(200, {"Cotent-Type": "text/html"});
	fs.createReadStream("./aluno_ou_professor.html").pipe(res);
});

app.get('/cadastro_aluno.html', function(req, res) {
	res.writeHead(200, {"Cotent-Type": "text/html"});
	fs.createReadStream("./cadastro_aluno.html").pipe(res);
});

app.get('/cadastro_professor.html', function(req, res) {
	res.writeHead(200, {"Cotent-Type": "text/html"});
	fs.createReadStream("./cadastro_professor.html").pipe(res);
});


// Remove tudo do banco de dados ***********************************************************
// Aluno.remove(function (err) {
//   if (err) return handleError(err);
//   // removed!
// });

// Mentor.remove(function (err) {
//   if (err) return handleError(err);
//   // removed!
// });
// Aluno.find(function(err, alunos) {
// 	if (err) return console.error(err);
// 	console.log(alunos);
// })
// Mentor.find(function(err, mentores) {
// 	if (err) return console.error(err);
// 	console.log(mentores);
// }) // ************************************************************************************


app.listen(8080, function() {
	console.log('app listening port 8080');
});

