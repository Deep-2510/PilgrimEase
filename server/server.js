const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/temple_crowd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/crowd', require('./routes/crowd'));
app.use('/api/temples', require('./routes/temples'));
app.use('/api/users', require('./routes/users'));
app.use('/api/emergencies', require('./routes/emergencies'));

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-temple', (templeId) => {
    socket.join(templeId);
    console.log(`User ${socket.id} joined temple ${templeId}`);
  });

  socket.on('emergency-alert', (data) => {
    socket.to(data.templeId).emit('new-emergency', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});