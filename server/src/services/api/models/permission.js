import mongoose from 'mongoose';

// Setup schema
var permissionSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  permissions: {
    type: Object,
    default: []
  }
});

// Export Contact model
var Permission = module.exports = mongoose.model('permissions', permissionSchema);

module.exports.get = function (callback, limit) {
  Permission.find(callback).limit(limit);
}
