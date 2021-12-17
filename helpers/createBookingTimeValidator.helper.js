const { getCapacity } = require('../database/Capacity.data');
const { BookingCount, GetBookingByTime, GetBokingByDate } = require('../database/Booking.data');
const moment = require('moment');

const BookingValidation = async (parameter) => {
  const { date, time } = parameter.bookingInput;

  // --------------------------------------
  const conditions = {};

  // --------------------------------------
  const selectedTime = time;
  const _date_ = new Date();
  const day = _date_.getUTCDate();
  const month = _date_.getUTCMonth();
  const year = _date_.getUTCFullYear();
  const today = moment(`${year}-${month}-${day}`, 'YYYY/MM/DD');
  const bookingDate = moment(date, 'YYYY/MM/DD');
  const selectedBookingTime = moment(time, 'HH:mm:ss');
  const beginingOfWorkingHour = moment('09:00:00', 'HH:mm:ss');
  const endOfWorkingHour = moment('17:00:00', 'HH:mm:ss');
  const endOfBookingTime = moment(moment(selectedTime, 'HH:mm:ss')).add(2, 'hours').format(moment.HTML5_FMT.TIME_SECONDS);

  // --------------------------------------
  const capacity = await getCapacity();
  const retailCapacity = capacity[0].capacity;

  const booingCount = await BookingCount();
  const _time_ = await GetBookingByTime(time);
  const anHourBefore = await GetBookingByTime(moment(selectedBookingTime).subtract(1, 'hour').format(moment.HTML5_FMT.TIME_SECONDS));
  const anHourAfter = await GetBookingByTime(moment(selectedBookingTime).add(1, 'hour').format(moment.HTML5_FMT.TIME_SECONDS));

  // --------------------------------------
  if (moment(selectedBookingTime).isBefore(beginingOfWorkingHour) || moment(selectedBookingTime).isAfter(endOfWorkingHour)) {
    conditions.status = 'REJECTED';
    conditions.message = `Booking time must be between 09:00 to 17:00`;
  } else if (anHourBefore.length > 0 || anHourAfter.length > 0) {
    conditions.status = 'REJECTED';
    conditions.message = `A booking already exists at this time at ${moment(selectedBookingTime).subtract(1, 'hour').format(moment.HTML5_FMT.TIME)}, duration of each booking is two hours!`;
  } else if (moment(bookingDate).isBefore(today)) {
    conditions.status = 'REJECTED';
    conditions.message = `Booking should be in the current day or days after`;
  } else if (booingCount === retailCapacity) {
    conditions.status = 'REJECTED';
    conditions.message = `Booking capacity has reached to its maximum`;
  } else if (booingCount <= retailCapacity) {
    conditions.status = 'ACCEPTED';
    conditions.message = `Booking time has been set for ${selectedTime}`;
  }
  return conditions;
}

module.exports = BookingValidation;