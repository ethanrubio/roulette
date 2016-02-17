angular.module('pubroulette', [
  'ngMap',
  'ngMaterial',
  'pubroulette.uberapi',
  'pubroulette.yelpapi',
  'pubroulette.map',
  'pubroulette.mapMaker',
  'pubroulette.loader',
  'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('homepage', {
      url: '/',
      controller: 'AppController'
    });

    $urlRouterProvider.otherwise('/');

}])
.controller('AppController', ['$scope', 'UberAPI', 'YelpAPI', 'Map', '$mdDialog', function($scope, UberAPI, YelpAPI, Map, $mdDialog) {

  $scope.success = function() {
    YelpAPI.clickedFirst();
    $scope.showAlert();
    console.log('here I am!');
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
                UberAPI.passLocation($scope.position.coords.latitude, $scope.position.coords.longitude, resp.data.location.coordinate.latitude, resp.data.location.coordinate.longitude)
                .then(function(resp) {
                          console.log('this is the resp from the controller from uber', resp);
                          Map.mapStore($scope.position.coords.latitude, $scope.position.coords.longitude, $scope.destination.latitude, $scope.destination.longitude, $scope.name);
                        });
              });
          });
          if (error) {
            console.log(error);
          }
        });
      }
  };

  $scope.showAlert = function(ev) {
  // Appending dialog to document.body to cover sidenav in docs app
  // Modal dialogs should fully cover application
  // to prevent interaction outside of dialog
  $mdDialog.show(
    $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('We\'re spinning the roulette wheel.')
      .textContent('Hold on!')
      .ariaLabel('It\'s spinning.')
      .ok('Got it!')
      .targetEvent(ev)
    );
  };

}]);

angular.module('pubroulette.map', [])

.factory('Map',['$window', function($window){

  var coordinates = {

    startLat: '',

    startLong: '',

    endLat: '',

    endLong: '',

    name: '',

  };

  var mapTruth;

  var mapShow = function(){
    return mapTruth;
  };

  var mapStore = function(startLat, startLong, endLat, endLong, name) {
    mapTruth = true;
    coordinates.startLat = startLat;
    coordinates.startLong = startLong;
    coordinates.endLat = endLat;
    coordinates.endLong = endLong;
    coordinates.name = name;
  };

  return {
    coordinates: coordinates,
    mapStore: mapStore,
    mapShow: mapShow
  };

}]);

angular.module('pubroulette.uberapi', [])

.factory("UberAPI", ['$http', function ($http) {

  var uberData = {};

  var passLocation = function(startLat, startLong, endLat, endLong){
    return $http({
      method: 'POST',
      url: '/api/uber/journey',
      data: {startLat: startLat, startLong: startLong, endLat: endLat, endLong: endLong}
    })
    .then(function(resp){
      console.log("uber API got a response! ", resp);
      uberData.data = resp.data;
      console.log('Hi this is the uberData in UberAPI being set', uberData);
      return resp;
    });
  };

  return {
    passLocation: passLocation,
    uberData: uberData
  };
}]);

angular.module('pubroulette.yelpapi', [])

.factory("YelpAPI", ['$http', function ($http) {

  var clickedTruth;

  var clicked = function(){
    return clickedTruth;
  };

  var clickedFirst = function(){
    clickedTruth = true;
  };

  var passLocation = function(lat, long){
    return $http({
      method: 'POST',
      url: '/api/yelp/location',
      data: {lat: lat, long: long}
    })
    .then(function(resp){
      console.log("Yelp API got a response! ", resp);
      return resp;
    });
  };

  return {
    passLocation: passLocation,
    clicked: clicked,
    clickedFirst: clickedFirst
  };
}]);

angular.module('pubroulette.mapMaker', [])
.controller('MapController', ['$scope', '$log', '$timeout', 'Map', 'UberAPI', '$mdDialog', function($scope, $log, $timeout, Map, UberAPI, $mdDialog){

  $scope.mapShow = function() {
    var result = false;
    if (Map.mapShow() === true) {
      result = true;
    }
    return result;
  };

  $scope.coordinates = {};

  $scope.uberData = {};

  $scope.$watch(function () { return Map.coordinates; }, function(newValue, oldValue) {
      if (newValue !== oldValue) {
        console.log("this is inside mapcontroller", newValue);
        $scope.coordinates = newValue;
      }
    }, true);

  $scope.$watch(function () { return UberAPI.uberData; }, function(newValue, oldValue) {
    console.log('Hi I\'m watching the uberData ', UberAPI.uberData);
      if (newValue !== oldValue) {
        console.log("this is inside mapcontroller for Uber ", newValue);
        $scope.uberData = newValue;
        $scope.showConfirm();
      }
    }, true);

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('You\'re about to go to ' + $scope.coordinates.name +  '.')
          .textContent('It\'ll cost about ' + $scope.uberData.data.prices[0].estimate + '.')
          .ariaLabel('Uber Confirmation')
          .targetEvent(ev)
          .ok('Teleport me there!')
          .cancel('Spin again.');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to go to collect your winnings!';
      $scope.showAlert();
    }, function() {
      $scope.status = 'You decided spin again.';
    });
  };

  $scope.showAlert = function(ev) {
  // Appending dialog to document.body to cover sidenav in docs app
  // Modal dialogs should fully cover application
  // to prevent interaction outside of dialog
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
  };
});

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
  };

}])
.directive('ngLoading', function() {
  return {
    restrict: 'E',
    template: "<md-progress-linear ng-if='mapShow() === false && clicked() === true' md-mode='indeterminate'></md-progress-linear>"
  };
});
