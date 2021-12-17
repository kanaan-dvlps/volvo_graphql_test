const Vehicle = require('../Models/Vehicle.schema');

async function CreateVehicle (data) {
  const newVehicle = await new Vehicle(data);
  const vehicle = await newVehicle.save();
  return vehicle;
}

module.exports = {CreateVehicle};