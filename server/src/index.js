import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import axios from "axios";
import * as http from 'http';

// import mosca from 'mosca';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Broker from './lib/broker';

// import Message from './models/message';
let apiMessages = require("./routes/message");

// const { StringDecoder } = require('string_decoder');

let app = express();
const port = process.env.API_PORT || 8080;

// app.get('/', (req, res) => res.send('Hello World with Express'));
app.listen(port, function () {
  console.log("Running Nmea-Visualiser on port " + port);
});

// Enable API Posts
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Mongoose and Mongodb connection
console.log("SERVER", process.env.MONGO_SERVER)
const mongo_server=process.env.MONGO_SERVER
const mongo_db=process.env.MONGO_DATABASE
mongoose.connect(`mongodb://${mongo_server}/${mongo_db}`, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

// Check if it worked
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Define api routes
app.use('/api', apiMessages)

// Start the MQTT Broker
const broker = new Broker();
broker.start();




// // MQTT incoming
// var mqttSettings = {
//   port: parseInt(process.env.MQTT_PORT)
// }

// var server = new mosca.Server(mqttSettings);

// server.on('ready', function(){
//   console.log(`MQTT broker ready on port ${process.env.MQTT_PORT}`);
// });

// // fired when a message is received
// server.on('published', function(packet, client) {
//   const decoder = new StringDecoder('utf8');
//   const response = decoder.write(packet.payload);

//   console.log('Published', packet.topic, "Response is:", response);

//   var message = new Message();
//   message.topic = packet.topic;
//   message.message = response;
//   message.save();
// })

// // fired when a client connects
// server.on('clientConnected', function(client) {
//   console.log('Client Connected:', client.id);
// });

// // fired when a client disconnects
// server.on('clientDisconnected', function(client) {
//   console.log('Client Disconnected:', client.id);
// });
