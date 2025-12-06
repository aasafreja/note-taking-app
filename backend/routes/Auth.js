const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const pool = require("../db/db");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../middleware/auth')

const { registerValidator } = require('../middleware/validators');

router.post('/register', registerValidator, async (req, res, next) => {

    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool
            .query("INSERT INTO notes.users ( name, email, password) VALUES ($1, $2, $3) RETURNING *",
                [name, email, hashedPassword]);
        const safeUser = newUser.rows[0];
        res.status(201).json({ message: "User registered successfully!", user: safeUser });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'Email already exists' });
        }
        next(error)
    }
})


router.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message || "Login failed" });

        req.logIn(user, (err) => {
            if (err) return next(err);

            return res.status(200).json({ message: "Logged in successfully!", user })
        })
    })(req, res, next);
})


router.get('/user', ensureAuthenticated, (req, res) => {
    const { name } = req.user;
    res.json({ name });
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        console.log('Logged out successfully')
        res.json({ message: 'Logged out successfully' });
    });
});

module.exports = router;
