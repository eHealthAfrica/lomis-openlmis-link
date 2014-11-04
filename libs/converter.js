'use strict';

 //TODO: change to proper and flexible product mapping.
var LOMIS_OLMIS_MAP = {
  "P151": {
    unit: 10,
    lomis: {
      "f5aed4250cb8a8260c5bf776e90052c1": 10
    }
  }
};


var converter = {
  fromStockCount: function (stockCount, programProducts) {
    var products = [];
    var pp;
    for (var i in programProducts) {
      pp = programProducts[i];
      var ppMap = LOMIS_OLMIS_MAP[pp.productCode.toUpperCase()];
      var res = {
        productCode: pp.productCode,
        stockInHand: 0
      };
      if (ppMap && ppMap.lomis) {
        for (var p in ppMap.lomis) {
          var scBal = stockCount.unopened[p];
          if (!isNaN(scBal)) {
            res.stockInHand += scBal;
          }
        }
      }
      products.push(res);
    }
    return products;
  },
  toLomisProducts: function (products) {
    //TODO: implement
  },
  createReport: function(agentCode, programCode, products){
    return {
      agentCode: agentCode,
      programCode: programCode,
      products: products
    };
  }
};

module.exports = converter;