const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Client } = require('pg');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res, next)=>{
    console.log(req.header('Authorization'));
    const client = new Client();
    client.connect()
        .then(() => {
            const retrieve_User = "Select * from Users";
            client.query(retrieve_User,(err,result)=>{
                return res.status(200).json({
                    count: result.rowCount,
                    data: result.rows               
                })
            });
        });
});

router.post('/signup', (req, res, next) => {
    const saltRounds = 10;
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
                        }).catch((err) => {
                            client.end();
                            res.status(500).json({
                                error: err
                            })
                        });
                }
            })
        }),
    });
});

router.post('/login', (req, res, next) => {
    const client = new Client();
    client.connect()
        .then(() => {
            const retrieve_User = "Select id, password from Login_Users where email=$1";
            client.query(retrieve_User, [req.body.email], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.rowCount === 0) {
                        console.log(req.body.email);
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    else {
                        bcrypt.compare(req.body.password, result.rows[0].password, (err, hash_results) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                if (hash_results === true) {
                                    const token = jwt.sign({
                                        email: req.body.email,
                                        userId: result.rows[0].id
                                    }
                                        , process.env.JWT_KEY,
                                        {
                                            expiresIn: "1h"
                                        });
                                    console.log(hash_results);
                                    return res.status(200).json({
                                        message: "Authenticated!",
                                        token: token
                                    })
                                }
                                else {
                                    console.log(hash_results);

                                    return res.status(404).json({
                                        message: "Auth failed"
                                    })
                                }

                            }
                        })
                    }
                }
            });
        })
        .catch((err) => {
            client.end();
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;
