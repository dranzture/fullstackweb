const express = require('express');
const router = express.Router();

const { Client } = require('pg');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');



router.post('/signup', (req, res, next) => {
    const saltRounds = 10;
    console.log(req.body.email);
    console.log(req.body.password);

    const user = new userModel({
        email: req.body.email,
        password: bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                else {
                    const client = new Client();
                    client.connect()
                        .then(() => {
                            const query_for_user_exists = "Select id from Login_Users Where email=$1";
                            client.query(query_for_user_exists, [req.body.email], function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log(result.rowCount);
                                    if (result.rowCount > 0) {
                                        return res.status(200).json({
                                            message: "this user exists!"
                                        })
                                    }
                                    else {
                                        const query = "Insert Into Login_Users(email,password) Values($1,$2) returning id";
                                        client.query(query, [req.body.email, hash], function (err, result) {
                                            if (err) {
                                                return res.status(500).json({
                                                    error: err
                                                })
                                            }
                                            else {
                                                user.id = result.rows[0].id;
                                                client.end();
                                                console.log(user.id + " has assigned to the new user");
                                                return res.status(201).json({
                                                    message: 'user is created!'
                                                })
                                            }
                                        })
                                    }
                                }
                            });
                        });
                }
            })
        }),
    });
});
router.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'hey there',
    })
});
router.post('/', (req, res, next) => {
    return res.status(404).json({
        message: 'No directory found!',
    })
});
module.exports = router;