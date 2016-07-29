(function(){
  angular.module('kiosk')
  .factory('authService', function($http, $localStorage, $state){
    var token = {
      access:'',
      refresh:'',
      expiresAt:0
    };
    function authenticate (){

    }
    function authenticated (){
      var $localStorage.token_expires;
      if ($localStorage.token_expires){
        
      }
    };
    return {
      authenticated:authenticated
    }

  });
})()