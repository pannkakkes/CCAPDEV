const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://pai:CRKDMGWvsxLejGFk@labdb.3vyara1.mongodb.net/?retryWrites=true&w=majority&appName=labDB')

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