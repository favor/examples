var pow = (Math.pow(2, 14) - 1);

function getHumid(buf) {
  var data = buf[0];
  return (((data[0] & 0x3f) << 8) | data[1]) * 100 / pow;
}
function getTemp(buf) {
   var data = buf[0];
   return ((data[2] << 6) + (data[3] >> 2)) / pow * 165 - 40;
}

function getHumidTemp(buf) {
  return {
    humidity: getHumid(buf),
   temperature: getTemp(buf)
  }
}

module.exports = {
    "name":"watch",
    "i2c-bus": 1,
    "components" : [
       {"type": "link", name: "HiH-6130", "address": 0x27, "interface": "i2c", 
       "get": [
          {"type": "read", "cmd": 0, val: new Buffer(4)}
         ], formatOutput: getHumidTemp
       },
      {"type": "temperature", "link": "HiH-6130", "returnAs": "temperature"},
      {"type": "humidity", "link": "HiH-6130", "returnAs": "humidity"},
      {"type": "button", "address": 18, "direction": "in", "edge": "both", "interface": "gpio",
       "debounce": 100}
    ]
}
