const axios = require('axios');
const { MongoClient } = require('mongodb');

describe('Booking Creation', () => {
  test('createBooking()', async () => {
    const response = await axios.post('http://localhost:9000/graphql', {
      query: `
        mutation {
          createBooking(bookingInput: {
            date: "2021-12-21",
            time: "15:50:00", 
            customerName: "kanaan", 
            customerEmail: "k", 
            customerPhoneNumber: "00", 
            vehicleMake: "00", 
            vehicleModel: "0x", 
            vehicleVIN: "yes"
          }) {
            _id,
            date,
            time,
            isAccepted,
            message
          }
        }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject(data);

  });

});

describe('Get Bookings', () => {
  test('GetAllBookings()', async () => {
    const response = await axios.post('http://localhost:9000/graphql', {
      query: `
        query {
          getBooking {
            _id,
            date,
            time
          }
        }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      "data": {
        "getBooking": [
          {
            "_id": "61b8ee4c5a99022a5d770655",
            "date": "1640044800000",
            "time": "10:50:00"
          },
          {
            "_id": "61b902b774a537d8ace318ee",
            "date": "1640044800000",
            "time": "12:50:00"
          }
        ]
      }
    });

  });
});

describe('Test Database Insertion', () => {
  let connection;
  let db;
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    // await db.close();
  });

  test('insert()', async () => {
    const mockObject = {
      _id: "61bbacebd5874c04175c0321",
      date: "1640044800000",
      time: "15:50:00",
    };


    const booking = db.collection('bookings');

    const mockBookings = mockObject;
    await booking.insert(mockBookings);

    const insertedBooking = await booking.findOne({ time: '15:50:00' });
    expect(insertedBooking).toEqual({
      "_id": "61bbacebd5874c04175c0321",
      "date": "1640044800000",
      "time": "15:50:00"
    });
  });
})