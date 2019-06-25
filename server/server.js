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
var playersSockets = [];
var firstPlayerSocket;
var secondPlayerSocket;

function getOtherSocket(playerIndex) {
    return playersSockets[playerIndex + (playerIndex%2 === 0 ? 1 : -1)];
}

io.on('connection', function(socket) {
    const myPlayerIndex = numPlayers++;
    playersSockets.push(socket);

    if (numPlayers%2) {
        socket.emit('wait', '');
    } else {
        console.log("i'm feeling large today.... opening another room!");
        getOtherSocket(myPlayerIndex).emit('startGame', 'master');
        socket.emit('startGame', 'slave');
    }

    socket.on('dot', function(data) {
        getOtherSocket(myPlayerIndex).emit('dot', data);
    });

    socket.on('candy', function(data) {
        getOtherSocket(myPlayerIndex).emit('candy', data);
    });

    socket.on('updatePacmanNextDirection', function(data) {
        getOtherSocket(myPlayerIndex).emit('updatePacmanNextDirection', data);
    });

    socket.on('updateGhostNextDirection', function(data) {
        getOtherSocket(myPlayerIndex).emit('updateGhostNextDirection', data);
    });
    socket.on('ghostTurn', function(data) {
        getOtherSocket(myPlayerIndex).emit('ghostTurn', data);
    });

    socket.on('gameOver', function(data) {
        getOtherSocket(myPlayerIndex).emit('gameOver', data);
    });

    console.log('user number ', numPlayers, ' connected');
});
