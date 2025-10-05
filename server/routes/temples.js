const express = require('express');
const Temple = require('../models/Temple');
const CrowdData = require('../models/CrowdData');
const router = express.Router();

// Get all temples
router.get('/', async (req, res) => {
  try {
    const temples = await Temple.find().select('-__v');
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific temple details
router.get('/:id', async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update temple crowd data
router.put('/:id/crowd', async (req, res) => {
  try {
    const { crowdCount, queueLength, averageWaitTime } = req.body;
    
    const temple = await Temple.findByIdAndUpdate(
      req.params.id,
      {
        currentCrowd: crowdCount,
        queueTime: averageWaitTime
      },
      { new: true }
    );

    // Save historical crowd data
    const crowdData = new CrowdData({
      temple: req.params.id,
      crowdCount,
      queueLength,
      averageWaitTime,
      timestamp: new Date()
    });
    await crowdData.save();

    // Emit real-time update
    const io = req.app.get('io');
    io.to(req.params.id).emit('crowd-update', {
      templeId: req.params.id,
      crowdCount,
      queueLength,
      averageWaitTime,
      timestamp: new Date()
    });

    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get temple crowd history
router.get('/:id/crowd-history', async (req, res) => {
  try {
    const { hours = 24 } = req.query;
    const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const history = await CrowdData.find({
      temple: req.params.id,
      timestamp: { $gte: startTime }
    }).sort({ timestamp: 1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;