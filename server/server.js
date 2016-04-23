var express = require('express');
var app = express();

require('./util/request-helper.js')(app, express);

module.exports = app;
