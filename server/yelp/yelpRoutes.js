var yelpController = require('./yelpController.js');


module.exports = function (app) {
  // app === yelpRouter injected from request-helper.js
  console.log(app);

  app.post('/location', yelpController.search);
  /*app.get('/bar', yelpController.checkAuth);*/
};
