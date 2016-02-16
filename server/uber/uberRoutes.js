var uberController = require('./uberController.js');


module.exports = function (app) {
  // app === uberRouter injected from request-helper.js

  // estimate to start
  // need to figure out sandbox
  // then user authentication and requests
  app.post('/journey', uberController.estimate);
  /*app.post('/destination', uberController.signup);
  app.get('/route', uberController.checkAuth);*/
};
