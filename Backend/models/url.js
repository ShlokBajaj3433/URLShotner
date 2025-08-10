const mongoose = require('mongoose');

// Define the schema for shortened URLs
const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  redirectUrl: {
    type: String,
    required: true
  },
  visitHistory: [
    {
      ip: String,
      userAgent: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;