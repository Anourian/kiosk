(function(){
  angular.module('kiosk')
  .controller('newpatientController',['userService', '$state', function(userService, $state){
    vm = this; 
    vm.patient = {};    
    vm.create = function(patient){
      var dob = patient.dob.split('/');
      var year = dob.pop();
      dob.unshift(year);
      dob = dob.join('-');
      var post = {
        first_name:patient.firstname,
        last_name:patient.lastname,
        date_of_birth:dob,
        gender:patient.gender
      };
      userService.createUser(post).then(function(data){
        var user = JSON.parse(data.data.body);
        if (user.id){
          userService.saveData(user);          
          $state.go('dashboard.info');
        } else {
          vm.error = 'There was an error, please try again or speak with the receptionist';
        }
       
      });
    };
    
  }]);
})();