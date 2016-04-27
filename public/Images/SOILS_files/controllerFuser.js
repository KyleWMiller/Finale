(function() {
  'use strict';
  angular.module('userControllers', [])
  .controller('loginModalCtrl', loginModalCtrl)
    .controller('loginCtrl', loginCtrl)
    .controller('signupCtrl', signupCtrl)


    loginModalCtrl.$inject = ['$modalInstance', '$modal', 'Auth','AuthToken', '$location', '$rootScope', '$state','userFactory']

    function loginModalCtrl($modalInstance, $modal, Auth, AuthToken, $location, $rootScope, $state, userFactory) {
      var lmCtrl = this

      lmCtrl.doLogin = function() {
        console.log("=-=-=-=-Do Login=-=-=-=-", $modal, $modalInstance)
        Auth.login(lmCtrl.loginData.email, lmCtrl.loginData.password)
          .then(function(res) {
            console.log(res)
            if (res.data.success) {
              console.log('something=-=-=-=--=-=-=-=-=-=-=')
              AuthToken.setToken(res.data.token)
              $state.go('ProductPage')
              $modalInstance.close()
            }
          })
      }
    }

  loginCtrl.$inject = ['Auth', 'AuthToken', '$location', '$rootScope', '$state', 'userFactory', '$modal']

  function loginCtrl(Auth, AuthToken, $location, $rootScope, $state, userFactory, $modal) {
    var lCtrl = this
    lCtrl.userData = {}
    lCtrl.loggedIn = Auth.isLoggedIn()

    $rootScope.$on('$stateChangeSuccess', function() {
      // console.log("State is being changed")
      lCtrl.loggedIn = Auth.isLoggedIn()
      if (lCtrl.loggedIn) {
        Auth.getUser()
          .then(function(response) {
            lCtrl.user = response.data
          })
      } else {
        $location.path("/")
      }
    })




//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
// Sign up
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
    // foundation open signup modal
    lCtrl.openSignUp = function() {
      console.log("opening signUp modal");
      var modalInstance = $modal.open({
        templateUrl: 'signupModal.html',
        controller: 'signupCtrl as sCtrl',
        resolve: {
          userData: function() {
            return lCtrl.userData;
          }
        }
      })
    }
    // login modal
    lCtrl.openLogin = function() {
      console.log("opening login modal")
      var modalInstance = $modal.open({
        templateUrl: 'loginModal.html',
        controller: 'loginModalCtrl as lmCtrl',
        resolve: {
          userData: function() {
            return lCtrl.loginData
          }
        }
      })
    }


    lCtrl.doLogout = function() {
      Auth.logout()
      lCtrl.user = ''
      $location.path('/')
    }


  }

  signupCtrl.$inject = ['$modalInstance', 'userData', 'userFactory', '$modal']

  function signupCtrl($modalInstance, userData, userFactory, $modal) {
    var sCtrl = this
    sCtrl.submit = function() {
      console.log("submiting user to db")
      userFactory.makeUser(sCtrl.userData)
        // opens success modal
      $modalInstance.close()
      sCtrl.openSuccess()

    }
    // foundation open success modal
    sCtrl.openSuccess = function() {
      console.log("opening success modal");
      var modalInstance = $modal.open({
        templateUrl: 'successModal.html'
      })


   }

  }



}());
