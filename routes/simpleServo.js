var s = require("./servo");

var servos = {
    servo1: new s.servo('servo1'),
    servo2: new s.servo('servo2', 'P9_22')
};

exports.listener = function (socket) {
    
    // SOCKET SETUP
    socket.emit('onServoChange', { name: "servo1", value: servos.servo1.angle});
    socket.emit('onServoChange', { name: "servo2", value: servos.servo2.angle});
    
      // ON SERVO CHANGE
    socket.on('onServoChange', function (servo) {
    servos[servo.name].setAngle(servo.value);
    //console.log("servoValue: " + value);
    socket.broadcast.emit('onServoChange', servo);
  });
};