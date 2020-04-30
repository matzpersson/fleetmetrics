
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

let apiPing = require("./routes/ping");
let apiMessages = require("./routes/message");
let apiAssets = require("./routes/asset");
let apiUsers = require("./routes/user");
let apiMetric = require("./routes/metric");
let apiPermission = require("./routes/permission");

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Define api routes
app.use('/api', apiAssets);
app.use('/api', apiPing);
app.use('/api', apiMessages);
app.use('/api', apiUsers);
app.use('/api', apiMetric);
app.use('/api', apiPermission);

module.exports = app
