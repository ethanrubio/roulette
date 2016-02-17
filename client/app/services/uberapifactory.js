angular.module('pubroulette.uberapi', [])

.factory("UberAPI", function ($http) {

  var uberData = {};

  var passLocation = function(startLat, startLong, endLat, endLong){
    return $http({
      method: 'POST',
      url: '/api/uber/journey',
      data: {startLat: startLat, startLong: startLong, endLat: endLat, endLong: endLong}
    })
    .then(function(resp){
      console.log("uber API got a response! ", resp);
      uberData.data = resp.data;
      console.log('Hi this is the uberData in UberAPI being set', uberData);
      return resp;
    });
  };

  return {
    passLocation: passLocation,
    uberData: uberData
  };
});
