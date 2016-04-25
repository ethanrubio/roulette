angular.module('pubroulette.yelpapi', [])
.factory("YelpAPI", ['$http', function($http) {

  var passLocation = function(lat, long) {
    return $http({
      method: 'POST',
      url: '/api/yelp/location',
      data: {lat: lat, long: long}
    })
    .then(function(resp) {
      return resp;
    });
  };

  return {
    passLocation: passLocation
  };
  
}]);
