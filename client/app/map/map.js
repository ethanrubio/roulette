angular.module('pubroulette.mapMaker', [])
.controller('MapController', ['$scope', '$log', '$timeout', 'Map', 'UberAPI', '$mdDialog', function($scope, $log, $timeout, Map, UberAPI, $mdDialog) {

  $scope.coordinates;
  $scope.uberData;

  $scope.mapShow = function() {
    var result = false;
    if (Map.mapShow() === true) {
      result = true;
    }
    return result;
  };

  $scope.$watch(function() { return Map.coordinates; }, function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.coordinates = newValue;
      }
    }, true);

  $scope.$watch(function() { return UberAPI.uberData; }, function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.uberData = newValue;
        $scope.showConfirm();
      }
    }, true);

  $scope.showConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
          .title('You\'re about to go to ' + $scope.coordinates.name +  '.')
          .textContent('It\'ll cost about ' + $scope.uberData.data.prices[0].estimate + '.')
          .ariaLabel('Uber Confirmation')
          .targetEvent(ev)
          .ok('Teleport me there!')
          .cancel('Spin again.');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to go to collect your winnings!';
      UberAPI.authenticate();
      $scope.showAlert();
    }, function() {
      $scope.status = 'You decided spin again.';
    });
  };

  $scope.showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Your uber is being hailed.')
        .textContent('Have fun!')
        .ariaLabel('Your uber is on it\'s way')
        .ok('Thanks!')
        .targetEvent(ev)
      );
  };

}])
.directive('ngMapBuilder', function() {
  return {
    restrict: 'E',
    template: '<div style="width:70%  height: 100%"> <ng-map zoom="14" center="{{ coordinates.startLat + \',\' + coordinates.startLong }}" style="height:90%" > <directions travel-mode="DRIVING" origin=" {{ coordinates.startLat + \',\' + coordinates.startLong }}" destination="{{ coordinates.endLat + \',\' + coordinates.endLong }}"> </directions> </ng-map> </div>'
  }
});
