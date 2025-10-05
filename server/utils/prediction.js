const CrowdData = require('../models/CrowdData');
const moment = require('moment');

// Simple ML-based crowd prediction
async function predictCrowd(templeId, date) {
  try {
    const targetDate = moment(date);
    const dayOfWeek = targetDate.day();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = await checkHoliday(targetDate);
    
    // Get historical data for similar conditions
    const similarDaysData = await CrowdData.find({
      temple: templeId,
      timestamp: {
        $gte: moment().subtract(3, 'months').toDate()
      }
    });

    // Simple prediction algorithm
    let baseCrowd = 0;
    let count = 0;

    similarDaysData.forEach(record => {
      const recordDate = moment(record.timestamp);
      if (recordDate.day() === dayOfWeek && 
          Math.abs(recordDate.date() - targetDate.date()) <= 7) {
        baseCrowd += record.crowdCount;
        count++;
      }
    });

    const avgCrowd = count > 0 ? baseCrowd / count : 1000;
    
    // Apply modifiers
    let predictedCrowd = avgCrowd;
    if (isWeekend) predictedCrowd *= 1.3;
    if (isHoliday) predictedCrowd *= 1.5;
    if (targetDate.month() === 9) predictedCrowd *= 1.2; // Festival season

    return {
      date: targetDate.format('YYYY-MM-DD'),
      predictedCrowd: Math.round(predictedCrowd),
      confidence: count > 10 ? 0.8 : 0.5,
      factors: {
        isWeekend,
        isHoliday,
        season: targetDate.month()
      }
    };
  } catch (error) {
    console.error('Prediction error:', error);
    return null;
  }
}

async function checkHoliday(date) {
  // Implement holiday checking logic
  // This could integrate with a holiday API or use a predefined list
  const holidays = ['01-26', '08-15', '10-02']; // Republic Day, Independence Day, Gandhi Jayanti
  return holidays.includes(date.format('MM-DD'));
}

module.exports = { predictCrowd };