const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Define a default route handler
app.get('/', (req, res) => {
    res.send('Hello, world!'); // Replace this with the desired response
});

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
