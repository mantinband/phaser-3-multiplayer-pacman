const express = require('express');
const Bundler = require('parcel-bundler');
const socket = require('socket.io');

const port = 1235;
const app = express();
const bundler = new Bundler('../client/index.html');

app.use(express.static('../assets/'));
app.use(bundler.middleware());

var server = app.listen(port, ()=>{
    console.log('server is running on ' + port);
});

var io = socket(server);

var numPlayers = 0;
var firstPlayerSocket;
var secondPlayerSocket;
var firstPlayerName = '';
var secondPlayerName = '';

function getOtherSocket(socket) {
    return socket === firstPlayerSocket ? secondPlayerSocket : firstPlayerSocket;
}

io.on('connection', function(socket) {
    if (++numPlayers === 1) {
        firstPlayerSocket = socket;
        socket.emit('wait', '');

    } else if (numPlayers === 2) {
        secondPlayerSocket = socket;

        firstPlayerSocket.emit('startGame', {
            'otherPlayerName' : secondPlayerName,
            'masterOrSlave'   : 'master'
        });

        secondPlayerSocket.emit('startGame', {
            'otherPlayerName' : firstPlayerName,
            'masterOrSlave'   : 'slave'
        });
    } else {
        socket.emit('tooManyPlayers');
        return;
    }

    socket.on('dot', function(data) {
        getOtherSocket(socket).emit('dot', data);
    });

    socket.on('candy', function(data) {
        getOtherSocket(socket).emit('candy', data);
    });

    socket.on('updatePacmanNextDirection', function(data) {
        getOtherSocket(socket).emit('updatePacmanNextDirection', data);
    });

    socket.on('updateGhostNextDirection', function(data) {
        getOtherSocket(socket).emit('updateGhostNextDirection', data);
    });
    socket.on('ghostTurn', function(data) {
        getOtherSocket(socket).emit('ghostTurn', data);
    });

    socket.on('gameOver', function(data) {
        getOtherSocket(socket).emit('gameOver', data);
    });

    console.log('user number ', numPlayers, ' connected');
});
