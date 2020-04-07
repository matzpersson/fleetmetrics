import MongoClient from 'mongodb';
import 'dotenv/config';

class NmeaMongo {
  constructor() {
    this.url = `mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
    this.dbName = process.env.MONGO_DATABASE;
  }

  load() {

    MongoClient.connect(this.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(process.env.MONGO_DATABASE);
      var myobj = { name: "Company Inc", address: "Highway 37" };
      dbo.collection("vessels").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted here");
        db.close();
      });
      dbo.collection("vessels").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.name);
        db.close();
      });
    
    });
  }
}

export default NmeaMongo;