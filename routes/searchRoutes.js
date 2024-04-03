const router = require("express").Router();
const mongoose = require('mongoose')
const express = require('express')

mongoose.connect('mongodb://localhost/labDB')
router.use(express.static('public'))

const Reservation = require("../database/models/Reservation")
const User = require("../database/models/User")

router.get('/searchusers', function (req, res) {
    res.render("searchusers", {layout: "layouts/main"});
});

router.get('/users', async (req, res) => {
    if (!req.query.username) {
        res.send("<script>alert('Please enter a username.'); window.location.href = '/app/main/search/searchusers'; </script>");
    }
    else {
    const existUsername = await User.find({username: {$regex: req.query.username, $options: "i"}})
    res.render("searchusers", {existUsername, layout: "layouts/main"});
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
    const searchResults = await Reservation.find({ dateTimeReservation: newdatetime, laboratory: newlab});
    res.render("searchslots", {searchResults, layout: "layouts/main"});
    }
    else {
        res.send("<script>alert('Please fill in all the fields.'); window.location.href = '/app/main/search/searchslots'; </script>");
    }
});

module.exports = router;