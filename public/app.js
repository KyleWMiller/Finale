(function() {
  'use strict';

  angular.module('soilsApp', ['ui.router', 'mm.foundation',"authService",'MyControllers','productFactory'])
    .config(MainRouter)
    .controller('ProductController', ProductController)


// ========================================================= //
// Ui-Router
// ========================================================= //

    function MainRouter ($stateProvider, $urlRouterProvider, $httpProvider){
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

        $urlRouterProvider.otherwise('/')
    }
// ========================================================= //
// Product Controller
// ========================================================= //

    function ProductController (){



    }
}());
