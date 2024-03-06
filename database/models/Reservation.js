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

Reservation.create([
    { reserveId: 1001, username: 'FreddyFazbear', seat: 'Seat 1', laboratory: 'Freddy\'s Frightful Manor', dateTimeRequest: '1/1/2024 10:00 AM',
    dateTimeReservation: '1/1/2024 2:30 PM', isAnonymous: false},
    { reserveId: 1002, username: 'FreddyFazbear', seat: 'Seat 9', laboratory: 'Chica\'s Chilling Chamber', dateTimeRequest: '1/1/2024 10:01 AM',
    dateTimeReservation: '1/9/2024 2:30 PM', isAnonymous: false},
    { reserveId: 1003, username: 'FreddyFazbear', seat: 'Seat 8', laboratory: 'Puppet\'s Perilous Palace', dateTimeRequest: '1/1/2024 10:02 AM',
    dateTimeReservation: '1/8/2024 2:30 PM', isAnonymous: false},
    { reserveId: 1004, username: 'FreddyFazbear', seat: 'Seat 7', laboratory: 'Puppet\'s Perilous Palace', dateTimeRequest: '1/1/2024 10:03 AM',
    dateTimeReservation: '1/7/2024 2:30 PM', isAnonymous: false},
    { reserveId: 1005, username: 'BonnieBunny', seat: 'Seat 2', laboratory: 'Freddy\'s Frightful Manor', dateTimeRequest: '1/1/2024 10:00 AM',
    dateTimeReservation: '1/1/2024 2:30 PM', isAnonymous: false},
    { reserveId: 1006, username: 'FoxyThePirate', seat: 'Seat 3', laboratory: 'Freddy\'s Frightful Manor', dateTimeRequest: '1/1/2024 10:00 AM',
    dateTimeReservation: '1/1/2024 2:30 PM', isAnonymous: true}
])

module.exports = Reservation