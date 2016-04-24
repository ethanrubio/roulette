var yelpController = require('./yelpController');

module.exports = function (app) {

  app.post('/location', yelpController.search);
};
