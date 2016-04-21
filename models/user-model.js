var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    Schema   = mongoose.Schema,
    userSchema = new Schema ({
      name: String,
      email: String,
      password: String,
      admin: Boolean,
      image: String,
      purchaseHistory: String,
      orders : [{}]
    })

    userSchema.pre('save', function(next){
        var user = this
        if (!user.isModified('password')) return next()
        user.password =  bcrypt.hashSync(user.password, 8)

        next()
    })
    userSchema.methods.comparePw = function(pw){
        var user = this
        return bcrypt.compareSync(pw, user.password)
    }

    module.exports = {
      User: mongoose.model('User', userSchema)
    }
