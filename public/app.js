(function() {
  'use strict';

  angular.module('soilsApp', ['ui.router'])
    .config(MainRouter)
    .controller('productController', productController)


    function MainRouter ($stateProvider, $urlRouterProvider,$httpProvider){
      $stateProvider
        .state('HomePage', {
          url: '/',
          templateUrl: '/HTML/home.html',
          controller: 'loginCtrl as lCtrl'
        }),
        .state('ProductPage', {
          url: '/productPage',
          templateUrl: '/HTML/home.html'
        }),
        .state('Login', {
          url: '/login',
          templateUrl: '/HTML/home.html'
          controller: 'loginCtrl as lCtrl'
        })

        $urlRoutProvider.otherwise('/')
    }

}());
