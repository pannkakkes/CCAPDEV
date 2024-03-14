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

var hbs = require('hbs');
const { brotliDecompress } = require('zlib');
app.set('view engine','hbs');

var db = mongoose.connection;

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
    res.render("searchslots", null);
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
    res.render("searchslots", {searchResults});
});

app.get('/viewprofile', async function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        const reservationsData = await Reservation.find({ username: currentUser.username });

        res.render('userviewprofile',{currentUser, reservationsData});

        //console.log(user);
        //console.log(reservationsData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
    //res.sendFile(path.join(__dirname, 'userviewprofile.html'));
});

app.get('/editprofile', function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        const birthdate = currentUser.birthdate; 
        const [month, day, year] = birthdate.split('/');

        res.render('usereditprofile', { currentUser, formattedBirthdate: `${year}-${month}-${day}` });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
    //res.sendFile(path.join(__dirname, 'usereditprofile.html'));
});

app.post('/edit', async (req, res) => {
    const img = req.files;
    const currentUser = req.session.currentUser;
    const ID = currentUser.username;

    const date = req.body.birthdate.toString();
    const [year, month, day] = date.split('-');
    const formattedBirthdate = `${month}/${day}/${year}`;

    const desc = req.body.description;
    const image = req.body.image.toString();

    //console.log(ID + formattedBirthdate + desc + image);

    try {
        const userToUpdate = await User.findOne({username: ID});

        if (!userToUpdate){
            return res.status(404).send('User not found');
        }

        //img.mv(path.resolve(__dirname, 'public/images', image.name))
        
        userToUpdate.birthdate = formattedBirthdate;
        userToUpdate.description = desc;
        userToUpdate.profilepicture = "image/"+ image;

        //console.log(formattedBirthdate + desc + "image/"+ image);

        await userToUpdate.save();
        //images.mv(path.resolve(__dirname, 'public/images', image));

    } catch (err){
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
    }
})

//Reservation
app.get('/reservesee', async function (req, res){
    try {
        const currentUser = req.session.currentUser;
        const reservationsData = await Reservation.find({ username: currentUser.username });

        //console.log(currentUser);

        res.render('reservesee',{reservationsData});

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
        const reservationsData = await Reservation.find({ username: currentUser.username });

        //console.log(currentUser);
        const today = formatDate(today);

        res.render('reserveviewslots', {reservationsData});
        
    } catch (error){
        console.error(error);
        res.status(500).send("Server error");
    }
})

function formatDate(date, format = "MM/DD/YYYY") {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const day = String(d.getDate()).padStart(2, '0'); 
  
    // Replace placeholders in format string
    return format.replace(/MM/, month)
               .replace(/DD/, day)
               .replace(/YYYY/, year);
  }

//Make a reservation
app.get('/reserve', function (req, res) {
    res.sendFile(path.join(__dirname, 'reserve.html'));
});
app.post('/reserveRedirect', function (req, res) {
    const { userStatus, labName } = req.body;

    if (userStatus === 'T') { 
        res.redirect('/reserveforstudent.html');
    } else {
        res.redirect('/reserveconfirm.html');
    }
});

//User Logout

app.get('/userlogout', function (req, res) {
    const currentUser = req.session.currentUser;
    res.render('userlogout', { currentUser });
});

app.get('/logout', function (req, res) {
    req.session.currentUser = null; // Reset currentUser in session
    res.sendStatus(200); // Send a success response
});


var server = app.listen(3000, function () {
    console.log('Node server is running...');
});
