angular.module('pubroulette', [
  'pubroulette.uberapi',
  'pubroulette.yelpapi',
  'pubroulette.map',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('homepage', {
      url: '/',
      /*templateUrl: 'app/auth/signin.html',*/
      controller: 'AppController'
    })

    $urlRouterProvider.otherwise('/');

})
.controller('AppController', function($scope, UberAPI, YelpAPI, map){
  // get geolocation of user
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(success, error){
     $scope.$apply(function(){
       $scope.position = success;
       // pass the position to YelpAPI
       // access the coordinates that is in the Geoposition object
        // $scope.position.coord.latitude & $scope.position.coord.longitude
        // when get a response
          // pass the position to UberAPI
        console.log("lat: " + $scope.position.coords.latitude  + " long:" + $scope.position.coords.longitude);
        YelpAPI.passLocation($scope.position.coords.latitude, $scope.position.coords.longitude)
        .then(function(resp) {
          $scope.name = resp.data.name;
          $scope.destination = resp.data.location.coordinate;
          UberAPI.passLocation($scope.position.coords.latitude, $scope.position.coords.longitude, resp.data.location.coordinate.latitude, resp.data.location.coordinate.longitude);
          })
          .then(function(resp) {
              map.mapMaker($scope.position.coords.latitude, $scope.position.coords.longitude, $scope.destination.latitude, $scope.destination.longitude, $scope.name);
            });
     });
     if (error) {
       console.log(error);
     }
   });
 }
})
.directive('ngMap', function() {
  return {
    restrict: 'E',
    template: " <div class='link'><img src='../assets/redirect_icon.png'> <div class='info'>  <div class='visits'> <span class='count'> {{link.visits }} </span> Visits </div> <div class ='title'> {{ link.title }}</div> <div class='original'> {{ link.url }}</div> <a href ='{{ link.base_url  + \"/api/links/\" + link.code }}'>{{ link.base_url +  '/' + link.code }}</a> </div> </div>"
  };
});
