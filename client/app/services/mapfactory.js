angular.module('pubroulette.map', [])
.factory('Map', function($window) {

  var coordinates = {
    startLat: '',
    startLong: '',
    endLat: '',
    endLong: '',
    name: '',

  };

  var mapTruth;

  var mapShow = function(){
    return mapTruth;
  };

  var mapStore = function(startLat, startLong, endLat, endLong, name) {
    mapTruth = true;
    coordinates.startLat = startLat;
    coordinates.startLong = startLong;
    coordinates.endLat = endLat;
    coordinates.endLong = endLong;
    coordinates.name = name;
  };

  return {
    coordinates: coordinates,
    mapStore: mapStore,
    mapShow: mapShow
  };

});
