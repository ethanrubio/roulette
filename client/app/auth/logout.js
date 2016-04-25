angular.module('pubroulette.logout', [])

.controller('LogoutController', ['$scope', '$auth', '$location', function($scope, $auth, $location) {
    
  $scope.checkAuth = function() {
    var result = false;
    if ($auth.isAuthenticated()) {
      result = true;
    }
    return result;
  };
  
  $scope.logout = function() {
    $auth.logout()
      .then(function() {
        $location.path('/');
      });
  };

}])
.directive('ngLogout', function() {
  return {
    restrict: 'E',
    template: "<md-button ng-if='checkAuth() === true;' ng-click='logout()'>Logout</md-button>"
  };
})
