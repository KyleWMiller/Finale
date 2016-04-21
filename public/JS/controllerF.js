(function() {
  'use strict';
    angular.module('MyControllers',[])
      .controller('loginCtrl', loginCtrl)

      loginCtrl.$inject = ["Auth", "$location", "$rootScope"]



      function loginCtrl (Auth,$location,$rootScope) {
        var lCtrl = this

        lCtrl.loggedIn = Auth.isLoggedIn()

        $rootScope.$on('$rootChangeStart', function(){
          lCtrl.loggedIn = Auth.isLoggedIn()

          Auth.getUser()
            .then(function(response){
              lCtrl.user = response.data
            })
        })

        lCtrl.doLogin = function(){
          Auth.login(lCtrl.loginData.email, lCtrl.loginData.password)
            .then(function(res){
              if(response.success)
                AuthToken.setToken(res.token)
                $location.path('/home')
            })
        }

        lCtrl.doLogout = function(){
          Auth.logout()
          lCtrl.user = ''
          $location.path('/')
        }
      }
}());
