const gqlSchema = `
  type Booking {
    _id: ID!
    date: String!
    time: String!
  }

  type Customer {
    _id: ID!
    customerName: String!
    customerEmail: String!
    customerPhoneNumber: String!
  }

  type Vehicle {
    _id: ID!
    vehicleMake: String!
    vehicleModel: String!
    vehicleVIN: String!
  }

  type BookingResult {
    _id: ID!
    date: String!
    time: String!
    isAccepted: Boolean!
    message: String
  }

  type capacityResult {
    _id: ID!
    capacity: Int!
  }

  input CapacityInput {
    _id: ID!
    capacity: Int!
  }

  input BookingInput {
    date: String!
    time: String!
    customerName: String!
    customerEmail: String!
    customerPhoneNumber: String!
    vehicleMake: String!
    vehicleModel: String!
    vehicleVIN: String!
  }

  type RootQuery {
    getBooking: [Booking!]!
  }

  type RootMutation {
    createBooking(bookingInput: BookingInput!): BookingResult!
    bookingCapacity(capacityInput: CapacityInput!): capacityResult!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
  `;

module.exports = gqlSchema;