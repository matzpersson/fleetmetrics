import 'dotenv/config';
import cors from 'cors';
import express from 'express';
// const socketIo = require("socket.io");
import axios from "axios";
import * as http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Broker from './lib/broker';
import IO from './lib/io.js';

// import Message from './models/message';
let apiMessages = require("./routes/message");

// Configure Express
let app = express();
const port = process.env.API_PORT || 8080;

app.listen(port, function () {
  console.log("REST Api ready on port " + port);
});

// Mongoose and Mongodb connection
const mongo_server = process.env.MONGO_SERVER || 'localhost';
const mongo_db = process.env.MONGO_DATABASE || 'nmea-visualiser';
const mongo_port = process.env.MONGO_PORT || 27017;

mongoose.connect(`mongodb://${mongo_server}/${mongo_db}`, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

// Check Mongo connection
if(!db)
    console.log("Error connecting Mongo. Have you started Mongo server?");
else
    console.log(`MongoDb ready on ${mongo_server}:${mongo_port}/${mongo_db}`);

// Enable API Posts
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Define api routes
app.use('/api', apiMessages);

// Configure Socket-IO
const io = new IO(app);
io.start();

// Start the MQTT Broker
const broker = new Broker(io);
broker.start();
