(function(){
  angular.module('kiosk')
  .controller('createController',['appointmentService', '$sessionStorage', '$state', 'uibDateParser', function( appointmentService, $sessionStorage, $state, uibDateParser){
    vm = this;  
    vm.new = {};
    activate();
    function activate(){
      vm.user = $sessionStorage.user;
      var today = new Date();
      var lastDay = new Date ();
      lastDay.setMonth(lastDay.getMonth() + 6);
      vm.time = appointmentService.createTime();
      vm.appointmentOptions = {
        minDate:today,
        maxDate:lastDay
      };
      vm.appointmentDate = new Date();
      if (!vm.user){
        $state.go('home');
      } else {        
        var query = {
          date_range:appointmentService.dateRange()
        };
        appointmentService.getAppointments(query)
        .then(function(data){
          if (data.count > 0){            
            vm.appointments = appointmentService.available(data.results);
          }
        });
      } 
    };
    vm.create = function(){
      var date = new Date(vm.appointmentDate);
      var toSend = "" + date.getUTCFullYear() + '-' + date.getUTCMonth() + '-' + date.getDate()+'T';
      var timeSlot = "" + vm.new.hour + ':' + vm.new.minutes + ":00";
      var appointment = {
        exam_room:1,
        patient:vm.user.id,
        duration:parseInt(vm.new.duration),
        scheduled_time:toSend+timeSlot
      }; 
      appointmentService.createAppointment(appointment)
      .then(function(data){
        var body = JSON.parse(data.data.body);
        if(body.id){
          vm.new = {
            hour:'',
            minutes:'',
            duration:0,
            reason:''
          };
          vm.success = 'Appointment Created';
        } else {
          vm.error = 'There was an error creating an appointment. Please try again later or see receptionist'
        }
      });
    };
    vm.getSchedule = function(model){
      vm.scheduled = appointmentService.getSchedule(model,vm.appointments);
    }
  }])
})()