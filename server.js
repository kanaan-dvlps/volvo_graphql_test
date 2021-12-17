const express = require('express');
const bodyParser = require('body-parser');
const ODM = require('mongoose');
const app = express();
const process = require('process');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// ! ##### Middlewares #####
// ? -----------------------
// * dotenv middleware
require('dotenv').config();

// * BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ? GraphQL Modules
const gqlSchema = require('./grapghql/schema');
const getBooking = require('./grapghql/resolvers/getBooking');
const createBooking = require('./grapghql/resolvers/createBooking');
const bookingCapacity = require('./grapghql/resolvers/capacity');

// ? Graphql Middleware
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(gqlSchema),
  rootValue: {
    // * our resolvers
    getBooking: getBooking,
    createBooking: createBooking,
    bookingCapacity: bookingCapacity,
  }, 
  graphiql: true,
}));

// ! ##### Server #####
// ? -----------------------

const server = app.listen(process.env.PORT, () => {
  ODM.connect(process.env.MONGODB_URI);

  // ? Colorized terminal message
  console.log(`\n\x1b[1m\x1b[33m## SERVER STRATED ON PORT:\x1b[0m\x1b[1m \x1b[32m${process.env.PORT} ## \x1b[0m`);

  console.log(`\x1b[1m\x1b[33m## ADDRESS:\x1b[0m\x1b[1m \x1b[32m${process.env.BASE_URL} ## \x1b[0m \n`);

  // console.log(`\x1b[1m\x1b[33m## ENVIRONMENT:\x1b[0m\x1b[1m \x1b[32m${process.env.ENVIRONMENT} ## \x1b[0m \n`);

  ODM.connection.on('error', error => {
    console.log(`\x1b[41m\x1b[1mODM error\x1b[0m`, error);
  });

  console.log(`\x1b[34m\x1b[1mconnection to ODM...\x1b[0m`);
  ODM.connection.on('connected', () => {
    console.log(`\x1b[34m\x1b[1msuccessfully connected to ODM!\x1b[0m`);
  });
  console.log(`\x1b[34m\x1b[1mprocess PID ${process.pid} started\x1b[0m`);
});


function signalHandler(signal) {
  if (signal) {
    console.log(`received signal: ${signal}`);
    console.log(`closing HTTP server`);
    server.close(() => {
      console.log(`HTTP server closed gracefully`);
      ODM.connection.close(false, () => {
        console.log(`Database connection closed gracefully`);
        console.log(`process PID ${process.pid} stopped`);
        process.exit(0);
      });
    });
  }
};

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
