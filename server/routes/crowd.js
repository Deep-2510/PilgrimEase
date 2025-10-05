const express = require('express');
const CrowdData = require('../models/CrowdData');
const Temple = require('../models/Temple');
const { predictCrowd } = require('../utils/prediction');
const router = express.Router();

// Get current crowd status for all temples
router.get('/status', async (req, res) => {
  try {
    const temples = await Temple.find().select('name location currentCrowd capacity queueTime');
    
    const status = temples.map(temple => ({
      id: temple._id,
      name: temple.name,
      location: temple.location,
      currentCrowd: temple.currentCrowd,
      capacity: temple.capacity,
      queueTime: temple.queueTime,
      crowdLevel: getCrowdLevel(temple.currentCrowd, temple.capacity)
    }));

    res.json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get crowd predictions
router.get('/predictions', async (req, res) => {
  try {
    const { templeId, date } = req.query;
    const predictions = await predictCrowd(templeId, date);
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Analytics endpoint
router.get('/analytics', async (req, res) => {
  try {
    const { templeId, days = 7 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const analytics = await CrowdData.aggregate([
      {
        $match: {
          temple: mongoose.Types.ObjectId(templeId),
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }
          },
          avgCrowd: { $avg: "$crowdCount" },
          maxCrowd: { $max: "$crowdCount" },
          avgWaitTime: { $avg: "$averageWaitTime" }
        }
      },
      { $sort: { "_id.date": 1 } }
    ]);

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function getCrowdLevel(current, capacity) {
  const percentage = (current / capacity) * 100;
  if (percentage < 40) return 'low';
  if (percentage < 70) return 'medium';
  if (percentage < 90) return 'high';
  return 'critical';
}

module.exports = router;