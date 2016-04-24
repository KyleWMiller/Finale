(function() {
  'use strict';

  angular.module('soilsApp', ['ui.router','authService','MyControllers','productFactory','userFactory'])
    .config(MainRouter)
    .controller('ProductController', ProductController)

    // $('#foo').foundation(); // initialize all plugins
    // $('.has-tip').foundation(); // initialize all tooltips on the page.

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
