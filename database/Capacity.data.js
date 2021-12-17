const Capacity = require('../Models/Capacity.schema');

async function updateCapacity (data) {
  const { _id, capacity } = data;
  const updatedCapacity = await Capacity.findOneAndUpdate({ _id }, { capacity: capacity }, {
    new: true
  });
  return updatedCapacity;
}

async function getCapacity () {
  const capacity = await Capacity.find({}, { _id: 0, __v: 0 });
  return capacity;
}

async function addCapacity(c) {
  const newCapacity = await new Capacity({ capacity: c });
  const savedCapacity = await newCapacity.save();
  return savedCapacity;
}

module.exports = {
  updateCapacity,
  getCapacity,
  addCapacity,
}