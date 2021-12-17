const { updateCapacity, addCapacity } = require('../../database/Capacity.data');

const Capacity = async (capacityInput) => {
  const result = {}
  const { _id, capacity } = capacityInput.capacityInput; 
  const updatedCapacity = await updateCapacity({ _id, capacity });
  
  result._id = updatedCapacity._id,
  result.capacity = updatedCapacity.capacity
  
  return result;
}

module.exports = Capacity;