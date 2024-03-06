const mongoose = require('mongoose');

// Schema
const weatherSchema = new mongoose.Schema({
  cityName: {type: String},
  cloud_pct: {
    type: Number
  },
  feels_like: {
    type: Number
  },
  finalSpeed: {
    type: Number
  },
  humidity: {
    type: Number
  },
  max_temp: {
   type: Number
  },
  min_temp: {
    type: Number
  },
  sunrise: {
    type: Number
  },
  sunset: {
    type: Number
  },
  temp: {
    type: Number
  },
  wind_degrees: {
    type: Number
  },
  wind_speed: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
 },
 ist: {
type: String
 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

  });

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather