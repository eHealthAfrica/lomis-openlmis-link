'use strict';

var request = require('request');
var config = require('konfig')();
var q = require('q');
var REST_URL = config.app.REST_URL;
var auth = {
    username: config.app.OL_USERNAME,
    password: config.app.OL_PASSWORD
};

var restClient = {
    getFacility: function (code) {
        var facApiUrl = REST_URL + 'rest-api/facilities/' + code;
        var options = {
            method: 'GET',
            uri: facApiUrl,
            auth: auth
        };
        var deferred = q.defer();
        request(options, function (err, res, body) {
            if (res) {
                deferred.resolve(JSON.parse(res.body));
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },
    getProgramProducts: function(programCode, facTypeCode){
        var progProdUrl = REST_URL + 'rest-api/program-products?programCode='+programCode;
        var options = {
            method: 'GET',
            uri: progProdUrl,
            auth: auth
        };
        var deferred = q.defer();
        request(options, function (err, res, body) {
            if (res) {
                deferred.resolve(JSON.parse(res.body));
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },
    createAgent: function(agent){
        var crVirFacUrl = REST_URL + 'rest-api/agents';
        var options = {
            method: 'POST',
            uri: crVirFacUrl,
            auth: auth,
            json: agent
        };
        var deferred = q.defer();
        request(options, function (err, res, body) {
            if (res) {
                deferred.resolve(JSON.parse(res.body));
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },
    submitRequisition: function(report){
        var submitReqUrl = REST_URL + 'rest-api/requisitions';
        var options = {
            method: 'POST',
            uri: submitReqUrl,
            auth: auth,
            json: report
        };
    }
};

module.exports = restClient;