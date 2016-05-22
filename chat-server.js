var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var name;

app.get('/chat/:name', function(req, res){
    //console.log(req.params.name + ' entrou');
    name = req.params.name;
    res.sendFile(__dirname + '/chat.html');
});

// Evento da conexao
io.on('connection', function(socket){

    socket.name = name;

    //console.log(socket.name + ' logou');

    io.emit('enter chat', socket.name);

    socket.on('send message', function(msg){
        io.emit('show message', {name: socket.name, text: msg});
    });

    /*socket.on('enter chat', function(name){
        socket.name = name;
        console.log('ta no socket');
    })*/
});


http.listen(3000, function(){
    console.log('listening on port 3000');
});
