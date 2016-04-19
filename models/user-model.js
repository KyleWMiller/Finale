var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    userSchema = new Schema ({
      name: String,
      email: String,
      admin: Boolean,
      image: String,
      purchaseHistory: String
    })
