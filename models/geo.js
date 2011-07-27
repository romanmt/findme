/**
 * Module Dependencies
 */

var request = require('request');


var Geo = exports;

Geo.get = function (ip, callback) {
  var key = '92be3535080b8e44139bccfd7c75e8b095ac9432077f184b41989b56e06e7590'
  request(
    { method : 'get',
      uri    : 'http://api.ipinfodb.com/v3/ip-city/?format=json&key=' + 
                key + '&ip=' + ip
    },
    function (err, response, body) {
      if(response.statusCode == 200) {
        callback(body);
      } else {
        console.log("error: " + response.statusCode);
        console.log(body);
      }
    });
}
