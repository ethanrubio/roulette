var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    picture: String,
    first_name: String,
    last_name: String,
    uuid: String,
    rider_id: String,
    email: String,
    mobile_verified: Boolean,
    promo_code: String,
    access_token: String
});