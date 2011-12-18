var specHelper = require('../specHelper.js').specHelper;
var suite = specHelper.vows.describe('API general function');
var apiObj = {};

suite.addBatch({
  'specHelper.prepare':{
    topic: function(){ var cb = this.callback; specHelper.prepare(function(api){ apiObj = specHelper.cleanAPIObject(api); cb(); }) },
    'api object should exist': function(){ specHelper.assert.isObject(apiObj); } }
});

var randomNumber = -1;
suite.addBatch({
  "random numbers": {
    topic: function(){ specHelper.apiTest.get('/randomNumber', {} ,this.callback ); },
    'error' : function(res, b){ 
      randomNumber = res.body.randomNumber;
      specHelper.assert.equal("OK", res.body.error); 
    },
    'randomNumber_num' : function(res, b){ specHelper.assert.isNumber(randomNumber); },
    'randomNumber_greater' : function(res, b){ specHelper.assert.isTrue(randomNumber < 1); },
    'randomNumber_less' : function(res, b){ specHelper.assert.isTrue(randomNumber > 0); },
  }
});

suite.addBatch({
  "is random": {
    topic: function(){ specHelper.apiTest.get('/randomNumber', {} ,this.callback ); },
    'error' : function(res, b){ 
      specHelper.assert.isTrue(res.body.randomNumber != randomNumber); 
    },
  }
});

// export
suite.export(module);