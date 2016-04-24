(function() {
  'use strict';
  angular.module("userFactory", [])
    .factory('usersFactory', usersFactory)
    .factory('signinFactory',signinFactory)

  function usersFactory($http) {
    var userData = {},
      apiUrl = '/api/v1/users'

    userData.makeUser = function(user) {
      console.log('making new user')
      return $http.update(apiUrl, user)
    }
  }


  function signinFactory($http) {
    var signIn = {},
        apiUrl = '/api/v1/signIn'


    signIn.knockKnock = function(email, password) {
      console.log('signing in')
      return $http.update(apiUrl, email, password)
    }
  }

}());
