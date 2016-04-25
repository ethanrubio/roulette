angular.module('pubroulette.login', [])

.controller('LoginController', ['$scope', '$auth', function($scope, $auth) {
  
  var loginData = {};
    
  $scope.checkAuth = function() {
    var result = false;
    if ($auth.isAuthenticated()) {
      result = true;
    }
    return result;
  };
  
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(data) {
        loginData = data;
      })
      .catch(function(error) {
        console.error('there has been an error! ', error);
      });
  };

}])
.directive('ngUberAuth', function() {
  return {
    restrict: 'E',
    template: "<md-button ng-if='checkAuth() === false;' class='md-raised md-primary' style='margin: 5em; width: 15em; background-color: #01579b;' ng-click='authenticate(\"uber\")'><i class='icon ion-model-s'></i> Sign in with Uber</md-button>"
  };
})
.directive('ngUberPersonal', function() {
  return {
    restrict: 'E',
    template: '<img ng-src="{{loginData.picture}}" class="md-avatar" alt="{{loginData.first_name}}" /> <div class="md-list-item-text compact"> <h3>{{loginData.first_name}}</h3> </div>'
  }; 
})
