// Initialize express router
let router = require('express').Router();

// Import controller
var permissionController = require('../controllers/permission');

// routes
router.route('/permissions')
  .get(permissionController.index)

// Export API routes
module.exports = router;
