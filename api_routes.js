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
    .get(contrl.userController.get)
    .post(contrl.userController.create)

module.exports  = apiRouter
