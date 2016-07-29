(function(){
  angular.module('kiosk')
  .controller('confirmController',['appointmentService','$sessionStorage', '$state', function(appointmentService, $sessionStorage, $state){
    vm = this;
    activate();
    function activate(){
      vm.user = $sessionStorage.user;
      if (!vm.user){
        $state.go('home');
      } else {        
        var query = {
          patient:vm.user.id,
          date_range:appointmentService.dateRange()
        };
        appointmentService.getAppointments(query)
        .then(function(data){
          vm.appointments = data;
        });
      } 
    };
    vm.confirm = function(index){
      var appointment = vm.appointments.results[index];
      var query = {
        id:appointment.id,
        patient:appointment.patient,
        exam_room:appointment.exam_room,
        duration:appointment.duration,
        doctor:appointment.doctor,
        office:appointment.office,
        scheduled_time:appointment.scheduled_time,
        status:'Confirmed'
      };
      appointmentService.confirmAppointment(query)
      .then(function(data){
        if(data.id === appointment.id){
          vm.appointments.results[index] = data;
        }
      });
    };
  }])
})();