const router = require("express").Router();
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')


mongoose.connect("mongodb+srv://pai:CRKDMGWvsxLejGFk@labdb.3vyara1.mongodb.net/?retryWrites=true&w=majority&appName=labDB")
router.use(express.static('public'))

const Reservation = require("../database/models/Reservation")
const User = require("../database/models/User")

router.get('/', async function (req, res) {
    try {
        const currentUser = await User.findOne({ username: req.session.currentUser.username });
        const reservationsData = await Reservation.find({ username: currentUser.username });
        reservationsData.reverse();
        const birthdate = currentUser.birthdate; 
        const [month, day, year] = birthdate.split('/');
        return res.render('userviewprofile',{currentUser, reservationsData, formattedBirthdate: `${year}-${month}-${day}`, layout: "layouts/main"});

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

router.post('/edit', async (req, res) => {
    const currentUser = await User.findOne({ username: req.session.currentUser.username });
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
            const { image } = req.files;
            const timestamp = Date.now(); // Get current timestamp
            const fileExtension = path.extname(image.name);
            const uniqueFilename = `${timestamp}_${image.name}`; // Append timestamp to image name
            profilePicture = "/images/" + uniqueFilename;

            image.mv(path.resolve('./public/images', uniqueFilename), (error) => {
                if (error) {
                    console.log("Error moving image:", error);
                }
            });
        }

        userToUpdate.birthdate = formattedBirthdate;
        userToUpdate.description = desc;
        userToUpdate.profilepicture = profilePicture;
        await userToUpdate.save();
        return res.send("<script>alert('Edit was successful.'); window.location.href = '/app/main/profile'; </script>");
    } catch (err){
        console.error('Error updating user:', err);
        return res.status(500).send('Error updating user');
    }
})

router.get('/deleteprofile', async function (req, res){
    // Retrieve current user from session
    const currentUser = await User.findOne({ username: req.session.currentUser.username });
    //console.log(currentUser._id)
    //console.log(currentUser);
    // Render user delete template (userdelete.hbs) with current user's information
    return res.render('userdelete', { currentUser, layout: "layouts/main"});
});   

router.post('/delete', async function (req, res) {
    const idTobeDeleted = req.body.theone;

    try {
        await User.deleteOne({ _id: idTobeDeleted });
        await Reservation.deleteMany({username: req.session.currentUser.username});
        req.session.currentUser = null;
        return res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).send('Error deleting user');
    }
});

module.exports = router;