let router = require('express').Router();

// Controller
var messageController = require('../controllers/message');

// Routes
router.route('/messages')
  .get(messageController.index)
  .post(messageController.new);

// Export API routes
module.exports = router;