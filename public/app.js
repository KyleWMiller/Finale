(function() {
  'use strict';

  angular.module('soilsApp', ['ui.router','authService','MyControllers'])
    .config(MainRouter)
    .controller('ProductController', ProductController)

// ========================================================= //
// Ui-Router
// ========================================================= //

    function MainRouter ($stateProvider, $urlRouterProvider, $httpProvider){
      $stateProvider
        .state('HomePage', {
          url: '/',
          templateUrl: '/HTML/home.html',
          controller: 'loginCtrl as lCtrl'
        })
        .state('ProductPage', {
          url: '/productPage',
          templateUrl: '/HTML/products.html'
        })
        .state('Login', {
          url: '/login',
          templateUrl: '/HTML/home.html',
          controller: 'loginCtrl as lCtrl'
        })

        $urlRouterProvider.otherwise('/')
    }
// ========================================================= //
// Product Controller
// ========================================================= //

    function ProductController (){

    }
}());
