angular.module('pubroulette.map', [])

.factory('map', function($window){
  var mapMaker = function(startLat, startLong, endLat, endLong, name){
    $window.map = new GMaps({
      div: '#map',
      lat: 34.0192838,
      lng: -118.4965825
    });
    $window.map.drawRoute({
       origin: [startLat, startLong],
       destination: [endLat, endLong],
       travelMode: 'driving',
       strokeColor: '#131540',
       strokeOpacity: 0.6,
       strokeWeight: 6
    });
    $window.map.addMarker({
      lat: startLat,
      lng: startLong,
      title: 'Your location',
      infoWindow: {
        content: '<p>You\'re here!</p>'
      }
    });
    $window.map.addMarker({
      lat: endLat,
      lng: endLong,
      title: name,
      infoWindow: {
        content: '<p>' + name + '</p>'
      }
    });
  };

  return {
    mapMaker: mapMaker,
  };

});
