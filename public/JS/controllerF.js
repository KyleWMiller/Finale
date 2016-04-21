;(function () {
  'use strict'
  angular.module('myControllers', [])
    .controller('loginCtrl', loginCtrl)

  loginCtrl.$inject = ['Auth', '$location', '$rootScope','AuthToken']

  function loginCtrl (Auth, $location, $rootScope,AuthToken) {
    var lCtrl = this


    $rootScope.$on('$stateChangeSuccess', function(){
      console.log("=========STATE CHANGE=========")
      lCtrl.loggedIn = Auth.isLoggedIn()
      Auth.getUser()
        .then(function(response){
          lCtrl.user =  response.data
          console.log("api/me route",response)
        })
    })

    lCtrl.doLogin = function(){
      console.log("doLogin:==============")
      console.log(lCtrl.loginData)
      Auth.login(lCtrl.loginData.email,lCtrl.loginData.password)
        .then(function(response){
           AuthToken.setToken(response.data.token)
          console.log("response from server",response)
          $location.path('/')
        })
    }

    lCtrl.doLogout = function(){
      Auth.logout()
      lCtrl.user = ''
      $location.path('/')
    }


  }

}())
