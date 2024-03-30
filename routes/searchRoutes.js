const router = require("express").Router();

router.get('/searchusers', function (req, res) {
    res.render("searchusers", {layout: "layouts/main"});
});

router.get('/users', async (req, res) => {
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

router.get('/searchslots', function (req, res) {
    res.render("searchslots", {layout: "layouts/main"});
});

router.get('/slots', async (req, res) => {
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

module.exports = router;