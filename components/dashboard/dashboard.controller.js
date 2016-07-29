(function(){
  angular.module('kiosk')
  .controller('dashboardController',['userService', '$state', '$sessionStorage', function(userService, $state, $sessionStorage){
    vm = this;    
    
    activate();
    function activate(){
    	if($sessionStorage.user){
    		vm.user = $sessionStorage.user;
    	}
    };
    vm.exit = function (){
      delete $sessionStorage.user;
      $state.go('home');
    }
  }]);
})();