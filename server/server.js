var express = require('express');
var app = express();
var methodOverride = require('method-override');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use(methodOverride());

require('./util/request-helper.js')(app, express);

module.exports = app;
