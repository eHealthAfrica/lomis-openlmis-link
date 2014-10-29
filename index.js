'use strict';

var q = require("q");
var request = require('request');
var config = require('konfig')();
var log4js = require('log4js');
var pouchdb = require('pouchdb');
var restClient = require('./libs/rest-client.js');
var converter = require('./libs/converter.js');

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
//TODO: load agent code from map between agent code and facility code or use facility uuid as agent code.
var agentCode = config.app.AGENT_CODE;
var defaultProgram = config.app.DEFAULT_PROGRAM;

mainDB.changes(options)
  .on('change', function (change) {
    var stockCount = change.doc;
    submitStockCount(stockCount, defaultProgram, agentCode)
      .then(function (res) {
        logger.info(res);
      })
      .catch(function (err) {
        logger.error(err);
      });
  })
  .on('error', function (err) {
    logger.error(err);
  });

var submitStockCount = function (sc, prog, agentCode) {
  return generateReport(sc, prog, agentCode)
    .then(function (report) {
      return restClient.submitRequisition(report);
    });
};

var generateReport = function (stockCount, program, agentCode) {
  return restClient.getProgramProducts(program)
    .then(function (res) {
      var programProductList = converter.fromStockCount(stockCount, res.programProductList);
      return converter.createReport(agentCode, defaultProgram, programProductList);
    });
};




