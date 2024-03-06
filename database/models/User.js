const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    description: String,
    birthdate: String,
    profilepicture: String,
    userType: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User