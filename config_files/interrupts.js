module.exports = {
	name: 'interupts',
	'i2c-bus': 1,
	components: [
		{type: 'accelerometer', address: 0x53, interface: 'i2c',
		/* Initializing the adxl345
			the first three entries turn the accelerometer on
			the next 3 set which axes to watch for interrupts
			the next 4 set the latency, and thresholds 
			to match the single and double taps
			the last entry registers the interupt 
		*/
			init: [{type: 'write', cmd: 0x2d, val: 0},
				{type: 'write', cmd: 0x2d, val: 16},
				{type: 'write', cmd: 0x2d, val: 8},
				{type: 'write', cmd: 0x2a, val: 0},
				{type: 'write', cmd: 0x2a, val: 0},
				{type: 'write', cmd: 0x2a, val: 1},
				{type: 'write', cmd: 0x1d, val: 0.5},
				{type: 'write', cmd: 0x21, val: 0.5},
				{type: 'write', cmd: 0x22, val: 0.3},
				{type: 'write', cmd: 0x23, val: 0.9},
				{type: 'write', cmd: 0x2e, val: [0x25, 1, 1]}
			]
		},
		{type: 'double-tap', interface: 'gpio', address: 23, direction: 'both'}
	]
}