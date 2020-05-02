// Initialize express router
let router = require('express').Router();
const auth = require("../auth");

// Import controller
var userController = require('../controllers/user');

// routes
router.route('/users')
  .get(userController.index)
  .post(userController.new);

router.route('/users/:id')
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

router.put("/current", auth, userController.update)
router.get("/current", auth, userController.view)

router.route('/login')
  .post(userController.login)

// Export API routes
module.exports = router;
