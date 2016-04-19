(function() {
  'use strict';

  angular.module('soilsApp', ['ui.router'])
    .config(MainRouter)
    .controller('ProductController', ProductController)


    function MainRouter ($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('HomePage', {
          url: '/',
          templateUrl: '/HTML/home.html'
        })

        $urlRoutProvider.otherwise('/')
    }

}());
