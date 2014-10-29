'use strict';

var q = require("q");
var request = require('request');
var config = require('konfig')();
var log4js = require('log4js');
var pouchdb = require('pouchdb');
var restClient = require('./libs/rest-client.js');

var LOG_CATEGORY = 'lomis-openlmis-link';
log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'file', filename: 'log.log', category: LOG_CATEGORY}
    ]
});
var logger = log4js.getLogger(LOG_CATEGORY);
var DB_URL = config.app.DB_URL;
var stockCountDB = 'stockcount';
var SC_DB_URL = DB_URL + stockCountDB;

var mainDB = new pouchdb(SC_DB_URL);
var options = {
    live: true,
    include_docs: true,
    since: 'now'
};

mainDB.changes(options)
    .on('change', function (change) {
        logger.info(change);
    })
    .on('error', function (err) {
        logger.error(err);
    });




