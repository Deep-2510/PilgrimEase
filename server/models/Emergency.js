const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  temple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['medical', 'security', 'fire', 'stampede', 'lost_person', 'other'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  description: String,
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'acknowledged', 'resolved'],
    default: 'pending'
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  responseTime: Number, // in minutes
  createdAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date
});

module.exports = mongoose.model('Emergency', emergencySchema);