'use strict';

const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/tweetr';

const mongoConnect = {
  connect: function() {
    return MongoClient.connect(MONGODB_URI, (err, db) => {
      if(err) {
        console.error(`Failed to Connect: ${MONGODB_URI}`);
        throw err;
      }
      console.log(`Connected to MongoDB: ${MONGODB_URI}`);
      // console.log(db)
      mongoConnect.db = db;
    });
  }
  // db.close();
}


module.exports = mongoConnect;
