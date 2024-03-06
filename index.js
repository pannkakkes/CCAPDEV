const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/labDB')

const express = require('express')
const app = new express()

const fileUpload = require('express-fileupload')

const User = require("./database/models/User")
const Reservation = require("./database/models/Reservation")
const path = require('path')

app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use(express.static('public'))
app.use(fileUpload())

var hbs = require('hbs')
app.set('view engine','hbs');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '\\' + 'index.html');
});

var server = app.listen(3000, function () {
    console.log('Node server is running...');
});