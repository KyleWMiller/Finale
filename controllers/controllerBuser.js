//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Server side controller to create api routes for users
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
var db   = require('../models/user-model.js'),
    jwt  = require('jsonwebtoken'),
  secret = "this is so secret"

module.exports = {
  userController: {

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Used to save new user accts
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

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Sign users in if they have a previously created acct
    signIn: function(req,res){
      console.log('signing in')

      db.User.findOne({email: req.body.email}, function(err,user){
        if(err){res.json(err)}

        // check if a user exists
        if(user){

          // compare hashed password
          if(user.checkPassword(req.body.password)){

            // generates token to a logged in user
            // lasts for a day
            var token = jwt.sign({
                   name: user.name,
                   email: user.email,
                   admin: false
                 }, secret, {
                       expiresInMinutes: 1440
                   });

               // Send back a success message with the JWT
               res.json({
                   success: true,
                   message: 'You now have a token!',
                   token: token
               })
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
