var db = require('../models/product-model.js')


module.exports = {
  productController: {
    getAll: function(req,res){
      console.log("grabbing products")
      db.products.find({}, function(err,prods){
        if(err){
          res.json(err)
        } else {
          res.json(prods)
        }
      })
    },
    getOne: function(req,res){
      console.log("grabbing item")
      db.products.findOne({name: params.name},{description:1,image:0})
    }
  }
}
