/* var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1338, "10.0.0.6");

console.log('Server running at http://10.0.0.6:1338/');
*/


var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);



app.get('/', function(req, res){
    res.sendfile(__dirname + '/views/index.html');
});

app.get('/teis', function(req, res){
    res.send('Hello Teis');
});

server.listen(1338);


console.log('Express server started on port 1338');

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});