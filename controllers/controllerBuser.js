var db = require('../models/user-model.js')

module.exports = {
  userController: {
    create: function(req,res){
      console.log("making new user")

      var user = new db.User(req.body)

      user.save({}, function(err,user){
        if(err){
          res.json(err)
        } else {
          res.json(user)
        }
      })
    },
    signIn: function(req,res){
      console.log('signing in')

      db.User.findOne({email: req.body.email}, function(err,user){
        if(err){res.json(err)}
        // check if a user exists
        if(user){
          // compare hashed password
          if(user.checkPassword(req.body.password)){
            res.json({message: 'login success'})
          } else {
            res.json({message: 'password does not match'})
          }
        } else {
          res.json({message: 'user does not exist'})
        }
      })
    }
  }
}
