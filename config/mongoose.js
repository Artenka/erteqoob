/**
 * Created by Alexandr_G on 06.12.2016.
 */
var mongoose = require('mongoose');
var config = require('./config');

// LOGGER =====================================
var eLogger = require('../lib/logger').eLogger;

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

// When successfully connected
db.on('connected', function() {
    console.log('Mongoose default connection open');
});

// If the connection throws an error
db.on('error', function(err) {
    eLogger.error(err);
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function() {
    mongoose.disconnect();
    console.log('Mongoose default connection disconnected');
});

module.exports = mongoose;
module.exports.autoIncrement = autoIncrement;