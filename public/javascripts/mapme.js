$(document).ready(function () {
  var map = new L.Map('map');
  var key = "d051e73889034e2a89e10abe80c54c4b";
  var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/'+ key +
                      '/997/256/{z}/{x}/{y}.png';
  var cloudmadeAttrib = 'Map data &copy; 2011 OpenStreetMap ' + 
                        'contributors, Imagery &copy; 2011 CloudMade';
  var cloudmade = new L.TileLayer(cloudmadeUrl, 
                                  { maxZoom: 18, 
                                    attribution: cloudmadeAttrib
                                  });
  $.getJSON('/geo', function (geo) {
    $('#city').html(geo.cityName + ", " + geo.regionName);
    var loc = new L.LatLng(
                    parseFloat(geo.latitude), 
                    parseFloat(geo.longitude)
                  );
    map.setView(loc, 13).addLayer(cloudmade);
  });
});
