import mongoose from 'mongoose';

var modelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Setup schema
var assetSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  models: [modelSchema],
  sentenceType: {
    type: String,
    required: true,
    default: 'nmea0183'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Export Contact model
var Asset = module.exports = mongoose.model('assets', assetSchema);

module.exports.get = function (callback, limit) {
  Asset.find(callback).limit(limit);
}
