const router = require("express").Router();
const profile = require("./profileRoutes");

router.get('/', function (req, res) {
    res.render("dashboard", {layout: "layouts/main"});
});

router.use("/profile", profile);

module.exports = router;