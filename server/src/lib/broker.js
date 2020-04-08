
import 'dotenv/config';
import Message from '../models/message';
import mosca from 'mosca';
const { StringDecoder } = require('string_decoder');

class Broker {
  constructor() {
    // this.url = `mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
    // this.dbName = process.env.MONGO_DATABASE;
  }

  start() {
    // MQTT incoming
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

      console.log('Published', packet.topic, "Response is:", response);

      var message = new Message();
      message.topic = packet.topic;
      message.message = response;
      message.save();
    })

    // fired when a client connects
    server.on('clientConnected', function(client) {
      console.log('Client Connected:', client.id);
    });

    // fired when a client disconnects
    server.on('clientDisconnected', function(client) {
      console.log('Client Disconnected:', client.id);
    });
  }
}

export default Broker;
