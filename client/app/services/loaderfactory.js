angular.module('pubroulette.loaderfactory', [])
.factory('Loader', function() {
    
  var loaderTruth;
  
  var showLoader = function() {
    if (loaderTruth === true) {
      loaderTruth = false;
    } else {
      loaderTruth = true;
    }
  };
  
  var loaderShow = function() {
    return loaderTruth;
  }; 

  return {
    showLoader: showLoader,
    loaderShow: loaderShow
  };

});
