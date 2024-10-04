const mongoose = require('mongoose');
require('dotenv').config();
// Define MongoDB connection URL
//const mongoURL = 'mongodb://localhost:27017/hotels';

//const mongoURL = 'mongodb://127.0.0.1:27017/hotels';  // Use IPv4 loopback
//mongoDB atlas

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
