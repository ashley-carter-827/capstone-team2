const mongoose = require('mongoose');

const hubSchema = new mongoose.Schema({
  upsRiskManager: String,
  upsHubName: String,
  address: {
    type: String, 
    required: true,
    minlength: 4
  },
  latitude: Number,
  longitude: Number
})

const Hub = new mongoose.model('Hub', hubSchema);

module.exports = Hub;