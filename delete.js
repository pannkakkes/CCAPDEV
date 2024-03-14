const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/labDB')

const express = require('express')
const app = new express()

var db = mongoose.connection;

var server = app.listen(3000, function () {
    console.log('Node server is running..');
});

console.log("Dropping reservations...")
db.collection('reservations').drop();

console.log("Dropping users...")
db.collection('users').drop();