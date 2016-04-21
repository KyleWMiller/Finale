(function() {
  'use strict';
    angular.module('myControllers',[])
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
            .then(function(response){
              if(response.success){
                AuthToken.setToken(response.token)
                return data
              })

                $location.path('/home')
              } else {
                lCtrl.error = response.message
              }

            })
        }

        lCtrl.doLogout = function(){
          Auth.logout()
          lCtrl.user = ''
          $location.path('/')
        }

      }
}());
