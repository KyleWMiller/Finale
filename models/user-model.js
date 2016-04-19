var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    userSchema = new Schema ({
      _id: String,
      name: String,
      email: String,
      admin: Boolean,
      image: String,
      purchaseHistory: String,
      orders : [{
        products: [{}],//reference a product schema
        total: Number
      }]
    })

    module.exports = {
      User: mongoose.model('User', userSchema)
    }
