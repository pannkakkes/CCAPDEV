const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://pai:CRKDMGWvsxLejGFk@labdb.3vyara1.mongodb.net/?retryWrites=true&w=majority&appName=labDB")

const express = require('express')
const app = new express()
const session = require('express-session');

const fileUpload = require('express-fileupload')

const bodyParser = require('body-parser');

const apps = require("./routes/appRoutes");

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
hbs.registerPartials(__dirname + '/views/partials');
const { brotliDecompress } = require('zlib');
app.set('view engine','hbs');

hbs.registerHelper('compareStrings', function(string1, string2, options) {
    return string1 === string2;
});

hbs.registerHelper('and', function () {
    return Array.prototype.slice.call(arguments, 0, -1).every(Boolean);
});

hbs.registerHelper('break', function() {
    this.breakLoop = true;
});

hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});


var db = mongoose.connection;

//Check for keep me logged in

const sessionChecker = (req, res, next) => {
    if (req.session.currentUser) {
        res.redirect('app/main'); // Redirect to dashboard if currentUser is set in the session
    } else {
        next(); // Continue to the next middleware if session is not active
    }
};

//Routes if not keep me logged in
// Route for the home page
app.get('/', sessionChecker, (req, res) => {
    res.redirect("app");
});

// User Login
app.get('/userlogin', sessionChecker, (req, res) => {
    res.render('userlogin', { layout: "layouts/main" });
});

/////////////////////////
app.get('/', function (req, res) {
    res.redirect("app");
});


var server = app.listen(3000, function () {
    console.log('Node server is running...');
});

app.use("/app", apps);