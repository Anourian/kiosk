(function(){
  angular.module('kiosk')
  .factory('appointmentService', function($http, $sessionStorage, $state){
    function constructDigits(value){
        if (value < 10){
          return '0' + value;
        } else {
          return value;
        }
      };
    function dateRange(){
      var date = new Date();
      var year = date.getUTCFullYear();
      var month = date.getUTCMonth() +1;
      var day = date.getDate();
      var lastMonth = month + 6;
      var lastYear;
      if (lastMonth > 12){
        lastYear = year + 1;
        lastMonth = lastMonth % 12;
      } else {
        lastYear = year;
      }
      day = constructDigits(day);
      month = constructDigits(month);
      lastMonth = constructDigits(lastMonth);
      var firstDay = year + '-'+ month + '-' + day; 
      var lastDay = lastYear + '-' + lastMonth + '-' + day;
      var range = firstDay + '/' + lastDay;
      return range;
    };
    function confirmAppointment(obj){
      return $http.put('/appointments',obj).then(function(data){
        return JSON.parse(data.data.body);
      })
      .catch(function(data){
        return {error:'Please try again at a later time or see receptionist'}
      })
    };
    function createAppointment(obj){
      return $http.post('/appointments',obj).then(function(data){
        return data;
      })
      .catch(function(data){
        return {error:'Please try again at a later time or see receptionist'}
      })
    };
    function getAppointments(user){           
      return $http.get('/appointments',{params:user}).then(function(data){
        return JSON.parse(data.data.body);
      })
      .catch(function(data){
        return {error:'Please try again at a later time or see receptionist'}
      })
    };
    function available(appointments){
      var timezoneOffset = -7;
      var map = {};
      var length = appointments.length;
      for (var i =0;i < length; i++){
        var date = new Date(appointments[i].scheduled_time);
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth();
        var day = date.getDate();
        var hours = date.getUTCHours();        
        var minutes = date.getUTCMinutes();
        if (!map[year]){
          map[year] = {};
        }
        if (!map[year][month]){
          map[year][month] = {}
        }
        if (!map[year][month][day]){
          map[year][month][day] = {dayofweek:date.getUTCDay()};
        }
        if (!map[year][month][day][hours]){
          map[year][month][day][hours] = {}
        }
        map[year][month][day][hours][minutes] = appointments[i].duration;
      }
      return map;
    };
    function getSchedule(checkDate, map){
      result = [];
      var date = new Date(checkDate);
      var year = date.getUTCFullYear();
      var month = date.getUTCMonth();
      var day = date.getDate();
      if (map[year]){
        if(map[year][month]){
          if(map[year][month][day]){
            var appointments = map[year][month][day];
            var appointmentsTime = Object.keys(appointments);
            var amount = appointmentsTime.length;
            for (var a = 0; a < amount; a ++){
              var minutes = Object.keys(appointments[appointmentsTime[a]]);
              var multi = minutes.length; //multiple appointments in an hour
              for (var b = 0; b < multi; b++){
                var info = constructDigits(appointmentsTime[a])+ ":" + constructDigits(minutes[b]) + ' for ' + appointments[appointmentsTime[a]][minutes[b]] + ' minutes';
                result.push(info);                
              }
            }
          }
        }
      }
      return result;

    };
    function createTime(){
      var minutes = 59;
      var hours = 23;
      var time = {minutes:[],hours:[]};
      convert(minutes,'minutes');
      convert(hours,'hours')
      function convert(value,type){
        for (var a = 0; a <= value; a ++){
          if (a < 10){
            time[type].push('0' + a);
          } else {
            time[type].push('' + a);
          }
        }
      };
      return time;

    }
    return {
      available:available,
      confirmAppointment:confirmAppointment,
      createAppointment:createAppointment,
      createTime:createTime,
      constructDigits:constructDigits,
      dateRange:dateRange,
      getAppointments:getAppointments,
      getSchedule:getSchedule,
    };
  });
})()