const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/labDB')
var db = mongoose.connection;
//db.collection('reservations').drop();
//db.collection('users').drop();

const User = require("./database/models/User")
const Reservation = require("./database/models/Reservation")

db.once('open', function() {
    User.create([
        { username: 'FreddyFazbear', email: 'freddyfazbear@dlsu.edu.ph', password: 'fazbear00', description: 'I am five bears.',
        birthdate: '01/01/1987', profilepicture: 'images/freddyfazbear.png',role: 'V' },
        { username: 'BonnieBunny', email: 'bonnythebonnybon@dlsu.edu.ph', password: 'bonny3', description: 'I like baking cupcakes.',
        birthdate: '02/21/1983', profilepicture: 'images/bonniebunny.png', role: 'V' },
        { username: 'FoxyThePirate', email: 'foxythepirate@dlsu.edu.ph', password: 'foxie12', description: 'I hunt for treasure!',
        birthdate: '06/04/1985', profilepicture: 'images/foxythepirate.jpeg', role: 'V' },
        { username: 'WilliamAfton', email: 'williamaftersun@dlsu.edu.ph', password: 'willom2', description: "I'm the bad guy.",
        birthdate: '07/29/1954', profilepicture: 'images/williamafton.jpg', role: 'T' },
        { username: 'SpringTrap', email: 'springtrap@dlsu.edu.ph', password: 'Summer!', description: "I trap you.",
        birthdate: '07/29/1954', profilepicture: 'images/springtrap.jpg', role: 'T' },
    ]);

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
});

process.exit(0);