angular.module('pubroulette', [
  'ngMap',
  'ngMaterial',
  'pubroulette.uberapi',
  'pubroulette.yelpapi',
  'pubroulette.map',
  'pubroulette.mapMaker',
  'pubroulette.loader',
  'pubroulette.roulette',
  'pubroulette.login',
  'pubroulette.logout',
  'ui.router',
  'satellizer',
  'angular-jwt'
])
.config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {
  
  $authProvider.oauth2({
    name: 'uber',
    url: '/api/uber/token',
    redirectUri: window.location.origin,
    authorizationEndpoint: 'http://localhost:3468/api/uber/authenticate',
    popupOptions: { width: 500, height: 560 }
  });

  $stateProvider
    .state('homepage', {
      url: '/',
      controller: 'AppController'
    });

    $urlRouterProvider.otherwise('/');

}])
.controller('AppController', ['$scope', function($scope) {}]);
