const router = require("express").Router();
const profile = require("./profileRoutes");
const reserve = require("./reserveRoutes");
const search = require("./searchRoutes");

router.use("/profile", profile);
router.use("/reserve", reserve);
router.use("/search", search);

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://pai:CRKDMGWvsxLejGFk@labdb.3vyara1.mongodb.net/?retryWrites=true&w=majority&appName=labDB");
const User = require("../database/models/User")
const Reservation = require("../database/models/Reservation")

router.get("/", async function (req, res) { 
    try {
        console.log("here")
        // Ensure that the session contains the current user information
        if (!req.session.currentUser) {
            return res.redirect('/'); // Redirect to index if currentUser is not set in the session
        }

        // Fetch the current user from the database
        const currentUser = req.session.currentUser;
        const thisUser = await User.findOne({ username: currentUser.username });

        // Fetch reservations data associated with the current user
        const reservationsData = await Reservation.find({ username: thisUser.username });
        reservationsData.reverse();

        // Split the birthdate to format it as MM/DD/YYYY
        const birthdate = thisUser.birthdate; 
        const [month, day, year] = birthdate.split('/');
        
        // Render the dashboard template with the current user and reservations data
        console.log(thisUser, reservationsData);
        return res.render('dashboard', {
            thisUser,
            reservationsData,
            formattedBirthdate: `${year}-${month}-${day}`,
            layout: "layouts/main"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

//User Logout
router.get('/userlogout', function (req, res) {
    const currentUser = req.session.currentUser;
    return res.render('userlogout', { currentUser, layout:"layouts/main"});
});

router.get('/logout', function (req, res) {
    req.session.currentUser = null; // Reset currentUser in session
    res.sendStatus(200); // Send a success response
    return res.render('index', { layout:"layouts/main"});
});

module.exports = router;