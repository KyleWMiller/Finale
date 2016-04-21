//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Server side controller to create api routes for products
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

var db = require('../models/product-model.js')

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Return a list of all products in the db
module.exports = {
  productController: {
    getAll: function(req,res){
      console.log("grabbing products")
      db.Product.find({}, function(err,prods){
        if(err){
          res.json(err)
        } else {
          res.json(prods)
        }
      })
    },
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Returns a single item from the product db
    getOne: function(req,res){
      console.log("grabbing item")
      db.Product.findOne({name: params.name},{description:1,image:0})
    }
  }
}
