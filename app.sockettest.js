//var io = require('socket.io').listen(1338);

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
  
  server.listen(1338);