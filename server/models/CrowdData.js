const mongoose = require('mongoose');

const crowdDataSchema = new mongoose.Schema({
  temple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  crowdCount: {
    type: Number,
    required: true
  },
  queueLength: {
    type: Number,
    default: 0
  },
  averageWaitTime: {
    type: Number, // in minutes
    default: 0
  },
  weather: {
    temperature: Number,
    condition: String
  },
  isHoliday: Boolean,
  isFestival: Boolean,
  prediction: {
    expectedCrowd: Number,
    confidence: Number
  }
});

// Index for faster queries
crowdDataSchema.index({ temple: 1, timestamp: -1 });

module.exports = mongoose.model('CrowdData', crowdDataSchema);