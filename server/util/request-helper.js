var path = require('path');
var helpers = require('./http-helpers');
var app = require('../server.js');
var morgan = require('morgan');
var bodyParser  = require('body-parser');
var cors = require('cors');
var Uber = require('node-uber');
var Yelp = require('yelp');
var keys = require('./config.js');

var routes = {
  home: '../../client/index.html',
  style: '../styles.css',
  redirect: './public/loading.html'
};

module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  /*var userRouter = express.Router();
  var linkRouter = express.Router();*/
  var uberRouter = express.Router();
  var yelpRouter = express.Router();


  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('./client'));
  /*app.use('/node_modules', express.static(__dirname + '../../../node_modules/'));*/

  app.use('/api/uber', uberRouter);
  app.use('/api/yelp', yelpRouter);

  app.get("/", function(request, response) {
    var status = status || 200;
    console.log('This is a get request ', request);

    helpers.serveAssets(response, routes.home, function(data){
      response.writeHead(status, {'Content-Type': 'text/html'});
      // response.write(data, 'utf-8');
      response.end(data, 'utf-8');
    });
  });

  // inject our routers into their respective route files
  require('../uber/uberRoutes.js')(uberRouter);
  require('../yelp/yelpRoutes.js')(yelpRouter);
};
