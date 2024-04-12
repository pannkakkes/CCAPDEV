const router = require("express").Router();
const mongoose = require('mongoose')
const express = require('express')
mongoose.connect("mongodb+srv://pai:CRKDMGWvsxLejGFk@labdb.3vyara1.mongodb.net/?retryWrites=true&w=majority&appName=labDB")
router.use(express.static('public'))

const Reservation = require("../database/models/Reservation")
const User = require("../database/models/User")

router.get('/searchusers', function (req, res) {
    res.render("searchusers", {layout: "layouts/main"});
});

router.get('/users', async (req, res) => {
    if (!req.query.username) {
        const errorExists = true;
        res.render("searchusers", {errorExists, layout: "layouts/main"});
    }
    else {
    const existUsername = await User.find({username: {$regex: req.query.username, $options: "i"}})
    const name = req.query.username;
    res.render("searchusers", {name, existUsername, layout: "layouts/main"});
    }
})

router.get('/searchslots', function (req, res) {
    res.render("searchslots", {layout: "layouts/main"});
});

router.get('/slots', async (req, res) => {
    if (req.query.selected_date && req.query.time_slot != "choose-slot" && req.query.lab != "choose-lab") {

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
    const searchResults = await Reservation.find({ dateTimeReservation: newdatetime, laboratory: newlab}).sort({seat:1});

    var isTakenSeat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    searchResults.forEach((element) => isTakenSeat[parseInt((element.seat.split(" "))[1]) - 1] = element);

    res.render("searchslots", {isTakenSeat, newlab, newdatetime, layout: "layouts/main"});
    }
    else {
        var errorExists = true;
        res.render("searchslots", {errorExists, layout: "layouts/main"});
    }
});

module.exports = router;