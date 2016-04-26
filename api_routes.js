var
  apiRouter = require('express').Router(),
  ctrl      = require('./controllers/controllerBproduct.js'),
  contrl    = require('./controllers/controllerBuser.js'),
  jwt       = require('jsonwebtoken'),
  secret    = "this is so secret"


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// route to create user //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
  apiRouter.route('/users')
    .post(contrl.userController.create)

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// route to generate token for pre-existing users //
//      - This will block users from viewing the
//        product page unless logged in
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

  apiRouter.route('/signIn')
    .post(contrl.userController.signIn)


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// Middleware checking browser for token, login auth //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
  apiRouter.use(function(req, res, next){
    // checks for the user's token in the browser, URI, and HTTP header
     var token = req.body.token || req.param('token') || req.headers['x-access-token']
     console.log(token)

     if(token){
       jwt.verify(token, secret, function(err, decoded){
         if(err){
             return res.status(403).send({success:false, message:"can't authenticate token"})
         } else {
           req.decoded = decoded
           next()
         }
       })
     }else {
       res.json({message: "no token provided", success: false})
     }
    // continue to routes: '/products'
  })


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// route to get product list //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
  apiRouter.route('/products')
  .get(ctrl.productController.getAll)
  // .post(ctrl.productController.create)

  apiRouter.route('/me')
  .get(function(req,res){
    res.json(req.decoded)
  })

module.exports  = apiRouter
