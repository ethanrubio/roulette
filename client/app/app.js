angular.module('pubroulette', [
  'ngMap',
  'ngMaterial',
  'pubroulette.uberapi',
  'pubroulette.yelpapi',
  'pubroulette.map',
  'pubroulette.mapMaker',
  'pubroulette.loader',
  'pubroulette.roulette',
  'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('homepage', {
      url: '/',
      controller: 'AppController'
    })

    $urlRouterProvider.otherwise('/');

}])
.controller('AppController', ['$scope', function($scope) {

}]);
