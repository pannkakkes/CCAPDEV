const router = require("express").Router();

router.get('/', function (req, res) {
    res.render("dashboard", {layout: "layouts/main"});
});

module.exports = router;