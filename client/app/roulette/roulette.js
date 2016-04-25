angular.module('pubroulette.roulette', [])

.controller('RouletteController', ['$scope', 'UberAPI', 'YelpAPI', 'Map', '$mdDialog', '$auth', 'Loader', function($scope, UberAPI, YelpAPI, Map, $mdDialog, $auth, Loader) {
  
  $scope.checkAuth = function() {
    var result = false;
    if ($auth.isAuthenticated()) {
      result = true;
    }
    return result;
  }

  $scope.roulette = function() {
    Loader.showLoader();
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
          console.error(error);
        }
      });
    }
  };

}])
.directive('ngRoulette', function() {
  return {
    restrict: 'E',
    template: "<md-button ng-if='checkAuth() === true;' class='md-raised md-primary' style='margin: 5em; width: 15em; background-color: #01579b;' ng-click='roulette()'>Roulette</md-button>"
  };
})
