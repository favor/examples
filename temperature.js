var config = require('./config_files/get-temperature');
var $$ = require('favor')(config);

var cb = function(val) { console.log(val) }

$$('temperature').get(cb);
$$('humidity').get(cb);
