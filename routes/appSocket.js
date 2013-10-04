exports.listener = function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
  socket.on('sendlars', function (data) {
    console.log("sendlars = " + JSON.stringify(data));
    socket.emit('news', { message: data.led1 });
  });
};