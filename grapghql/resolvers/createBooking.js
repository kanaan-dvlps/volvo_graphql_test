const { CreateBooking } = require('../../database/Booking.data');
const { CreateCustomer } = require('../../database/Customer.data');
const { CreateVehicle } = require('../../database/Vehicle.data');
const { v4 } = require('uuid');
const BookingValidation = require('../../helpers/createBookingTimeValidator.helper');
const moment = require('moment');

const createBooking = async (parameter) => {
  console.log(parameter.bookingInput);
  const { date, time, customerName, customerEmail, customerPhoneNumber, vehicleMake, vehicleModel, vehicleVIN } = parameter.bookingInput;

  // --------------------------------------
  // * Constants
  const Booking = {};
  const Customer = {};
  const Vehicle = {};
  const result = {};

  // --------------------------------------
  const validation = await BookingValidation(parameter);
  
  // --------------------------------------
  if (validation.status === 'REJECTED') {
    
    result.message = {
      _id: v4(),
      date: date,
      time: time,
      isAccepted: false,
      message: validation.message
    };

  } else if (validation.status === 'ACCEPTED') {
    
    Booking.date = date;
    Booking.time = time;
    const newBooking = await CreateBooking(Booking);

    // * Create Customer Object
    Customer.customerName = customerName;
    Customer.customerEmail = customerEmail;
    Customer.customerPhoneNumber = customerPhoneNumber;
    const newCustomer = await CreateCustomer(Customer);

    // * Create Vehicle Object
    Vehicle.vehicleMake = vehicleMake;
    Vehicle.vehicleModel = vehicleModel;
    Vehicle.vehicleVIN = vehicleVIN;
    const newVehicle = await CreateVehicle(Vehicle);

    result.message = {
      _id: newBooking._id,
      date: date,
      time: time,
      isAccepted: true,
      message: validation.message
    };

  }
  return result.message;
}

module.exports = createBooking;