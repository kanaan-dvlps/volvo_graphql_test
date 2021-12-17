const mongoose = require('mongoose');

const CapacitySchema = new mongoose.Schema({
  capacity: { 
    type: Number, 
    default: 2,
    required: true
  }
});

const Capacity = mongoose.model('Capacity', CapacitySchema);
module.exports = Capacity;