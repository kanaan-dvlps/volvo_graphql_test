const Booking = require('../../Models/Booking.schema');
const { GetAllBookings } = require('../../database/Booking.data');

const getBooking = async () => {
  const Bookings = await GetAllBookings();
  console.log(Bookings);
  return Bookings;
};

module.exports = getBooking;