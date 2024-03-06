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

User.create([
    { username: 'FreddyFazbear', email: 'freddyfazbear@dlsu.edu.ph', password: 'fazbear00', description: 'I am five bears.',
    birthdate: '01/01/1987', role: 'V' },
    { username: 'BonnieBunny', email: 'bonnythebonnybon@dlsu.edu.ph', password: 'bonny3', description: 'I like baking cupcakes.',
    birthdate: '02/21/1983', role: 'V' },
    { username: 'FoxyThePirate', email: 'foxythepirate@dlsu.edu.ph', password: 'foxie12', description: 'I hunt for treasure!',
    birthdate: '06/04/1985', role: 'V' },
    { username: 'WilliamAfton', email: 'williamaftersun@dlsu.edu.ph', password: 'willom2', description: "I'm the bad guy.",
    birthdate: '07/29/1954', role: 'T' },
    { username: 'SpringTrap', email: 'springtrap@dlsu.edu.ph', password: 'Summer!', description: "I trap you.",
    birthdate: '07/29/1954', role: 'T' },
]);

module.exports = User