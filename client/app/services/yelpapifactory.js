angular.module('pubroulette.yelpapi', [])

.factory("YelpAPI", ['$http', function ($http) {

  var clickedTruth;

  var clicked = function(){
    return clickedTruth;
  };

  var clickedFirst = function(){
    clickedTruth = true;
  };

  var passLocation = function(lat, long){
    return $http({
      method: 'POST',
      url: '/api/yelp/location',
      data: {lat: lat, long: long}
    })
    .then(function(resp){
      console.log("Yelp API got a response! ", resp);
      return resp;
    });
  };

  return {
    passLocation: passLocation,
    clicked: clicked,
    clickedFirst: clickedFirst
  };
}]);
