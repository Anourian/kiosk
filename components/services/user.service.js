(function(){
  angular.module('kiosk')
  .factory('userService', function($http, $sessionStorage, $state){

    function checkUser(obj){      
      return $http.post('/login',obj).then(function(data){        
        return filterResults(data);
      })
      .catch(function(data){
        return {error:'Please try again at a later time or see receptionist'}
      })
    };
    function filterResults (data, selection){
      if (data){
          var user = JSON.parse(data.data.body);
          if (user.count === 0){
            return {error:'Account not found. Please try again, create an account or see receptionist.',count:0};
          } else if(user.count === 1){
            saveData(user.results[0]);
            return {};
          } else {
            return {error:'There was an issue finding your account. Please see receptionist.'};
          }
        }
    };
    function saveData(obj){
      $sessionStorage.user = obj;
    };
    function createUser (patient){
      return $http.post('/create',patient).then(function(data){
        return data;
      })
      .catch(function(data){
        return {error:'Please try again at a later time or see receptionist'}
      })
    };
    function updateUser(info){
      return $http.put('/updateuser',info).then(function(data){
        return data;
      })
      .catch(function(data){
        return {error:'Please try again at a later time or see receptionist'}
      })
    }
    return {
      checkUser:checkUser,
      createUser:createUser,
      updateUser:updateUser,
      saveData,saveData
    }
  });
})()