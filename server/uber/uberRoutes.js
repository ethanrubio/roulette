var uberController = require('./uberController.js');


module.exports = function(app) {

  app.post('/journey', uberController.estimate);
};
