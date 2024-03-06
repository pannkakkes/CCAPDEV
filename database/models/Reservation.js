const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    reserveId: Number,
    username: String,
    seat: String,
    laboratory: String,
    dateTimeRequest: String,
    dateTimeReservation: String,
    isAnonymous: Boolean
})

const Reservation = mongoose.model('Reservation', ReservationSchema)

module.exports = Reservation