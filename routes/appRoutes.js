const router = require("express").Router();

const sessionChecker = (req, res, next) => {
    if (req.session.currentUser) {
        res.redirect('/dashboard'); // Redirect to dashboard if currentUser is set in the session
    } else {
        next(); // Continue to the next middleware if session is not active
    }
};

router.get('/', sessionChecker, (req, res) => {
    res.render('index', { layout: "layouts/main" });
});

///////////////////////////
router.get('/', function (req, res) {
    res.render("index", {layout: "layouts/main"});
});

module.exports = router;