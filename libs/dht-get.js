var sensorLib = require('raspi-sensors');
var sensor;

function getSensor(component) {
	if (!sensor) {
console.log('address is', component.address)
		sensor = new sensorLib.Sensor({
			type: "DHT22",
			pin: component.address
		});
	}		
	sensor.fetch(function(err, data) {
		if (err) return err;
console.log('data is', data);
		return data
	});
}

module.exports = getSensor;
