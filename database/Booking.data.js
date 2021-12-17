const Booking = require('../Models/Booking.schema');

async function CreateBooking (booking) {
  const newBooking = await new Booking(booking);
  const savedBooking = await newBooking.save();
  return savedBooking;
};

async function GetAllBookings () {
  const bookings = await Booking.find();
  return bookings;
}

async function GetBookingById (id) {
  const booking = await Booking.findOne({ _id: id });
  return booking;
}

async function GetBookingByTime (time) {
  const booking = await Booking.find({ time: { $in: [time] } });
  return booking;
}

async function GetBokingByDate (date) {
  const booking = await Booking.find({ date: { $in: [date] } });
  return booking;
}

async function BookingCount () {
  const quantity = await Booking.find().lean().count();
  return quantity;
}
module.exports = {
  CreateBooking,
  GetAllBookings,
  GetBookingById,
  GetBookingByTime,
  GetBokingByDate,
  BookingCount,
}