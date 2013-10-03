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
  
  socket.on('sendlars', function (data) {
    console.log("sendlars = " + JSON.stringify(data));
    socket.emit('news', { message: data.led1 });
  });
  
});