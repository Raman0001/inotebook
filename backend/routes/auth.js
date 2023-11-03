const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'createrTHEwebversion';

//ROUTE 1: Create a User using:POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', "invalid name").isLength({ min: 2 }),
    body('email', 'Enter Email').isEmail(),
    body('password', 'weak password').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors ,Return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() })
    }
    // Check whether the user with the email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "sorry email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id,
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success,authtoken});
    }
    catch (error) {
        success = false;
        console.error(error.message);
        res.status(500).send("Some error occured:contact to the developer");
    }
})
//ROUTE 2 : Authenticate a User using :POST"/api/auth/login".no login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter your password').exists(),
], async (req, res) => {
    // if there are errors ,Return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please enter right details" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({success, error: "Please enter right details" });
        }
        const data = {
            user: {
                id:user.id,
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error");
    }
})
// ROUTE 3 : Get logged in USER details Using : POST "/api/auth/login".login required
router.post('/getuser',fetchuser, async (req, res) => {
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error");
}
})
module.exports = router