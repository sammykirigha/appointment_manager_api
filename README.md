# APPOINTMENT MANAGER 

## How to run the app

In the project directory, you can run:

### `npm install`

This will start install required packages

### `npm start`

This will start the server in localhost in port 3333

## Testing

To test the endpoints url below collection in postman

 - ADD Doctor - POST - http://localhost:5500/api/doctors
 - GET Doctors - GET - http://localhost:5500/api/doctors
 - ADD Appointment - POST - http://localhost:5500/api/appointments/doctor-id-here
 - Get Appointment for date - GET - http://localhost:5500/api/appointments/doctor-id-here/date-here
 - Delete Appointment - DELETE - http://localhost:5500/api/appointments/doctor-id-here/doctor-id-here/appointment-id-here