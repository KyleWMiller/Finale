(function() {
  'use strict';

  angular.module('soilsApp', ['ui.router', 'mm.foundation','authService','userControllers','productFactory','productControllers','ngCart'])
    .config(MainRouter)
    .controller ('myCtrl', ['$scope', '$http', 'ngCart', function($scope, $http, ngCart) {
      ngCart.setTaxRate(8.6)
      ngCart.setShipping(4.99)
    }])



// ========================================================= //
// Ui-Router
// ========================================================= //

    function MainRouter ($stateProvider, $urlRouterProvider, $httpProvider){
      $httpProvider.interceptors.push('AuthInterceptor')

      $stateProvider
        .state('HomePage', {
          url: '/',
          templateUrl: '/HTML/home.html'
        })
        .state('ProductPage', {
          url: '/productPage',
          templateUrl: '/HTML/products.html'
        })
        .state('ContactUsPage', {
          url: '/contactUs',
          templateUrl: '/HTML/holding.html',
        })
        .state('CartPage', {
          url: '/cart',
          templateUrl: '/HTML/cart.html',
        })


        $urlRouterProvider.otherwise('/')
    }
}());
