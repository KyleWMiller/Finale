;
(function() {
  'use strict'
  angular.module('authService',[])
    .factory('Auth', Auth)
    .factory('AuthInterceptor', AuthInterceptor)
    .factory('AuthToken', AuthToken)
    .factory('userFactory',userFactory)


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Token Factory
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

Auth.$inject = ['$http','$q','AuthToken']
  function Auth($http, $q, AuthToken) {
    var authFactory = {}

    authFactory.login = function(email, password) {
      return $http.post('/api/v1/signIn', {
        email: email,
        password: password
      })
    }

    authFactory.logout = function() {
      AuthToken.setToken()
    }

    authFactory.isLoggedIn = function() {
      if (AuthToken.getToken()) {
        return true
      } else {
        return false
      }
    }

    authFactory.getUser = function() {
      if (AuthToken.getToken()) {
        return $http.get('/api/v1/me')
      } else {
        return $q.reject({
          message: 'User has no token'
        })
      }
    }

    return authFactory
  }

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Stores token in local storage in browser
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
AuthToken.$inject = ['$window']

  function AuthToken($window) {
    var authTokenFactory = {}

    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token')
    }

    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token)
      } else {
        $window.localStorage.removeItem('token')
      }
    }

    return authTokenFactory
  }

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Adds token to each server request
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
AuthInterceptor.$inject = ['$q','AuthToken','$location']

  function AuthInterceptor($q, AuthToken, $location) {
    console.log("AuthInterceptor Running")
    var interceptorFactory = {}

    interceptorFactory.request = function(config) {
      var token = AuthToken.getToken()

      if (token) {
        config.headers['x-access-token'] = token
      }

      return config
    }

    interceptorFactory.responseError = function(response) {
      if (response.status == 403) {
        $location.path('/')
      }
      return $q.reject(response)
    }
    return interceptorFactory
  }

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Create Users
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//


  function userFactory($http) {
    var userData = {},
      apiUrl = '/api/v1/users'

    userData.makeUser = function(user) {
      console.log('making new user', user)
      return $http.post(apiUrl, user)
    }
    return userData
  }


}())
