const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://soumeyahaloui:yaKAREEM357@digigame.spba9yb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define room schema
const roomSchema = new mongoose.Schema({
  roomCode: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});

const Room = mongoose.model('Room', roomSchema);

// Middleware
app.use(bodyParser.json());

// Endpoint to create a new room
app.post('/create-room', async (req, res) => {
  try {
    const newRoom = new Room({ roomCode: generateRoomCode() });
    await newRoom.save();
    res.status(201).json({ roomCode: newRoom.roomCode });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to generate a random room code
function generateRoomCode() {
  // Generate a random 6-character alphanumeric code
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
