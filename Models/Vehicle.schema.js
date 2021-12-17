const mongoose = require('mongoose');
const VehicleSchema = new mongoose.Schema({
  vehicleMake: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleVIN: { type: String, required: true },
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;