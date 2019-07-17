/**
 * Created by Alexandr_G on 06.12.2016.
 */
var log4js = require('log4js');
var config = require('./../config/config');
log4js.configure(config.get('logger'));

var wLogger = log4js.getLogger('warnings-logger');
var eLogger = log4js.getLogger('errors-logger');
var iLogger = log4js.getLogger('info-logger');
var gmailLogger = log4js.getLogger('gmail-logger');

wLogger.setLevel('WARN');
eLogger.setLevel('ERROR');
iLogger.setLevel('INFO');
gmailLogger.setLevel('INFO');

exports.wLogger = wLogger;
exports.eLogger = eLogger;
exports.iLogger = iLogger;
exports.gmailLogger = gmailLogger;