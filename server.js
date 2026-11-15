
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(error => console.error('MongoDB connection error:', error));

// Note structure
const Note = mongoose.model('Note', {
    content: {
        type: String,
        required: true
    }
});

// Save a note
app.post('/api/notes', async (req, res) => {
    try {
        const note = await Note.create({
            content: req.body.content
        });

        console.log('Note saved successfully:', note);

        res.status(201).json(note);
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({
            error: 'Could not save note',
            details: error.message
        });
    }
});

// Get saved notes
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.error('Error loading notes:', error);
        res.status(500).json({
            error: 'Could not load notes',
            details: error.message
        });
    }
});
app.get('/api/check', (req, res) => {
    res.json({ message: 'Latest server.js is running!' });
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

