const express = require('express');
const { Client } = require('pg');

const router = express();

router.get('/', (req, res, next) => {
    const client = new Client();
    client.connect()
        .then(() => {
            console.log("connected to posgres!");
            return client.query("select * from users");
        })
        .then(result => {
            client.end();
            if (result.rowCount > 0) {
                console.log(result);
                res.status(200).json({
                    count: result.rowCount,
                    data: result.rows
                })
            }
        })
        .catch((err) => {
            client.end();
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;