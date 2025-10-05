const express = require('express');
const Emergency = require('../models/Emergency');
const Temple = require('../models/Temple');
const { sendEmergencyNotification } = require('../utils/notifications');
const router = express.Router();

// Report emergency
router.post('/', async (req, res) => {
  try {
    const { templeId, type, location, description, severity, coordinates, userId } = req.body;

    const emergency = new Emergency({
      temple: templeId,
      user: userId,
      type,
      location,
      description,
      severity,
      coordinates,
      status: 'pending'
    });

    await emergency.save();
    await emergency.populate('temple user');

    // Send real-time notification
    const io = req.app.get('io');
    io.emit('emergency-alert', emergency);

    // Send notifications to emergency contacts
    await sendEmergencyNotification(emergency);

    res.status(201).json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get emergencies for a temple
router.get('/temple/:templeId', async (req, res) => {
  try {
    const emergencies = await Emergency.find({ temple: req.params.templeId })
      .populate('user respondedBy')
      .sort({ createdAt: -1 });
    
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update emergency status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, respondedBy } = req.body;
    
    const updateData = { status };
    if (status === 'resolved') {
      updateData.resolvedAt = new Date();
    }
    if (respondedBy) {
      updateData.respondedBy = respondedBy;
    }

    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user respondedBy');

    res.json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;