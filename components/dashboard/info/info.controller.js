(function(){
  angular.module('kiosk')
  .controller('infoController',['userService', '$sessionStorage', function(userService, $sessionStorage){
    vm = this;
    activate();
    function activate(){
      vm.edit = $sessionStorage.user;
      if (!vm.user){
        $state.go('home');
      }
    }
    vm.updateUser = function(){
      userService.updateUser(vm.edit).then(function(data){
        var check = JSON.parse(data.data.body);
        if(check.id){
          vm.success = 'Information updated';
          vm.error = '';
        } else {
          vm.error ="There was an error updating your information. Please try again later";
          vm.success = '';
        }
      });
    };
    
  }]);
})();