export const TEMPLES = [
  {
    id: '1',
    name: 'Somnath Temple',
    location: 'Prabhas Patan',
    city: 'Veraval',
    capacity: 5000,
    currentCrowd: 3200,
    queueTime: 45,
    coordinates: { latitude: 20.8880, longitude: 70.4015 },
    facilities: {
      parking: true,
      medical: true,
      restrooms: true,
      wheelchair: true
    },
    timings: {
      opening: '06:00',
      closing: '21:00',
      specialDays: ['Monday', 'Full Moon']
    }
  },
  {
    id: '2',
    name: 'Dwarkadhish Temple',
    location: 'Dwarka',
    city: 'Dwarka',
    capacity: 4000,
    currentCrowd: 2800,
    queueTime: 60,
    coordinates: { latitude: 22.2403, longitude: 68.9686 },
    facilities: {
      parking: true,
      medical: true,
      restrooms: true,
      wheelchair: false
    }
  },
  {
    id: '3',
    name: 'Ambaji Temple',
    location: 'Ambaji',
    city: 'Banaskantha',
    capacity: 3500,
    currentCrowd: 1500,
    queueTime: 25,
    coordinates: { latitude: 24.3370, longitude: 72.8500 },
    facilities: {
      parking: true,
      medical: true,
      restrooms: true,
      wheelchair: true
    }
  },
  {
    id: '4',
    name: 'Pavagadh Temple',
    location: 'Pavagadh Hill',
    city: 'Champaner',
    capacity: 3000,
    currentCrowd: 2200,
    queueTime: 35,
    coordinates: { latitude: 22.4667, longitude: 73.5333 },
    facilities: {
      parking: true,
      medical: true,
      restrooms: true,
      wheelchair: false
    }
  }
];

export const EMERGENCY_TYPES = {
  medical: 'Medical Emergency',
  security: 'Security Issue',
  fire: 'Fire Hazard',
  stampede: 'Stampede Risk',
  lost_person: 'Lost Person',
  other: 'Other Emergency'
};

export const CROWD_LEVELS = {
  low: { label: 'Low', color: '#10B981', max: 40 },
  medium: { label: 'Medium', color: '#F59E0B', max: 70 },
  high: { label: 'High', color: '#EF4444', max: 90 },
  critical: { label: 'Critical', color: '#7C3AED', max: 100 }
};