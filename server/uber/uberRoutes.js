var uberController = require('./uberController.js');

module.exports = function(app) {

  app.post('/journey', uberController.estimate);
  app.get('/authenticate', uberController.authenticate);
  app.get('/callback', uberController.token);
};
