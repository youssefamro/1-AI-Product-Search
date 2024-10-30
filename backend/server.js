const express = require('express');
const cors = require('cors');
const app = require('./app'); // Import the app from app.js

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Ensure this line is also present here

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Test route to ensure server is responding
app.get('/', (req, res) => {
    res.send('Server is running!'); // Simple endpoint to test server
});
