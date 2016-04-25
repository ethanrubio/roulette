angular.module('pubroulette.login', [])

.controller('LoginController', ['$scope', '$auth', 'jwtHelper', function($scope, $auth, jwtHelper) {
  
  var vm = this;
  
  vm.loginData = {};
    
  vm.checkAuth = function() {
    var result = false;
    if ($auth.isAuthenticated()) {
      result = true;
    }
    return result;
  };
  
  vm.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(resp) {
        var tokenPayload = jwtHelper.decodeToken(resp.data.token);
        vm.loginData = tokenPayload;
      })
      .catch(function(error) {
        console.error('there has been an error! ', error);
      });
  };

}])
.directive('ngUberAuth', function() {
  return {
    restrict: 'E',
    template: "<md-button ng-if='vm.checkAuth() === false;' class='md-raised md-primary' style='margin: 5em; width: 15em; background-color: #01579b;' ng-click='vm.authenticate(\"uber\")'><i class='icon ion-model-s'></i> Sign in with Uber</md-button>",
    controller: 'LoginController',
    controllerAs: 'vm',
    bindToController: true
  };
})
.directive('ngPersonal', function() {
  return {
    restrict: 'E',
    template: '<md-list class="fixedRows" ng-if="vm.checkAuth() === true;"><md-list-item class="md-2-line contact-item"><img ng-src="{{vm.loginData.picture}}" class="md-avatar" alt="{{vm.loginData.first_name}}" /> <div class="md-list-item-text compact"> <h3 style="color: inherit">{{vm.loginData.first_name}}</h3> </div></md-list-item></md-list>',
    controller: 'LoginController',
    controllerAs: 'vm',
    bindToController: true 
  }; 
})
