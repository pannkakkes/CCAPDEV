const router = require("express").Router();
const mongoose = require('mongoose')
const express = require('express')

mongoose.connect("mongodb+srv://pai:CRKDMGWvsxLejGFk@labdb.3vyara1.mongodb.net/?retryWrites=true&w=majority&appName=labDB")
router.use(express.static('public'))

const User = require("../database/models/User")
const Reservation = require("../database/models/Reservation")

//Make a reservation
router.get('/', function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        res.render('reserve', { currentUser});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Edit reservation
router.get('/edit', async function (req, res) {
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

router.get('/saveedit', function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        res.render('reservesaveedit', { currentUser });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//reserve
router.post('/reserve', async function (req, res) {
    const { laboratory, seat, slot, date, isAnonymous } = req.body;
    var role = currentUser.role;
    var dateTimeReservation = `${date} ${slot}`; // Combine date and slot
    var currentDate = moment().format('MM/DD/YYYY h:mm A');

    // Format dateTimeReservation to MM/DD/YYYY XX:XX XM
    dateTimeReservation = moment(dateTimeReservation, 'YYYY-MM-DD HH:mm').format('MM/DD/YYYY h:mm A');
    var inputname;

    if (role == 'T') {
        inputname = req.body.reservename; // Access input field with name reservename
    }

    try {
        // Check if the selected seat and slot are available
        // const existingReservation = await Reservation.findOne({ seat, slot, date });
        // if (existingReservation) {
        //     return res.status(400).send('<script>alert("This seat and slot are already reserved. Please select another one."); window.location.href="/app/main/reserve";</script>');
        // }
        
        var finalName;
        if (role == 'T') {
            finalName = inputname;
        } else {
            finalName = currentUser.username;
        }

        // Create new reservation
        await Reservation.create({
            //create id here
            username: finalName,
            seat,
            laboratory,
            dateTimeRequest: currentDate,
            dateTimeReservation,
            isAnonymous
        });

        res.send('<script>alert("Reservation successful!"); window.location.href="/app/main";</script>');
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).send("Error creating reservation.");
    }
});

//Reservation
router.get('/see', async function (req, res){
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
router.get('/viewslots', async function(req, res){
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

router.get('/updateview', async function(req, res){
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

router.get('/viewother', async function(req, res){
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

module.exports = router;