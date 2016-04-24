(function() {
  'use strict';
    angular.module('MyControllers',[])
      .controller('loginCtrl', loginCtrl)
      .controller('signupCtrl', singupCtrl)

      loginCtrl.$inject = ["Auth", "$location", "$rootScope","$state","userFactory","$modal"]


      function loginCtrl (Auth,$location,$rootScope,$state,userFactory,$modal) {
        var lCtrl = this
        lCtrl.userData = {}
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
        lCtrl.openSignUp = function(){
          console.log("opening signUp modal");
          var modalInstance = $modal.open({
            templateUrl: 'signup.html',
            controller: 'signupCtrl as sCtrl',
            resolve: {
              userData: function() {
                return lCtrl.userData;
              }
            }
          })

        }
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
// Sign up callback function
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
        lCtrl.signUp = function(){
          console.log('Submiting new user')
          userFactory.makeUser(lCtrl.userData)
          lCtrl.successSesame()
        }
// logic to open success modal inside of sign up
        lCtrl.successSesame = function() {
          $('#regSuccessModal').foundation('open')
        }

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
// Login callback function
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
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


// logic to open sign up modal
        lCtrl.welcomeSesame = function() {
          $('#signUpModal').foundation('open')
        }


// logic to open login modal
        lCtrl.openSesame = function() {
          // console.log($('#loginModal'))
          $('#loginModal').foundation('open')
        }

      }
      function singupCtrl($modalInstance, userData, userFactory){
        var sCtrl = this
        sCtrl.submit = function() {
          console.log("submit biotch")
          userFactory.makeUser(sCtrl.userData)
          $modalInstance.close(sCtrl.userData)
        }
      }
}());
