/*
	This is the example config file used to demonstrate 
	turning leds of different types and protocols on and off. 
*/

// converts a number to a hex
function toHex(c) {
    var hex = c.toString(16);
    hex = hex.length == 1 ? "0" + hex : hex;
    return "0x" + hex;
}

// formats an input to be received by a tri-color gpio led
function triGpioColor(c) {
   if(c === 1) return 1;
   if(c === 0) return 0;
   var isArray = Array.isArray(c);
   if(isArray && this._component.name === 'red') return c[0] === 255 ? 1 : 0;
   if(isArray && this._component.name === 'blue') return c[1] === 255 ? 1: 0;
   if(isArray && this._component.name === 'green') return c[2] === 255 ? 1: 0;
   return c;
}

// formats the input to be received by the blinkM led
function blinkMInput(c) {
	if(c === 1) return [255, 255, 255];
	if(c === 0) return [0, 0, 0];
	return [c[0] ,c[1],c[2]];
}

// formats the input to be received by a 5050led (apa102)
var apaIdx = 0;
function apa102Input(c, cmd) {
	if(c === 1) return 0xff;
	else if(c === 0) return 0x00;
	return toHex(c[cmd.colorIdx]);
}

module.exports = {
    "name":"hello-world-leds",
    "i2c_path": '/dev/i2c-1',
    "components" : [{"type":"led", "name":"blue", "direction": "out",
		"address":17, "interface": "gpio", "formatInput" : triGpioColor},
        {"type":"led","name":"green", "address":27, "direction": "out",
         "interface": "gpio", formatInput: triGpioColor},
        {"type":"led","name":"red","address":22, "direction": "out",
         "interface": "gpio", formatInput: triGpioColor },
		{type:"led",path: 1, address: 0x09, "name":"blinkm",
		interface: "i2c",
		init: {type: 'write', cmd: 0x6f},
		set:{type: 'write', cmd:0x6e , formatInput: blinkMInput}},
		{type: "led", interface: "spi", name: "apa102",
		address: "/dev/spidev0.0", set: [
		{val: 0x00}, {val: 0x00}, {val:0x00}, {val: 0x00}, {val: 0xff},
		{colorIdx: 2, formatInput: apa102Input},
		{colorIdx: 1, formatInput: apa102Input},
		{colorIdx: 0, formatInput: apa102Input}]}
	]
};
