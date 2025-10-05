import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { socket } from '../services/socket';
import { getCrowdStatus } from '../services/api';

const AppContext = createContext();

const initialState = {
  temples: [],
  currentTemple: null,
  crowdData: {},
  emergencies: [],
  user: null,
  loading: false,
  notifications: []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TEMPLES':
      return { ...state, temples: action.payload };
    case 'SET_CROWD_DATA':
      return { ...state, crowdData: { ...state.crowdData, ...action.payload } };
    case 'SET_EMERGENCIES':
      return { ...state, emergencies: action.payload };
    case 'ADD_EMERGENCY':
      return { ...state, emergencies: [action.payload, ...state.emergencies] };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Socket event listeners
    socket.on('crowd-update', (data) => {
      dispatch({
        type: 'SET_CROWD_DATA',
        payload: { [data.templeId]: data }
      });
    });

    socket.on('emergency-alert', (emergency) => {
      dispatch({ type: 'ADD_EMERGENCY', payload: emergency });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'emergency',
          message: `New emergency reported at ${emergency.temple.name}`,
          timestamp: new Date()
        }
      });
    });

    // Load initial data
    loadInitialData();

    return () => {
      socket.off('crowd-update');
      socket.off('emergency-alert');
    };
  }, []);

  const loadInitialData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const crowdStatus = await getCrowdStatus();
      dispatch({ type: 'SET_CROWD_DATA', payload: crowdStatus });
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value = {
    state,
    dispatch,
    joinTemple: (templeId) => socket.emit('join-temple', templeId),
    reportEmergency: (data) => socket.emit('emergency-alert', data)
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};