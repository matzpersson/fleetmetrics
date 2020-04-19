import mongoose from 'mongoose';

// Setup schema
var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashKey: {
    type: String
  },
  dashboard: {
    type: Object,
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Export Contact model
var User = module.exports = mongoose.model('users', userSchema);

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}
