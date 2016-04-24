(function() {
  'use strict';
  angular.module('userFactory', [])
    .factory('usersFactory', usersFactory)
    .factory('signinFactory',signinFactory)

  function usersFactory($http) {
    var userData = {},
      apiUrl = '/api/v1/users'

    userData.makeUser = function(user) {
      console.log('making new user')
      return $http.post(apiUrl, user)
      userData.successSesame()
    }

    //=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=/
    // logic to open success modal inside of sign up
            userData.successSesame = function() {
              $('#regSuccessModal').foundation('open')
            }
  }


  function signinFactory($http) {
    var signIn = {},
        apiUrl = '/api/v1/signIn'


    signIn.knockKnock = function(email, password) {
      console.log('signing in')
      return $http.put(apiUrl, email, password)
    }
  }

}());
