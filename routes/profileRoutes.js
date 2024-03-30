const router = require("express").Router();
const mongoose = require('mongoose')
const express = require('express')

mongoose.connect('mongodb://localhost/labDB')
router.use(express.static('public'))

const Reservation = require("../database/models/Reservation")

router.get('/', async function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        const reservationsData = await Reservation.find({ username: currentUser.username });

        res.render('userviewprofile',{currentUser, reservationsData, layout: "layouts/main"});

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get('/editprofile', function (req, res) {
    try {
        const currentUser = req.session.currentUser;
        const birthdate = currentUser.birthdate; 
        const [month, day, year] = birthdate.split('/');

        res.render('usereditprofile', { currentUser, formattedBirthdate: `${year}-${month}-${day}`, layout: "layouts/main"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
    //res.sendFile(path.join(__dirname, 'usereditprofile.html'));
});

router.post('/edit', async (req, res) => {
    const currentUser = req.session.currentUser;
    const ID = currentUser.username;

    const date = req.body.birthdate.toString();
    const [year, month, day] = date.split('-');
    const formattedBirthdate = `${month}/${day}/${year}`;

    const desc = req.body.description;
    //const {image} = req.files;

    try {
        const userToUpdate = await User.findOne({username: ID});

        if (!userToUpdate){
            return res.status(404).send('User not found');
        }
        
        let profilePicture = userToUpdate.profilepicture;

        if (req.files && req.files.image) {
            console.log("Hello");
            const { image } = req.files;
            profilePicture = "images/" + image.name;
            image.mv(path.resolve(__dirname, 'public/images', image.name), (error) => {
                if (error) {
                    console.log("Error moving image:", error);
                }
            });
        }

        userToUpdate.birthdate = formattedBirthdate;
        userToUpdate.description = desc;
        userToUpdate.profilepicture = profilePicture;

    
        await userToUpdate.save();
        res.send("<script>alert('Edit was successful.'); window.location.href = 'app/main'; </script>");
    } catch (err){
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
    }
})

router.get('/deleteprofile', function (req, res){
    // Retrieve current user from session
    const currentUser = req.session.currentUser;
    //console.log(currentUser._id)
    //console.log(currentUser);
    // Render user delete template (userdelete.hbs) with current user's information
    res.render('userdelete', { currentUser, layout: "layouts/main"});
});   

router.post('/delete', async function (req, res) {
    const idTobeDeleted = req.body.theone;

    try {
        await User.deleteOne({ _id: idTobeDeleted });
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});

module.exports = router;