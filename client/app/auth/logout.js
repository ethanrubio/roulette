angular.module('pubroulette.logout', [])

.controller('LogoutController', ['$scope', '$auth', '$location', function($scope, $auth, $location) {
    
  var vm = this;
    
  vm.checkAuth = function() {
    var result = false;
    if ($auth.isAuthenticated()) {
      result = true;
    }
    return result;
  };
  
  vm.logout = function() {
    $auth.logout()
      .then(function() {
        $location.path('/');
      });
  };

}])
.directive('ngLogout', function() {
  return {
    restrict: 'E',
    template: "<md-button ng-if='vm.checkAuth() === true;' ng-click='vm.logout()'>Logout</md-button>",
    controller: 'LogoutController',
    controllerAs: 'vm'
  };
})
