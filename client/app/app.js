angular.module('pubroulette', [
  'ngMap',
  'ngMaterial',
  'pubroulette.uberapi',
  'pubroulette.yelpapi',
  'pubroulette.map',
  'pubroulette.mapMaker',
  'pubroulette.loader',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('homepage', {
      url: '/',
      controller: 'AppController'
    })

    $urlRouterProvider.otherwise('/');

})
.controller('AppController', function($scope, UberAPI, YelpAPI, Map, $mdDialog) {

  $scope.success = function() {
    YelpAPI.clickedFirst();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(success, error) {
          $scope.$apply(function() {
            $scope.position = success;
            YelpAPI.passLocation(
              $scope.position.coords.latitude, 
              $scope.position.coords.longitude
              )
            .then(function(resp) {
                $scope.name = resp.data.name;
                $scope.destination = resp.data.location.coordinate;
                UberAPI.passLocation(
                  $scope.position.coords.latitude, 
                  $scope.position.coords.longitude, 
                  resp.data.location.coordinate.latitude, 
                  resp.data.location.coordinate.longitude
                )
                .then(function(resp) {
                          Map.mapStore(
                            $scope.position.coords.latitude, 
                            $scope.position.coords.longitude, 
                            $scope.destination.latitude, 
                            $scope.destination.longitude, 
                            $scope.name
                          );
                        })
            })
        });
        if (error) {
          console.log(error);
        }
      });
    }
  };

});
