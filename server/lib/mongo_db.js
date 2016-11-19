'use strict';

const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/tweetr';

const mongoConnect = {
  connect: function(callback) {
    return MongoClient.connect(MONGODB_URI, (err, db) => {
      if(err) {
        console.error(`Failed to Connect: ${MONGODB_URI}`);
        throw err;
      }
      console.log(`Connected to MongoDB: ${MONGODB_URI}`);
      mongoConnect.db = db;
      callback(db);
    });
  }
}


module.exports = mongoConnect;
