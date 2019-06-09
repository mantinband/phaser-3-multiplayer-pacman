const express = require('express');
const Bundler = require('parcel-bundler');

const port = 1234;
const server = express();
const bundler = new Bundler('../client/index.html');

server.use(express.static('../assets/'));
server.use(bundler.middleware());

server.listen(port, ()=>{
    console.log('server is running on ' + port);
});
