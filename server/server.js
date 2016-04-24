var express = require('express');
var app = express();
var db = require('./util/config').db;
var mongoose = require('mongoose');

var mongooseUsername = db.username;
var mongoosePassword = db.password;

mongoose.connect('mongodb://'+mongooseUsername+':'+mongoosePassword+'@ds032319.mlab.com:32319/pubroulette');

require('./util/request-helper.js')(app, express);

module.exports = app;
