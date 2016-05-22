var express = require('express')
var app = express();
//var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var name;
var other;
var users = {};

app.use(express.static(__dirname));

app.get('/chat/:name/:other', function(req, res){
    //console.log(req.params.name + ' entrou');
    name = req.params.name;
    other = req.params.other;
    res.sendFile(__dirname + '/chat.html');
});

// Evento da conexao
io.on('connection', function(socket){

    socket.name = name;
    socket.other = other;
    users[socket.name] = socket;
    //console.log(socket.name + ' logou');

    //io.emit('enter chat', socket.name);
    users[socket.name].emit('enter chat', socket.name);
    if (users.hasOwnProperty(socket.other))
        users[socket.other].emit('enter chat', socket.name);

    socket.on('send message', function(msg){
        //io.emit('show message', {name: socket.name, text: msg});
        users[socket.name].emit('show message', {name: socket.name, text: msg});
        if (users.hasOwnProperty(socket.other))
            users[socket.other].emit('show message', {name: socket.name, text: msg});
    });

    socket.on('disconnect', function(){
        io.emit('disconnect message', socket.name);
        delete users[socket.name];
    })
});


http.listen(3000, function(){
    console.log('listening on port 3000');
});
