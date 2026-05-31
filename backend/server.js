require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./src/config/db');
const Message = require('./src/models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ['GET', 'POST']
  }
});

app.use(cors({ 
  origin: ["http://localhost:5173", "http://localhost:5174"]
}));

// Connect DB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/auth');
const messageRoutes = require('./src/routes/messages');
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🚀 Chat API is running!' });
});

// Socket.io
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  // Join room
  socket.on('join_room', ({ room, username }) => {
    socket.join(room);
    socket.to(room).emit('user_joined', { username, room });
    console.log(`👤 ${username} joined room: ${room}`);
  });

  // Send message
  socket.on('send_message', async ({ room, content, sender, token }) => {
    try {
      const message = await Message.create({
        sender: sender._id,
        content,
        room
      });

      const populatedMessage = await message.populate('sender', 'username avatar');

      io.to(room).emit('receive_message', populatedMessage);
    } catch (error) {
      console.error('Message error:', error);
    }
  });

  // Typing indicator
  socket.on('typing', ({ room, username }) => {
    socket.to(room).emit('user_typing', { username });
  });

  socket.on('stop_typing', ({ room }) => {
    socket.to(room).emit('user_stop_typing');
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`🔌 User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});