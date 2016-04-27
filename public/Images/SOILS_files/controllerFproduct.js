(function() {
  'use strict';
  angular.module('productControllers', [])
  .controller('productCtrl',productCtrl)



  // ========================================================= //
  // Product Controller
  // ========================================================= //

      productCtrl.$inject = ["productListFactory"]
      
      function productCtrl (productListFactory){
        var pCtrl = this

        console.log('getting products')
        productListFactory.productList()
          .then(function(response){
            pCtrl.productList = response.data
            console.log(response.data)

          })


      }

}());
