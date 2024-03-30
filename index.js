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

const apps = require("./routes/appRoutes");

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

var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
const { brotliDecompress } = require('zlib');
app.set('view engine','hbs');

hbs.registerHelper('compareStrings', function(string1, string2, options) {
    return string1 === string2;
});

hbs.registerHelper('and', function () {
    return Array.prototype.slice.call(arguments, 0, -1).every(Boolean);
});

hbs.registerHelper('break', function() {
    this.breakLoop = true;
});

hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});


var db = mongoose.connection;

//Check for keep me logged in

const sessionChecker = (req, res, next) => {
    if (req.session.currentUser) {
        res.redirect('app/main'); // Redirect to dashboard if currentUser is set in the session
    } else {
        next(); // Continue to the next middleware if session is not active
    }
};

//Routes if not keep me logged in
// Route for the home page
app.get('/', sessionChecker, (req, res) => {
    res.redirect("app");
});

// User Login
app.get('/userlogin', sessionChecker, (req, res) => {
    res.render('userlogin', { layout: "layouts/main" });
});

/////////////////////////
app.get('/', function (req, res) {
    res.redirect("app");
});

//

app.get('/searchusers', function (req, res) {
    res.render("searchusers", {layout: "layouts/main"});
});

app.get('/users', async (req, res) => {
    var regex = new RegExp(["^", req.query.username, "$"].join(""), "i");
    const existUsername = await User.findOne({ username: regex});

    if (existUsername) {
        const reservationsData = await Reservation.find({ username: existUsername.username });
        res.render("publicprofile", {existUsername, reservationsData});
    }
    else {
        res.send("<script>alert('No users found.'); window.location.href = '/searchusers'; </script>");
    }
})

app.get('/searchslots', function (req, res) {
    res.render("searchslots", {layout: "layouts/main"});
});

app.get('/slots', async (req, res) => {
    var new_date = (new Date(req.query.selected_date)).toLocaleDateString('en-US');
    const time_slot = req.query.time_slot;
    var new_time;

    switch(time_slot) {
        case "slot1":
            new_time = "9:00 AM";
            break;
        case "slot2":
            new_time = "9:30 AM";
            break;
        case "slot3":
            new_time = "10:00 AM";
            break;
        case "slot4":
            new_time = "10:30 AM";
            break;
        case "slot5":
            new_time = "11:00 AM";
            break;
        case "slot6":
            new_time = "11:30 AM";
            break;
        case "slot7":
            new_time = "12:00 PM";
            break;
        case "slot8":
            new_time = "12:30 PM";
            break;
        case "slot9":
            new_time = "1:00 PM";
            break;
        case "slot10":
            new_time = "1:30 PM";
            break;
        case "slot11":
            new_time = "2:00 PM";
            break;
        case "slot12":
            new_time = "2:30 PM";
            break;
        case "slot13":
            new_time = "3:00 PM";
            break;
        case "slot14":
            new_time = "3:30 PM";
    }
    var newdatetime = new_date + " " + new_time;

    const lab = req.query.lab;
    var newlab;

    switch (lab) {
        case "lab1":
            newlab = "Freddy's Frightful Manor";
            break;
        case "lab2":
            newlab = "Chica's Chilling Chamber";
            break;
        case "lab3":
            newlab = "Puppet's Perilous Palace";
    }

    const searchResults = await Reservation.find({ dateTimeReservation: newdatetime, laboratory: newlab});
    res.render("searchslots", {searchResults, layout: "layouts/main"});
});

//Reservation
app.get('/reservesee', async function (req, res){
    try {
        const currentUser = req.session.currentUser;
        const reservationsData = await Reservation.find({ username: currentUser.username });

        //console.log(currentUser);

        res.render('reservesee',{reservationsData, layout:"layouts/main"});

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
    //res.sendFile(path.join(__dirname, 'userviewprofile.html'));
});

//View Slots
app.get('/reserveviewslots', async function(req, res){
    try {
        const currentUser = req.session.currentUser;
        let reservationsData = await Reservation.find({});
        //const initialDtr = '1/1/2024 2:30 PM';
        const initialDtr = (new Date().toLocaleDateString('en-US')) + ' 9:00 AM';

        const initialLab = 'Freddy\'s Frightful Manor';
        const initialDt = (new Date().toLocaleDateString('en-US'))  + ' 9:00 AM - 9:30 AM';

        reservationsData.sort((a, b) => {
            const seatNumberA = parseInt(a.seat.split(' ')[1]);
            const seatNumberB = parseInt(b.seat.split(' ')[1]);
            return seatNumberA - seatNumberB;
        });

        //console.log(reservationsData);
        const sortedAndFilledReservationsData = fillBlanksDate(reservationsData, initialLab, initialDtr);

        const currDate = CurrentDate()
        res.render('reserveviewslots', {sortedAndFilledReservationsData, initialDtr, initialLab, initialDt, currDate, layout: "layouts/main"});
    } catch (error){
        console.error(error);
        res.status(500).send("Server error");
    }
})

app.get('/updateview', async function(req, res){
    const date = formatDate(req.query.date).toString();//mm/dd/yyyy
    const timeSlot = req.query.time_slot;//ex: 9:00AM
    const lab = req.query.lab;
    const reservationsData = await Reservation.find({});

    const initialDtr = date + " " + timeSlot;
    const initialLab = lab;
    const initialDt = timeSlot;

    reservationsData.sort((a, b) => {
        const seatNumberA = parseInt(a.seat.split(' ')[1]);
        const seatNumberB = parseInt(b.seat.split(' ')[1]);
        return seatNumberA - seatNumberB;
    });

    const sortedAndFilledReservationsData = fillBlanksDate(reservationsData, initialLab, initialDtr);
    
    const currDate = CurrentDate()
    res.render('reserveviewslots', {sortedAndFilledReservationsData, initialDtr, initialLab, initialDt, currDate, layout: "layouts/main"});
})

app.get('/viewother', async function(req, res){
    try {
        const name = req.query.other;
        const existUsername = await User.findOne({username: name});
        const reservationsData = await Reservation.find({ username: existUsername.username});
        res.render("publicprofile", {existUsername, reservationsData, layout: "layouts/main"});

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
})

function formatDate( format = "MM/DD/YYYY") {
    const d = new Date();
    console.log("here");
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1)
    const day = String(d.getDate())
  
    return format.replace(/MM/, month)
               .replace(/DD/, day)
               .replace(/YYYY/, year);
}

function formatDate(date, format = "MM/DD/YYYY") {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1);
    const day = String(d.getDate());

    return format
        .replace(/MM/, month)
        .replace(/DD/, day)
        .replace(/YYYY/, year);
}


function CurrentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // Add 1 because months are zero-indexed
    var day = today.getDate();

    // Ensure month and day are two digits
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return year + '-' + month + '-' + day;
}

function fillBlanksDate(reservation, initialLab, initialDtr) {
    let finalReservation = [];
    let existingSeats = new Set();

    // Populate existing seats
    for (const reserve of reservation) {
        if (reserve.dateTimeReservation === initialDtr && reserve.laboratory === initialLab) {
            finalReservation.push(reserve);
            existingSeats.add(reserve.seat);
        }
    }

    // Generate missing seats
    for (let i = 1; i <= 10; i++) {
        const seat = 'Seat ' + i;
        if (!existingSeats.has(seat)) {
            finalReservation.push({
                laboratory: initialLab,
                seat: seat,
                isAnonymous: false,
                dateTimeReservation: ''
            });
        }
    }

    return finalReservation;
}

//Make a reservation
app.get('/reserve', function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        res.render('reserve', { currentUser});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Edit reservation
app.get('/reserveedit', async function (req, res) {
    // try {
    //     const currentUser = req.session.currentUser;
    //     let reservationsData;
    //     if(currentUser.role == "V"){
    //         reservationsData = await Reservation.find({ username: currentUser.username });
    //     }
    //     else{
    //         reservationsData = await Reservation.find();
    //     }
    //     res.render('reserveedit', { currentUser, reservationsData });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Server error");
    // }
    try {
        const currentUser = req.session.currentUser;
        res.render('reserveedit', { currentUser });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.get('/reservesaveedit', function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        res.render('reservesaveedit', { currentUser });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});


//User Logout

app.get('/userlogout', function (req, res) {
    const currentUser = req.session.currentUser;
    res.render('userlogout', { currentUser, layout:"layouts/main"});
});

app.get('/logout', function (req, res) {
    req.session.currentUser = null; // Reset currentUser in session
    res.sendStatus(200); // Send a success response
    res.render('index', { layout:"layouts/main"});
});


var server = app.listen(3000, function () {
    console.log('Node server is running...');
});

app.use("/app", apps);