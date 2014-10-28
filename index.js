'use strict';

var q = require("q");
var request = require('request');
var dotenv = require('dotenv');
var log4js = require('log4js');
dotenv.load();


var LOG_CATEGORY = 'lomis-openlmis-link';
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'log.log', category: LOG_CATEGORY }
  ]
});
var logger = log4js.getLogger(LOG_CATEGORY);



