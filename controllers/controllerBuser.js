var userdb = require('../models/user-model.js')

module.exports{
  userController: {
    create: function(req,res){
      console.log("making new user")
      db.user.insert({}, function(err,user){
        if(err){
          res.json(user)
        }
      })
    }
  }
}
