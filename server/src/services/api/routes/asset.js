// Initialize express router
let router = require('express').Router();

// Import contact controller
var assetController = require('../controllers/asset');

// Contact routes
router.route('/assets')
  .get(assetController.index)
  .post(assetController.new);

router.route('/assets/:id')
  .get(assetController.view)
  .patch(assetController.update)
  .put(assetController.update)
  .delete(assetController.delete);

// Export API routes
module.exports = router;
