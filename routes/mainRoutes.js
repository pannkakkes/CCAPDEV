const router = require("express").Router();
const profile = require("./profileRoutes");
const reserve = require("./reserveRoutes");
const search = require("./searchRoutes");

router.get('/', function (req, res) {
    return res.render("dashboard", {layout: "layouts/main"});
});

router.use("/profile", profile);
router.use("/reserve", reserve);
router.use("/search", search);

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