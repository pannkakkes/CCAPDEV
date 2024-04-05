const router = require("express").Router();
const main = require("./mainRoutes");
const bcrypt = require('bcryptjs');
const path = require('path');

const User = require("../database/models/User")

const sessionChecker = (req, res, next) => {
    if (req.session.currentUser) {
        res.redirect('main'); // Redirect to dashboard if currentUser is set in the session
    } else {
        res.redirect('/'); // Redirect to index if currentUser is not set in the session
    }
};

router.get('/', sessionChecker, (req, res) => {
    res.render('index', { layout: "layouts/main" });
});

///////////////////////////
router.get('/', function (req, res) {
    res.render("index", {layout: "layouts/main"});
});

// User Registration Route (/userregister)
router.get('/userregister', sessionChecker, function (req, res) {
    res.render("userregister", { layout: "layouts/main" });
});

//User Login
router.get('/userlogin', function (req, res) {
    res.render("userlogin", {layout: "layouts/main"});
});

router.post('/login', async function (req, res) {
    const { email, password, keepLoggedIn } = req.body; 

    try {
        // Check if the provided password is one of the exceptions
        const exceptions = ['fazbear00', 'bonny3', 'foxie12', 'willom2', 'Summer!'];
        if (exceptions.includes(password)) {
            const user = await User.findOne({ email });
            req.session.currentUser = user;
            if (keepLoggedIn) {
                req.session.cookie.maxAge = 604800000; // 7 days
            } else {
            }            
            return res.redirect('main');
        }

        // If not an exception, proceed with regular login process
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("Invalid email or password.");
        }

        // Compare the hashed password with the provided password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).send("Invalid email or password.");
        }
        
        req.session.currentUser = user;
        if (keepLoggedIn) {
            req.session.cookie.maxAge = 604800000;  // 7 days
        } else {
        }
                res.redirect('main');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//User Registration
router.get('/userregister', function (req, res) {
    res.render("userregister", {layout: "layouts/main"});
});

router.get('/app/userregister', function (req, res) {
    res.render("userregister", { layout: "layouts/main"});
});

router.post('/register', async function (req, res) {
    const { image } = req.files;
    const { email, username, password, description, birthdate, role } = req.body; // Retrieve role from request body

    try {

        // Hash the password
        bcrypt.hash(password, 10, async function (err, hashedPassword) {
            
            const existingEmail = await User.findOne({ email });
            const existingUsername = await User.findOne({ username });

            if (existingEmail) {
                return res.status(400).send('<script>alert("Email already exists."); window.location.href="/app/userregister";</script>');
            }

            if (existingUsername) {
                return res.status(400).send('<script>alert("Username already exists."); window.location.href="/app/userregister";</script>');
            }
            
            
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Error registering user.");
            }

            try {
                // Save the user with hashed password
                await image.mv(path.resolve(__dirname, '../public/images', image.name));

                await User.create({
                    email,
                    username,
                    password: hashedPassword,
                    description,
                    birthdate,
                    profilepicture: '/images/' + image.name,
                    role: role // Save the role
                });

                res.send('<script>alert("Registration successful!"); window.location.href="/";</script>');
            } catch (error) {
                console.error("Error creating user:", error);
                res.status(500).send("Error registering user.");
            }
        });
    } catch (error) {
        console.error("Error checking existing email and username:", error);
        res.status(500).send("Error checking existing email and username.");
    }
});


router.get('/details', function (req, res) {
    res.render("details", {layout: "layouts/main"});
});

router.get('/about', function (req, res) {
    res.render("about", {layout: "layouts/main"});
});

router.use("/main", main);

module.exports = router;