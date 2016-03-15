var favorConfig = require('../config_files/hello-world-leds');
var $$ =  require('favor')(favorConfig);

describe('turn on gpio', function() {
	it('should set all led pins to 1', function() {
		var leds = $$('led.gpio');
		var ledsSet = [];
		
		runs(function() {
			leds.set(1, function(val) {
				ledsSet.push(val);
			});
		});
		
		waitsFor(function() {
			return ledsSet.length === 3;
		}, 1000);
		
		runs(function() {
			expect(ledsSet.length).toBe(3);
			ledsSet.forEach(function(led){
				expect(led).toBe(1);
			});
		});
	});
	
	it('should handle rgb array', function() {
		var leds = $$('led.gpio');
		var ledsSet = {};
		
		runs(function() {
			leds.set([255, 100, 255], function(val) {
				ledsSet[this._component.name] = val;
			});
		});
		
		waitsFor(function() {
			return Object.keys(ledsSet).length === 3;
		}, 1000);
		
		runs(function() {
			expect(Object.keys(ledsSet).length).toBe(3);
			expect(ledsSet.red).toBe(1);
			expect(ledsSet.blue).toBe(0);
			expect(ledsSet.green).toBe(1);
		});
	});
});

// currently not testable, need to improve mock
// describe('turn on i2c', function() {
// 	it('should set i2c on', function() {
// 		var led = $$('led.blinkm');
// 		var ledSet;
		
// 		runs(function() {
// 			led.set(1, function(val) {
// 				ledSet = val;
// 			});
// 		})
		
// 		waitsFor(function() {
// 			return ledSet;
// 		}, 1000);
		
// 		runs(function() {
// 			expect(ledSet.writeI2cBlock).toBe([255, 255, 255]);
// 		});
// 	});
// });



