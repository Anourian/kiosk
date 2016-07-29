var obj = require('./mongo');

exports.postPage = {
  get:function(params, cb){
    obj.configPage.find(function(err, data){     
      if(err){
        cb(err)
      } else {
        cb(data);
      }      
    })
  },
  save:function(config, cb){
    config.facets = JSON.stringify(config.facets);
    config.sorting = JSON.stringify(config.sorting);
    config.productdetails = JSON.stringify(config.productdetails);
    var sitePage = new obj.configPage(config);
    sitePage.save(function(err, data){
      if(err){
        cb(err)
      } else {
        cb(data);
      }
    })
  }
};

