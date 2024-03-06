const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    username: String,
    seat: String,
    laboratory: String,
    dateTimeRequest: String,
    dateTimeReservation: String
})

const Reservation = mongoose.model('Reservation', ReservationSchema)

module.exports = Reservation