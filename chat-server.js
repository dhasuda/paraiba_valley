var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});


// Evento da conexao
io.on('connection', function(socket){

    socket.on('send message', function(msg){
        io.emit('show message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on port 3000');
});
