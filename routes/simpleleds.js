// https://github.com/lgxlogic/BoneScript-SocketIO

var b = require('bonescript');

var pins = {
    led1: "USR0",
    led2: "USR1",
    led3: "USR2",
    led4: "USR3"
    };


for (var pin in pins ){
    var pinName = pins[pin];
    console.log("pin = " + pinName);
    ledSetup(pinName);
}

function ledSetup(ledName)
{
    b.pinMode(ledName, 'out');
    b.digitalWrite(ledName, 0);
    return ledName; 
}


exports.listener = function (socket) {
  socket.on('ledSwitch', function (data) {
    //b.analogWrite(led1, 1-(data/100));
    console.log("ledSwitch: " + JSON.stringify(data));
    
    var value = data.value == "on" ? 1 : 0;
                    
    b.digitalWrite(pins[data.name], value);
  });
  
  
};



