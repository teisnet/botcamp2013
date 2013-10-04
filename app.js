// MODULES
var express = require('express')
  , app = express()
  , path = require('path')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

// CUSTOM MODULES
var routes = require('./routes')
  , appSocket = require('./routes/appSocket')
  , leds = require('./routes/simpleleds');


// SETUP
app.set('port', process.env.PORT || 1338);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


// ROUTES
//app.get('/', routes.index);
app.get('/teis', routes.teis);


// WEBSOCKETS
io.set('log level', 0);  // reduce logging - set 1 for warn, 2 for info, 3 for debug
io.sockets.on('connection', appSocket.listener);
io.sockets.on('connection', leds.listener);

// START SERVER
server.listen(app.get('port'), function(){
  console.log('Botcamp server listening on ' + getIPAddress() + ', port ' + app.get('port'));
});

// Get server IP address on LAN
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}



