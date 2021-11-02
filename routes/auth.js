const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/Keys')
const requireLogin = require('../middleware/requireLogin')

// router.get('/', (req, res) => {
//     res.send("I am from router")
// })
// router.get('/protected', requireLogin, (req, res) => {
//         res.send("I am from protected")
//     })
//signup route
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    User.findOne({ email: email }) //finding the entered email in the db, if there exist a match throwing a error if not storing it in db
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists in the fields" })
            }
            bcrypt.hash(password, 12) //hashing the password using bcryptjs
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved successfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })

                })

        })
        .catch(err => { console.log(err) })
})

//signin route, checking with the already presenting mail id in db and if there exist matches its getting logged in
router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Invalid email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({ message: "successfully logged in" })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email } }) //using jwt getting a token for the successfully loged user
                    } else {
                        return res.status(422).json({ error: "Invalid email or password" })
                    }
                })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router