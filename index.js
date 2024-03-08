const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/labDB')

const express = require('express')
const app = new express()
const session = require('express-session');

const fileUpload = require('express-fileupload')

const User = require("./database/models/User")
const Reservation = require("./database/models/Reservation")

const path = require('path')

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use(express.static('public'))
app.use(fileUpload())

app.use(session({
    secret: 'sheaacrettt',
    resave: false,
    saveUninitialized: true
  }));

var hbs = require('hbs')
app.set('view engine','hbs');

var db = mongoose.connection;

db.once('open', function() {
    User.create([
        { username: 'FreddyFazbear', email: 'freddyfazbear@dlsu.edu.ph', password: 'fazbear00', description: 'I am five bears.',
        birthdate: '01/01/1987', profilepicture: 'images/freddyfazbear.png',role: 'V' },
        { username: 'BonnieBunny', email: 'bonnythebonnybon@dlsu.edu.ph', password: 'bonny3', description: 'I like baking cupcakes.',
        birthdate: '02/21/1983', profilepicture: 'images/bonniebunny.png', role: 'V' },
        { username: 'FoxyThePirate', email: 'foxythepirate@dlsu.edu.ph', password: 'foxie12', description: 'I hunt for treasure!',
        birthdate: '06/04/1985', profilepicture: 'images/foxythepirate.png', role: 'V' },
        { username: 'WilliamAfton', email: 'williamaftersun@dlsu.edu.ph', password: 'willom2', description: "I'm the bad guy.",
        birthdate: '07/29/1954', profilepicture: 'images/williamafton.png', role: 'T' },
        { username: 'SpringTrap', email: 'springtrap@dlsu.edu.ph', password: 'Summer!', description: "I trap you.",
        birthdate: '07/29/1954', profilepicture: 'images/freddyfazbear.png', role: 'T' },
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


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//User Login
app.get('/userlogin', function (req, res) {
    res.sendFile(path.join(__dirname, 'userlogin.html'));
});

app.post('/login', async function (req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).send("Invalid email or password.");
        }
        
        // At this point, login is successful
        // You can generate a session token or set a cookie to maintain the user's session
        // For simplicity, let's just send a success message
        req.session.currentUser = user;
        console.log(user);
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});



//User Registration
app.get('/userregister', function (req, res) {
    res.sendFile(path.join(__dirname, 'userregister.html'));
});

app.post('/register', function (req, res) {
    const { image } = req.files; // Access the uploaded image file
    const { email, username, password, description, birthdate } = req.body;
    console.log(req.body);
    image.mv(path.resolve(__dirname, 'public/images', image.name), (error) => {
        if (error) {
            console.log("Error!")
        } else {
            User.create({
                ...req.body,
                profilepicture: '/images/' + image.name
            });
            res.send('<script>alert("Registration successful!"); window.location.href="/";</script>');
        }
    })
});
//

app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

//User Profile Options

app .get('/userdelete', function (req, res){
    // Retrieve current user from session
    const currentUser = req.session.currentUser;
    console.log(currentUser._id)
    //console.log(currentUser);
    // Render user delete template (userdelete.hbs) with current user's information
    res.render('userdelete', { currentUser});
});   

app.post('/delete', async function (req, res) {
    const idTobeDeleted = req.body.theone;

    try {
        await User.deleteOne({ _id: idTobeDeleted });
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});


//
app.get('/details', function (req, res) {
    res.sendFile(path.join(__dirname, 'details.html'));
});

app.get('/searchusers', function (req, res) {
    res.sendFile(path.join(__dirname, 'searchusers.html'));
});

app.get('/searchslots', function (req, res) {
    res.sendFile(path.join(__dirname, 'searchslots.html'));
});

app.get('/viewprofile', async function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        const reservationsData = await Reservation.find({ username: currentUser.username });

        res.render('userviewprofile',{currentUser, reservationsData});

        //console.log(user);
        console.log(reservationsData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
    //res.sendFile(path.join(__dirname, 'userviewprofile.html'));
});

app.get('/editprofile', function (req, res) {
    res.sendFile(path.join(__dirname, 'usereditprofile.html'));
});


//User Logout

app.get('/userlogout', function (req, res) {
    const currentUser = req.session.currentUser;
    res.sendFile(__dirname + '\\' + 'userlogout.html');
});
var server = app.listen(3000, function () {
    console.log('Node server is running...');
});
