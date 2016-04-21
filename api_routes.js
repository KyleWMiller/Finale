var
  apiRouter = require('express').Router(),
  ctrl      = require('./controllers/controllerBproduct.js'),
  contrl    = require('./controllers/controllerBuser.js'),
  jwt       = require('jsonwebtoken'),
  secret    = "this is so secret"

  apiRouter.route('/signIn')
  .post(contrl.userController.signIn)

  apiRouter.route('/users')
  // .get(contrl.userController.get)
  .post(contrl.userController.create)


  apiRouter.use(function(req, res, next){
    // 1 - let's check everywhere for the user's token
    var token = req.body.token || req.params.token || req.headers['x-access-token']

      console.log("someone is visiting our API, we should check to see if they are logged in")

      // 2 - If we find a token, we will use Secret to try and decode it
      // - if it can't be decoded, send the user an error that they don't have the right token
      if(token){
          jwt.verify(token, secret, function(err, decoded){
              if(err){
                  return res.status(403).send({success:false, message:"can't authenticate token"})
              //      - if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request
              } else {
                  req.decoded = decoded;
                  next()
              }
          })
      } else {

          // 3 - If we can't find a token at all, we'll just send back an error message
          return res.status(403).send({success: false, message: "no token provided"})
      }

      // ...and then we'll let the request continue on to our app:
      next()
  })


  apiRouter.route('/products')
    .get(ctrl.productController.getAll)
    // .get(ctrl.heroController.buildKey)
    // .post(ctrl.heroController.create)
    // .delete(ctrl.heroController.destroy)
module.exports  = apiRouter
