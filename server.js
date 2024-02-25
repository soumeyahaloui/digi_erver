const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Define root route handler
app.get('/', (req, res) => {
  res.send('Welcome to DigiGame!');
});

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://soumeyahaloui:yaKAREEM357@digigame.spba9yb.mongodb.net/?retryWrites=true&w=majority&appName=digigame', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define room schema
const roomSchema = new mongoose.Schema({
  roomCode: String,
  // players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }] // Remove this line if Player model is not defined
});

const Room = mongoose.model('Room', roomSchema);

// Endpoint to create a new room
app.post('/create-room', async (req, res) => {
  try {
    const newRoom = new Room({ roomCode: generateRoomCode() }); // Creating a new room instance with a generated room code
    await newRoom.save(); // Saving the new room to the database
    res.status(201).json({ roomCode: newRoom.roomCode }); // Responding with the generated room code
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to generate a random room code between 1111 and 9999
function generateRoomCode() {
  // Generate a random number between 1111 and 9999
  return Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
}

// Handle GET requests to the /create-room endpoint
app.get('/create-room', (req, res) => {
  res.status(405).send('Method Not Allowed');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
