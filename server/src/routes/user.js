// Initialize express router
let router = require('express').Router();

// Import contact controller
var userController = require('../controllers/user');

// Contact routes
router.route('/users')
  .get(userController.index)
  .post(userController.new);

router.route('/users/:id')
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

// Export API routes
module.exports = router;
