const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;