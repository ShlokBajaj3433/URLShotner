const mongoose = require('mongoose');

async function connectToDatabase(URL) {
    try {
        await mongoose.connect(URL);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
}

module.exports = connectToDatabase;

