var sensorLib = require('raspi-sensors');
var sensor;

function getSensor(component) {
	if (!!component.initialized) {
		sensor = new sensorLib({
			type: "DHT22",
			pin: component.address
		});
	}		
	sensor.fetch(function(err, data) {
		if (err) return err;
		return data
	});
}

module.exports = getSensor;
