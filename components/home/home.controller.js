(function(){
  angular.module('kiosk')
  .controller('homeController',['userService','$state','$sessionStorage', function(userService,$state, $sessionStorage){
    vm = this;
    vm.selected = '';
    activate();
    vm.path = function(type){      
      vm.selected = true;
      vm.selection = type;
    };
    vm.login = function(first,last,dob){
      dob = dob.split('/');
      var year = dob.pop();
      dob.unshift(year)
      dob = dob.join('-');
      var payload = {first_name:first, last_name:last, date_of_birth:dob};
      userService.checkUser(payload)
      .then(function(data){
        if(data.count === 0){
          vm.create = true;          
        } else if (!data.error){
          $state.go(vm.selection);
        }
        vm.error = data.error;
      });
    };
    function activate(){
      vm.user = $sessionStorage.user;
      if (vm.user){
        $state.go('dashboard.create');
      }
    }
  }]);
})();