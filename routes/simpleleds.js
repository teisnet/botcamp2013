// https://github.com/lgxlogic/BoneScript-SocketIO

var b = require('bonescript');
//var io = require('socket.io');

var ledsRangeValue = 3;
var leds = {
    led1: {pin: "USR0", value: 0},
    led2: {pin: "USR1", value: 0},
    led3: {pin: "USR2", value: 0},
    led4: {pin: "USR3", value: 0}
    };
    


for (var key in leds ){
    var led = leds[key];
    console.log("pin = " + led.pin);
    b.pinMode(led.pin, 'out');
    b.digitalWrite(led.pin, led.value);
}


exports.listener = function (socket) {
    // SOCKET SETUP
    
    socket.emit('ledsRangeClient', ledsRangeValue);
    
    for (var key in leds ){
        var led = leds[key];
        var ledValue = led.value == 1 ? "on" : "off";
        socket.emit('ledSwitch', { name: key, value: ledValue});
    }
    
    
    // ON LED SWITCH
  socket.on('ledSwitch', function (led) {
    console.log("ledSwitch: " + JSON.stringify(led));
    
    var value = led.value == "on" ? 1 : 0;
    leds[led.name].value = value;
    b.digitalWrite(leds[led.name].pin, value);
    
    socket.broadcast.emit('ledSwitch', led);
  });
  
  // ON LED RANGE
  socket.on('ledsRange', function (value) {
    ledsRangeValue = value;
    console.log("ledsRange: " + value);
    socket.broadcast.emit('ledsRangeClient', value);
  });
  
};





