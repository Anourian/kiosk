(function(){
  angular.module('kiosk',['ui.router','ui.mask','ngStorage','ui.bootstrap'])
  /*.run(function ($rootScope, $state, authService) {
  $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
    if (toState.name !== 'auth' && !authService.authenticate()) {
      $state.go('auth');
    }
  });
});*/
})();