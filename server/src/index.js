import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import axios from "axios";
import * as http from 'http';

var mosca = require('mosca');

const { StringDecoder } = require('string_decoder');

// MQTT incoming
console.log()
var mqttSettings = {
  port: parseInt(process.env.MQTT_PORT)
}

var server = new mosca.Server(mqttSettings);

server.on('ready', function(){
  console.log(`MQTT broker ready on port ${process.env.MQTT_PORT}`);
});

// fired when a message is received
server.on('published', function(packet, client) {
  const decoder = new StringDecoder('utf8');
  const response = decoder.write(packet.payload);

  // const buf = Buffer.from(packet.payload);
  // for (const b of buf) {
  //   console.log(b);
  // }
  console.log('Published',packet.topic, "Response is:", response);
})

// fired when a client connects
server.on('clientConnected', function(client) {
  console.log('Client Connected:', client.id);
});

// fired when a client disconnects
server.on('clientDisconnected', function(client) {
  console.log('Client Disconnected:', client.id);
});

// Mongodb
import MongoClient from 'mongodb';

// var MongoClient = require('mongodb').MongoClient;
// var url = `mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
// var dbName = process.env.MONGO_DATABASE;
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db(dbName);
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("vessels").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted here");
//     db.close();
//   });
//   dbo.collection("vessels").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });

// });

import NmeaMongo from './lib/nmea-mongo.js'
const mgo = new NmeaMongo();
mgo.load();
