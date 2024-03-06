const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    username: String,
    seat: String,
    laboratory: String,
    dateTimeRequest: Date,
    dateTimeReservation: Date
})

const Reservation = mongoose.model('Reservation', ReservationSchema)

module.exports = Reservation