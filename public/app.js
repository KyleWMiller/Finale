;(function () {
  'use strict'

  angular.module('soilsApp', ['ui.router', 'myControllers', 'authService'])
    .config(MainRouter)


  function MainRouter ($stateProvider, $urlRouterProvider,$httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor')

    $stateProvider
      .state('HomePage', {
        url: '/',
        templateUrl: '/HTML/home.html'
        })
      .state('login', {
        url: '/login',
        templateUrl: '/HTML/login.html'
      })

    $urlRouterProvider.otherwise('/')
  }

}())
