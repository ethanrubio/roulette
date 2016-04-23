angular.module('pubroulette.loader', [])

.controller('LoaderController', ['$scope', 'Map', 'YelpAPI', function($scope, Map, YelpAPI) {

  $scope.mapShow = function() {
    var result = false;
    if (Map.mapShow() === true) {
      result = true;
    }
    return result;
  };

  $scope.clicked = function() {
    var result = false;
    if (YelpAPI.clicked() === true) {
      result = true;
    }
    return result;
  }

}])
.directive('ngLoading', function() {
  return {
    restrict: 'E',
    template: "<md-progress-linear ng-if='mapShow() === false && clicked() === true' md-mode='indeterminate'></md-progress-linear>"
  };
})
