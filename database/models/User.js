const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    description: String,
    birthdate: String,
    profilepicture: String,
    role: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User