const https = require('https');

const http = require('http');

const app = require('./app');
const fs = require('fs');

const key = fs.readFileSync('./encryption/localhost.key');
const cert = fs.readFileSync('./encryption/localhost.crt');
const ca = fs.readFileSync('./encryption/ca.crt');

const options = {
    key: key,
    cert: cert,
    ca: ca
};

const port = process.env.PORT || 3000;

const server = https.createServer(options, app);
server.listen(port, () => {
    console.log("Listening server at port: " + port);
});
// const server = http.createServer(app);
// server.listen(port, () => {
//     console.log("Listening server at port: " + port);
// });
