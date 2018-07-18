const express = require('express');
const { Client } = require('pg');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

const router = express();

router.post('/signup', (req, res, next) => {
    const saltRounds = 10;
    const user = new userModel({
        email: req.body.email,

        password: bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

            });
        }),
    });
});
router.get('/', (req, res, next) => {

});

module.exports = router;