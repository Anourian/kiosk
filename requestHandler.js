var request = require('request');
/*var db = require('./server/models')*/
var practice ={doctor:99768,office:106424};

var auth  = {ready:false, headers:{Authorization:''},validTo:0};
var urls = {
  appointments:"https://drchrono.com/api/appointments",
  patients:"https://drchrono.com/api/patients",
  patientSummary:"https://drchrono.com/api/patients_summary",
  token:'https://drchrono.com/o/token/',

};
/*function authorization (){
  if (auth.ready){
    if(validTo > +new Date()){
      return auth.code      
    } else {
      requestHandler.refreshToken(function(data){

      })
    }
  } else {
    db.auth.find({}, function(err, data){
      if (err){
      } else {
        auth.code = true;
        var currentDate = +new date();
        var validDate = +new Date (data.expires_at); //converts to milliseconds
        var tenHours = 36000000;
        validDate.
        if ()
        auth.headers.Authorization = data.access_token
      }
    });
    
  }
}*/
var requestHandler = {
  confirmAppointment:function(req, res){
    var id = req.body.id;
    delete req.body.id;
    var options = {
    url:urls.appointments + '/' + id,
    headers:headers,
    form:req.body
    };
    request.put(options,'utf-8',function(error, response, body){ 
      if (error){
        res.end(error);
      }
      res.end(JSON.stringify(response));      
    });
  },
  createAppointment:function(req, res){
    var body = req.body;
    body.doctor = practice.doctor;
    body.office = practice.office;
    var options = {
    url:urls.appointments,
    headers:headers,
    form:body
    };
    request.post(options,'utf-8',function(error, response, body){ 
      if (error){
        res.end(error);
      }
      res.end(JSON.stringify(response));      
    });
  },
  createUser:function(req,res){
    req.body.doctor = practice.doctor;
    var options = {
    url:urls.patients,
    headers:headers,
    form:req.body
    };
    request.post(options,'utf-8',function(error, response, body){ 
      if (error){
        res.end(error);
      }
      res.end(JSON.stringify(response));      
    });
  },
  getAppointments: function(req, res){    
    var query = req.query;
    console.log(query);
    var options = {
    url:urls.appointments,
    headers:headers,
    qs:query
    };
    request.get(options,'utf-8',function(error, response, body){ 
      if (error){
        res.end(error);
      }
      res.end(JSON.stringify(response));      
    });
  },
  login: function(req, res){  
      var options = {
      uri:urls.patients,
      headers:headers,
      qs:req.body
      };
      request.get(options,'utf-8',function(error, response, body){ 
        if (error){
          res.end(error);
        }
        res.end(JSON.stringify(response));      
      });
  },
  refreshToken:function(callback){
    
    var options = {
    url:urls.token,
    headers:'Bearer ' + auth.headers,
    form:oauth
    };
    request.post(options,'utf-8',function(error, response, body){ 
      if (error){
        callback(body);
      }
      callback(body);      
    });
  },
  token:function(req, res){
    
    var options = {
    url:urls.token,
    headers:headers,
    form:oauth
    };
    request.post(options,'utf-8',function(error, response, body){ 
      if (error){
        res.end(error);
      }
      res.end(JSON.stringify(response));
      
    });
  },
  updateUser:function(req,res){
    var options = {
    url:urls.patients +'/' + req.body.id,
    headers:headers,
    form:req.body
    };
    request.put(options,'utf-8',function(error, response, body){ 
      if (error){
        res.end(error);
      }
      res.end(JSON.stringify(response));
      
    });
  }
}



module.exports = requestHandler;