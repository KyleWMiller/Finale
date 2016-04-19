var
  apiRouter = require('express').Router(),
  ctrl      = require('./controllers/controllerBproduct.js')

  apiRouter.route('/products')
    .get(ctrl.productController.getAll)
    // .get(ctrl.heroController.buildKey)
    // .post(ctrl.heroController.create)
    // .delete(ctrl.heroController.destroy)


module.exports  = apiRouter
