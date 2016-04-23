var yelpController = require('./yelpController.js');

module.exports = function (app) {

  app.post('/location', yelpController.search);
};
