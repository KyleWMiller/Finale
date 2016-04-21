var
      db = require('../models/user-model.js'),
     jwt = require('jsonwebtoken'),
  secret = "this is so secret"

module.exports = {
  userController: {
    create: function(req,res){
      console.log("making new user")

      var user = new db.User(req.body)

      user.save(function(err,user){
        if(err){
          res.json(err)
        } else {
          res.json(user)
        }
      })
    },
    get: function(req,res){
      console.log('getting user')
      db.User.find({}, function(err,user){
        console.log(user)
        if(err){
          res.json(err)
        } else {
          res.json(user)
        }
      })
    },
    signIn: function(req,res){
      console.log("Signing In")

      db.User.findOne({email: req.body.email},function(err,user){
        if(err){res.json(err)}
        //Check if a user exists
        if(user){
          //compare hash password
          console.log(user);
          if(user.comparePw(req.body.password)){
            var token = jwt.sign({
                   name: user.name,
                   email: user.email
                 }, secret, {
                       expiresInMinutes: 1440
                   })
               // 4 - Send back a success message with the JWT
               res.json({
                   success: true,
                   message: 'YOU get a token! YOU get a token! YOU get a token!',
                   token: token
               })
          }else{
            res.json({message: "password does not match"})
          }
        }else{
          res.json({message: "user does not exist"})
        }
      })
    }
  }
}
