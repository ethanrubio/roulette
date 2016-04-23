var path = require('path');
var app = require('../server.js');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function (app, express) {
  var uberRouter = express.Router();
  var yelpRouter = express.Router();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('./client'));

  app.use('/api/uber', uberRouter);
  app.use('/api/yelp', yelpRouter);

  // inject our routers into their respective route files
  require('../uber/uberRoutes.js')(uberRouter);
  require('../yelp/yelpRoutes.js')(yelpRouter);
};
