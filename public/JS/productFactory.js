(function() {
  'use strict';
  angular.module("userFactory", [])
    .factory('productListFactory', productListFactory)

  function productListFactory($http) {
    var productData = {},
      apiUrl = '/api/v1/products'

    productData.productList = function() {
      console.log('making new user')
      return $http.read(apiUrl)
    }
  }


}());
