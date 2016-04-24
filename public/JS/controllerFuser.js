(function() {
  'use strict';
    angular.module('MyControllers',[])
      .controller('loginCtrl', loginCtrl)

      loginCtrl.$inject = ["Auth", "$location", "$rootScope","$state","signinFactory","newUsersFactory"]


      function loginCtrl (Auth,$location,$rootScope,$state,signinFactory,newUsersFactory) {
        var lCtrl = this

        lCtrl.loggedIn = Auth.isLoggedIn()

        $rootScope.$on('$stateChangeSuccess', function(){
          // console.log("State is being changed")
          lCtrl.loggedIn = Auth.isLoggedIn()
          if(lCtrl.loggedIn){
          Auth.getUser()
            .then(function(response){
              lCtrl.user = response.data
            })
          } else {
            $location.path("/")
          }
        })

        lCtrl.signUp = function(){
          console.log('Submiting new user')
          userData.makeUser()
          lCtrl.successSesame()
          return user
        }

//=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=/
// logic to open success modal inside of sign up
        lCtrl.successSesame = function() {
          $('#regSuccessModal').foundation('open')
        }


        lCtrl.doLogin = function(){
          console.log("=-=-=-=-Do Login=-=-=-=-");
          Auth.login(lCtrl.loginData.email, lCtrl.loginData.password)
            .then(function(res){
              console.log(res)
              if(res.data.success){
                AuthToken.setToken(res.data.token)
                $state.go('ProductPage')
              }
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
// logic to open login modal
        lCtrl.openSesame = function() {
          // console.log($('#loginModal'))
          $('#loginModal').foundation('open')
        }

      }
}());