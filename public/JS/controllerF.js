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
          console.log("=-=-=-=-=-=-=-=-");
          Auth.login(lCtrl.loginData.email, lCtrl.loginData.password)
            .then(function(res){
              if(response.success)
                AuthToken.setToken(res.token)
                $location.path('/')
            })
        }

        lCtrl.doLogout = function(){
          Auth.logout()
          lCtrl.user = ''
          $location.path('/')
        }


//=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=/
// logic to open sign up modal
        lCtrl.welcomeSesame = function() {
          $('#signUpModal').foundation('open')
        }

//=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=/
// logic to open success modal inside of sign up
        lCtrl.successSesame = function() {
          $('#regSuccessModal').foundation('open')
        }

//=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=/
// logic to open login modal
        lCtrl.openSesame = function() {
          // console.log($('#loginModal'))
          $('#loginModal').foundation('open')
        }

      }
}());
