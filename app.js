// MODULES
var express = require('express')
  , app = express()
  , path = require('path')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

// CUSTOM MODULES
var routes = require('./routes')
  , appSocket = require('./routes/appSocket');


// SETUP
app.set('port', process.env.PORT || 1338);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


// ROUTES
//app.get('/', routes.index);
app.get('/teis', routes.teis);


// WEBSOCKETS
io.set('log level', 0);  // Turn off debug messages
io.sockets.on('connection', appSocket.listener);

// START SERVER
server.listen(app.get('port'), function(){
  console.log('Botcamp server listening on port ' + app.get('port'));
});



