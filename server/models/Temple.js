const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: 'Gujarat'
  },
  capacity: {
    type: Number,
    required: true
  },
  currentCrowd: {
    type: Number,
    default: 0
  },
  queueTime: {
    type: Number, // in minutes
    default: 0
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  facilities: {
    parking: Boolean,
    medical: Boolean,
    restrooms: Boolean,
    wheelchair: Boolean
  },
  timings: {
    opening: String,
    closing: String,
    specialDays: [String]
  },
  liveCameras: [String],
  emergencyContacts: [{
    name: String,
    phone: String,
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Temple', templeSchema);