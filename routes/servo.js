// http://en.wikipedia.org/wiki/Servo_control
// http://beagleboard.org/Support/BoneScript/ServoMotor/

var b = require('bonescript');


/* Object.defineProperty(Servo.prototype, 'name', {
    get: function () {
        return this._node.data['name'];
    },
    set: function (name) {
        this._node.data['name'] = name;
    }
}); */

var Servo = module.exports.servo = function (name, pin) {
    this._pin = typeof pin !== 'undefined' ? pin : 'P9_14';
    
    this._name = name; 
    this._minAngle = -90.0;
    this._maxAngle = 90.0;
    this._minDuty = 0.05;               // Min duty cycle: 1 ms (at 20 ms this._
    this._maxDuty = 0.10;               // Max duty cycle: 2 ms (at 20 ms period)
    this._frequency = 1000.0 / 20.0;    // Period: 50 Hz (20 ms)
    this._angle = Number.MIN_VALUE;
    
    // SETUP
    b.pinMode(this._pin, b.OUTPUT);
    b.digitalWrite(this._pin, 0);
    //this.printInfo();
    //this.setAngle(0);
};


Object.defineProperty(Servo.prototype, 'angle', {
    get: function () { return this._angle; }
});


Servo.prototype.read = function () {
    return this._angle;
};


// PUBLIC FUNCTION, angle BETWEEN -90 .. 90 DEG
Servo.prototype.setAngle = function(angle) {
    angle = angle > 90.0 ? 90.0 : angle < -90.0 ? -90.0 : angle;
    if (this._angle == angle) return angle;
    this._angle = angle;
	var dutyCycle = map(this._angle, this._minAngle, this._maxAngle, this._minDuty, this._maxDuty);
	b.analogWrite(this._pin, dutyCycle, this._frequency);
	console.log(this._name + ": pulse width: " + parseFloat(dutyCycle / this._frequency * 1000 ).toFixed(2) + " ms (" + this._angle + " degrees)");   
	return this._angle;
};

Servo.prototype.printInfo = function(){
    var period = 1.0 / this._frequency * 1000;
	console.log(
        this._name + ": period: " + parseFloat(period).toFixed(2) + " ms" +
		", pulse min: " + parseFloat(this._minDuty * period).toFixed(2) + " ms" + 
		", max: " + parseFloat(this._maxDuty * period).toFixed(2) + " ms"
	);
};

///////////////

// PRIVATE FUNCTIONS
function map(value, min1, max1, min2, max2) {
	return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}