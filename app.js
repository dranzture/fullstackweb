const express = require('express');
const app = express();

//node dependencies
const morgan = require("morgan");
const bodyParser = require("body-parser");

//route dependencies
const userRoute = require('./api/routes/user');
const loginRoute = require('./api/routes/login');
//nodes initiate
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//http headers control
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//create routes
app.use('/user', userRoute);
app.use('/login', loginRoute);

app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Test works',
    })
});

module.exports = app;
