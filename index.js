var express = require("express");
var app = express();
var server = app.listen(3000);
var socket = require("socket.io");
var io = socket(server);

app.use(express.static('public'));

console.log("Running...");

io.sockets.on('connection', newConnection);

function newConnection(sock) {
    console.log("New connection: " + sock.id);

    sock.on('chat', onchat);

    function onchat(data) {
        sock.broadcast.emit('newChat', data);

        console.log(data.name + ": " + data.content);
    }

    sock.on('checkin', checkin);

    function checkin(data) {

    }
}
