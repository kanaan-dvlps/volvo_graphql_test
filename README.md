# API Documentation
## **Running The Server**
✅ The server is containerized and uses `Dockerfile` and `docker-compose.yml` to build and run itself.
for running the server for the first time you can run `docker-compose up -d --build` to build your image and then for other times you can use `docker-compose up -d` to just bring up the containers.

### About Dockerfile:
  Our _Dockerfile_ consists of two steps:
    - Step one: it will build our image based on the complete `Node.js` image from _docker hub_ and then install all the dependencies (except devDependencies). after that it'll delete our `.npmrc` file in order to prevent any security issues.
    - Step two: it will create our container based on alpine image and since we have already built our image based on the full image we can have the dependencies that aren't included in alpine image. this will cause a more secure container since we don;t install any dependencies that we don't need. Then we will add `dumb-init` as a process supervisor (init system) in order to prevent our Node.js application to run with PID 1 and act strangly. Then we'll use the default user that docker creates called _Node_ in order to prevent any root privileges if any intruders tried to get into the container, hence we need to run any process that needs root privileges with `chown` at the beginning of the command. Then we'll run the server.

### Folder structure and files
- ### Root folder
  This part will contain all of our folders, `server.js` file which is our _entry point_, our test files, .env file, Dockerfile and docker-compose file and all the rest.

- ### Models folder
  This folder consists of our models. The naming convention is desinged in a way to differentiate other files from our models.
    - **Booking.schema.js**: Booking collection.
    - **Capacity.schema.js**: Capacity collection.
    - **Customer.schema.js**: Customer collection.
    - **Vehicle.schema.js**: Vehicle collection.

- ### Database folder
  This folder consists of our database related actions and function, like _CRUD_ operations and anything that is related to our collections. The naming convention is designed in a way to differentiate the _models_ and _database function_ from each other.
    - **Booking.data.js**: Is responsible for handling our _booking_ CRUD operation .
    - **Capacity.data.js**: Is responsible for handling our _capacity_ CRUD operation .
    - **Customer.data.js**: Is responsible for handling our _customer_ CRUD operation .
    - **Vehicle.data.js**: Is responsible for handling our _vehicle_ CRUD operation .

- ### GraphQL folder
  - #### Schema
    This file is providing the _schema_ that we need for _GraphQL_.
  - #### Resolvers
    This file is providing the _resolvers_ that we need for _GraphQL_.
      - **capacity.js**: This file is responsible to edit our capacity amount.
      - **createBooking.js**: this file is responsible to receive the data entered from our mutation function and send it to `createBookingTimeValidation.js` in helpers folder and receive the validation result and then send the result which can the booking take place or not. For the sake of the test I didn't create any automated job to check a booking and delete it, so it will recive as many bookings as we have capacity in our _Capacity Model_ and then will return a rejection error equivalent to the rejected action that can be caused by a booking being outside of workng hour, or reaching the capacity of the retail store.
      - **getBooking.js**: This file gets all the available bookings in our _database_.

- ### Helpers folder
  This folder consists of our helpers
    - **createBookingTimeValidation.js**: This file is responsible to receive the date and time from our `createBookig.js` _resolver_ and validate everything and send an object in response that the booking is accepted or rejected.

    ```Booking_Rejection
    {
      status: "REJECTED",
      message: "Equivalent rejection message to the action and situation"
    }
    ```
    ```Booking_Acceptance
    {
      status: "REJECTED",
      message: "Booking time has been set for ${selectedTime}"
    }
    ```
### TDD
  I've used _Jest_ for my unit testins and tried to test three functionalities to just show my mindset for TDD and unit testing for the sake of the test. in real world every functionality should be tested.
    - Booking Creation
    - Get Booking
    - Database insertion

### Tecnologies and tools

  - Node.js
  - GraphQL
  - GraphQL-express
  - Jest
  - MongoDB