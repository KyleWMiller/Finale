//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Schema for Products
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    productSchema = new Schema ({
      name: String,
      description: String,
      quantity: String,
      price: Number,
      pricePerlbs: Number,
      image: String,
      group: String
    })

    module.exports = {
      Product: mongoose.model('Products', productSchema)
    }
