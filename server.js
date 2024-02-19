const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Endpoint to handle submitting numbers (you can modify this as needed)
app.post('/submit-number', (req, res) => {
    const { roomNumber, playerName, number } = req.body;

    // Here you can handle storing the submitted number in the database
    // You can also perform validation and any other necessary operations

    // For demonstration purposes, we'll just log the received data
    console.log(`Received number ${number} from ${playerName} in room ${roomNumber}`);

    res.send('Number submitted successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
