var mongoose = require('mongoose'),
    bcrypt   = require('bcryptjs'),
    Schema   = mongoose.Schema,
    userSchema = new Schema ({
      name: String,
      email: String,
      password: String,
      admin: Boolean,
      image: String,
      purchaseHistory: String,
      orders : [{
        products: [{}],//reference a product schema
        total: Number
      }]
    })

    userSchema.pre('save', function(next){
      var user = this

      // If password if previously created skip next step
      if (!this.isModified('password')) return next();

      // overriding user password with encrypted hash
      user.password = bcrypt.hashSync(user.password, 8);

      next()
    })


    userSchema.methods.checkPassword = function(pw){
      // Load hash from your password DB.
      var user = this
      return bcrypt.compareSync(pw, user.password); 
    }


    module.exports = {
      User: mongoose.model('User', userSchema)
    }
