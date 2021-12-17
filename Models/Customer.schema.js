const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhoneNumber: { type: String, required: true },
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;