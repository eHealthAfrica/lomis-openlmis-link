'use strict';

var LOMIS_OLMIS_MAP = {
  "BCG": {
    unit: 10,
    lomis: {
      "075bd789-4b29-4033-80b6-4f834e602628": 20,
      "87115282-6a35-42fb-ae2b-860e510b592f": 20
    }
  },
  "MEASLES": {
    unit: 10,
    lomis: {
      "8471294c0c04-3ac0-46c6-80c3-032404e3": 1,
      "d72c2e18-6c9c-447a-83d9-128a168c1cbb": 10
    }
  },
  "PENTA1": {
    unit: 10,
    lomis: {
      "756fe956-aaad-4114-93fc-43199d86e59d": 20
    }
  },
  "POLIO20DOSE": {
    unit: 20,
    lomis: {
      "7166c17b-e017-41d4-84c6-8a81e25ac16c": 20
    }
  },
  "PENTA10": {
    unit: 10,
    lomis: {
      "f97be2aa-d5b6-4560-8f31-5a559fb80567": 10
    }
  },
  "POLIO10DOSE": {
    unit: 10,
    lomis: {
      "399fe9ef-1a00-47e3-a736-7cc371574379": 10
    }
  },
  "SYRINGE0.5ML": {
    unit: 10,
    lomis: {}
  },
  "TETANUS": {
    unit: 10,
    lomis: {
      "dfe5b135-12b8-4da0-ad39-b54e864f5663": 20,
      "f431494a-6c48-4d85-b6ee-1229f458756c": 1
    }
  },
  "SYRINGE5ML": {
    unit: 10,
    lomis: {
      "d1a1d9958b1c-4f698a8d-5477-4f55-9811": 1
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