const router = require("express").Router();
const mongoose = require('mongoose');
const express = require('express');
const moment = require("moment-timezone");
const mom = require("moment");
const path = require('path')

mongoose.connect("mongodb+srv://pai:CRKDMGWvsxLejGFk@labdb.3vyara1.mongodb.net/?retryWrites=true&w=majority&appName=labDB")
router.use(express.static('public'));

const User = require("../database/models/User")
const Reservation = require("../database/models/Reservation")
let currentId;
//Make a reservation
router.get('/', function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        return res.render('reserve', { currentUser});
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
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
        reservationsData.reverse();
        return res.render('reserveedit', { currentUser, reservationsData });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

router.get('/saveedit', async function (req, res) {
    try {
        const currentUser = req.session.currentUser;

        let reservationsData = await Reservation.findOne({ reserveId: req.query.id });
        currentId = req.query.id;

        if (reservationsData) {
            var dt = reservationsData.dateTimeReservation.split(" ");
            var formattedDate = Date.parse(dt[0]);
            formattedDate = moment(formattedDate).format('YYYY-MM-DD');
            return res.render('reservesaveedit', { formattedDate, currentUser, reservationsData });
        }
        else {
            return res.render('404', { layout: "layouts/main" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
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
                const usernameNotExist = true;
                let reservationsData = await Reservation.findOne({ reserveId: currentId });
                return res.render('reservesaveedit',{currentUser, reservationsData, usernameNotExist});
            }
        }

        //This already Exist
        if (validCheck){
            let reservationsData = await Reservation.findOne({ reserveId: currentId });
            return res.render('reservesaveedit',{currentUser, reservationsData, validCheck});
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


        return res.send("<script>alert('Edit was successful.'); window.location.href = '/app/main'; </script>");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

//Reservation
router.get('/see', async function (req, res){
    try {
        const currentUser = req.session.currentUser;
        const reservationsData = await Reservation.find({ username: currentUser.username });
        reservationsData.reverse();

        //console.log(currentUser);

        return res.render('reservesee',{reservationsData, layout:"layouts/main"});

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
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
        return res.render('reserveviewslots', {sortedAndFilledReservationsData, initialDtr, initialLab, initialDt, currDate, layout: "layouts/main"});
    } catch (error){
        console.error(error);
        return res.status(500).send("Server error");
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
    return res.render('reserveviewslots', {sortedAndFilledReservationsData, initialDtr, initialLab, initialDt, currDate, layout: "layouts/main"});
})

router.get('/users/:name', async function(req, res){
    try {
        const name = req.params.name;
        const existUsername = await User.findOne({username: name});
        if (existUsername == null) {
            return res.render('404', { layout: "layouts/main" });
        }

        const reservationsData = await Reservation.find({ username: existUsername.username});
        var currentUser = (req.session.currentUser);

        if (name == currentUser.username) {
            return res.render('userviewprofile',{currentUser, reservationsData, layout: "layouts/main"});
        }

        return res.render("publicprofile", {existUsername, reservationsData, layout: "layouts/main"});

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
})

function formatDate(format = "MM/DD/YYYY") {
    const d = new Date();
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

    const utcNow = moment.utc();
    const philippinesTime = utcNow.tz('Asia/Manila');

    const hour = philippinesTime.format('h'); 
    const minutes = philippinesTime.format('mm');
    const meridian = philippinesTime.format('A'); 

    const timeRequest = philippinesTime.format('M/D/YYYY') + " " + hour + ":" + minutes + " " + meridian;

    let inputname = null;
    if (role === 'T') {
        inputname = req.body.studentNameText; 
    }
    
    const seatArr = infoSeatNum.split("+");

    for (let i = 0; i < seatArr.length; i++) {
        // Check if the reservation slot is already taken
        const existingReservation = await Reservation.findOne({ 
            laboratory: infoLabTitle, 
            seat: seatArr[i], 
            dateTimeReservation: dateTimeReservation 
        });
        
        if (existingReservation) {
            // Reservation slot is already taken
            const validCheck = true;
            return res.render('reserve', { currentUser, validCheck});
        }

        if (role === 'T'){
            //make it so that if username inputted does not exist it will not reserve
            const userExists = await User.exists({ username: inputname });
            if (!userExists) {
                const usernameNotExist = true;
                return res.render('reserve', { currentUser, usernameNotExist});
            }
        }
    }

    for (let i = 0; i < seatArr.length; i++) {
    try {

        // Create new reservation
        await Reservation.create({
            reserveId: (await Reservation.findOne().sort({reserveId:-1})).reserveId + 1,
            username: inputname || currentUser.username,
            seat: seatArr[i],
            laboratory: infoLabTitle,
            dateTimeRequest: timeRequest,
            dateTimeReservation: dateTimeReservation,
            isAnonymous: req.body.isAnonymous === 'on' ? true : false // Check if checkbox is checked
        });
        
    } catch (error) {
        console.error("Error creating reservation:", error);
        return res.status(500).send("Error creating reservation.");
    }
    }
    
    return res.send('<script>alert("Reservation successful!"); window.location.href="/app/main";</script>');
});

router.post('/deletereservation', async function (req, res) {
    let splitDateTime = req.body.deleteDate.split(" ");
    let _date = new Date(splitDateTime[0]);
    // let _date = new Date(splitDateTime[0]).toLocaleString('en-US', { timeZone: 'Asia/Manila' });
    let _time = splitDateTime[1];
    let splitTime = _time.split(":");
    let hour = parseInt(splitTime[0]);
    let minute = parseInt(splitTime[1]);

    if (hour < 9) {
        hour += 12;
    }

    _date.setHours(hour);
    _date.setMinutes(minute);
    let curDate = new Date().getTime();

    if ((curDate - _date.getTime()) / 60000 >= 10) {
        await Reservation.deleteOne({
            reserveId: req.body.toDelete
        });
        return res.send('<script>alert("Reservation deleted!"); window.location.href="/app/main";</script>');
    }

    else {
        const cannotCancel = true;
        const currentUser = req.session.currentUser;
        let reservationsData = await Reservation.findOne({ reserveId: currentId });
        return res.render('reservesaveedit', { currentUser, reservationsData, cannotCancel });
    }
    
});

module.exports = router;