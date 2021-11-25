var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});

// Middleware de express
app.use(express.static('client'))

app.get('/hola-mundo', function(req,res){
    res.status(200).send('hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS',
    nickname: 'Bot - Pablo Moras'
}]

// Conexion de io
io.on('connection', function(socket){
    console.log("Nueva conexión del socket" + " IP: " + socket.handshake.address + " . . .");

    socket.emit('messages', messages);
    
    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(6677,  function(){
    console.log("Servidor funcionando en http://localhost:6677");
});