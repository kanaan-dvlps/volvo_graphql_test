const Customer = require('../Models/Customer.schema');

async function CreateCustomer (data) {
  const newCustomer = await new Customer(data);
  const customer = await newCustomer.save();
  return customer;
}

module.exports = {CreateCustomer};