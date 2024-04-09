const router = require("express").Router();
const mongoose = require('mongoose');
const express = require('express');
const moment = require("moment-timezone");

mongoose.connect("mongodb+srv://pai:CRKDMGWvsxLejGFk@labdb.3vyara1.mongodb.net/?retryWrites=true&w=majority&appName=labDB")
router.use(express.static('public'))

const User = require("../database/models/User")
const Reservation = require("../database/models/Reservation")
let currentId;
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
    try {
        const currentUser = req.session.currentUser;
        let reservationsData;
        if(currentUser.role == "V"){
            reservationsData = await Reservation.find({ username: currentUser.username });
        }
        else{
            reservationsData = await Reservation.find({});
        }
        res.render('reserveedit', { currentUser, reservationsData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get('/saveedit', function (req, res) {
    try {
        currentId = req.query.id;

        const currentUser = req.session.currentUser;
        res.render('reservesaveedit', { currentUser });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.post('/save',async function(req, res){
    try {
        const currentUser = req.session.currentUser;
        const currentReservation = await Reservation.findOne({reserveId: currentId});

        const seatNum = req.body.infoSeatNum;

        const dateEdit = req.body.dateCheck;
        const slotEdit = req.body.time_slot;

        const dateTimeReservation = formatDate(dateEdit) + " " + slotEdit;
        let validCheck = await Reservation.findOne({dateTimeReservation: dateTimeReservation, seat: seatNum})


        //Time edited
        const utcNow = moment.utc();
        const philippinesTime = utcNow.tz('Asia/Manila');

        const hour = philippinesTime.format('h'); 
        const minutes = philippinesTime.format('mm');
        const meridian = philippinesTime.format('A'); 

        const timeRequest = philippinesTime.format('M/D/YYYY') + " " + hour + ":" + minutes + " " + meridian;

        //Checking if the user actually exist.
        if(currentUser.role == "T"){
            if (await Reservation.findOne({username: req.body.studentNameText})){

            }else {
                res.send("<script>alert('Edit was unsuccessful. This name does not exist'); window.location.href = '/app/main'; </script>");
                return;
            }
        }

        //This already Exist
        if (validCheck){
            res.send("<script>alert('Edit was unsuccessful. This Slot and Date has already been taken'); window.location.href = '/app/main'; </script>");
            return;
        }

        console.log();

        if (currentUser.role == "V"){
            currentReservation.seat = seatNum;
            currentReservation.dateTimeReservation = dateTimeReservation;
            currentReservation.dateTimeRequest = timeRequest;
        }else{
            currentReservation.seat = seatNum;
            currentReservation.dateTimeReservation = dateTimeReservation;
            currentReservation.username = req.body.studentNameText;
            currentReservation.dateTimeRequest = timeRequest;
        }

        await currentReservation.save();
        console.log(currentReservation);


        res.send("<script>alert('Edit was successful.'); window.location.href = '/app/main'; </script>");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
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

function formatDate(format = "MM/DD/YYYY") {
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

//reserve
router.post('/reserve', async function (req, res) {
    const { infoLabTitle, infoSeatNum, time_slot, dateCheck } = req.body;
    const currentUser = req.session.currentUser;
    const role = currentUser.role;
    const dateEdit = req.body.dateCheck;
    const dateTimeReservation = formatDate(dateEdit) + " " + time_slot;
    const currentDate = new Date(); // Get current date and time

    // Format currentDate to MM/DD/YYYY h:mm A
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    const formattedTime = (currentDate.getHours() % 12 || 12) + ':' + currentDate.getMinutes() + ' ' + (currentDate.getHours() >= 12 ? 'PM' : 'AM');
    const currentDateTime = formattedDate + ' ' + formattedTime;

    let inputname = null;
    if (role === 'T') {
        inputname = req.body.studentNameText; 
    }

    try {
        // Check if the reservation slot is already taken
        const existingReservation = await Reservation.findOne({ 
            laboratory: infoLabTitle, 
            seat: infoSeatNum, 
            dateTimeReservation: dateTimeReservation 
        });
        
        if (existingReservation) {
            // Reservation slot is already taken
            return res.status(400).send('<script>alert("This seat and slot are already reserved. Please select another one."); window.location.href="/app/main/reserve";</script>');
        }
        

        if (role === 'T'){
            //make it so that if username inputted does not exist it will not reserve
            const userExists = await User.exists({ username: inputname });
            if (!userExists) {
                return res.status(400).send('<script>alert("Reservation unsuccessful. This username does not exist."); window.location.href="/app/main/reserve";</script>');
            }
        }

        // Create new reservation
        await Reservation.create({
            reserveId: (await Reservation.findOne().sort({reserveId:-1})).reserveId + 1,
            username: inputname || currentUser.username,
            seat: infoSeatNum,
            laboratory: infoLabTitle,
            dateTimeRequest: currentDateTime,
            dateTimeReservation: dateTimeReservation,
            isAnonymous: req.body.isAnonymous === 'on' ? true : false // Check if checkbox is checked
        });

        res.send('<script>alert("Reservation successful!"); window.location.href="/app/main";</script>');
        
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).send("Error creating reservation.");
    }
});


module.exports = router;