var
  apiRouter = require('express').Router(),
  ctrl      = require('./controllers/controllerBproduct.js'),
  contrl    = require('./controllers/controllerBuser.js')

  apiRouter.route('/products')
    .get(ctrl.productController.getAll)
    // .get(ctrl.heroController.buildKey)
    // .post(ctrl.heroController.create)
    // .delete(ctrl.heroController.destroy)

  apiRouter.route('/users')
    .post(contrl.userController.create)

  apiRouter.route('/signIn')
    .post(contrl.userController.signIn)

module.exports  = apiRouter
