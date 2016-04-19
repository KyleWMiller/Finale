var db = require('../models/user-model.js')

module.exports = {
  userController: {
    create: function(req,res){
      console.log("making new user")
      db.User.insert({}, function(err,user){
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
    }
  }
}
