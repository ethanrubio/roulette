angular.module('pubroulette.loader', [])

.controller('LoaderController', ['$scope', 'Map', 'YelpAPI', 'Loader', function($scope, Map, YelpAPI, Loader) {
  
  $scope.show = function() {
    var result = false;
    if (Loader.loaderShow() === true) {
      result = true;
    }
    return result;
  }

}])
.directive('ngLoading', function() {
  return {
    restrict: 'E',
    template: "<md-progress-linear ng-if='show() === true' md-mode='indeterminate'></md-progress-linear>"
  };
})