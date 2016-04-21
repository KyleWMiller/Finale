//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Schema for Products
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    productSchema = new Schema ({
      name: String,
      description: String,
      price: Number,
      image: String
    })

    module.exports = {
      Product: mongoose.model('Products', productSchema)
    }
