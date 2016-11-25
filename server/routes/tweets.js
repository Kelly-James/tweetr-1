"use strict";

const userHelper    = require("../lib/util/user-helper"); // can also use ES6 imports here, but this is fine
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", (req, res) => {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        // this err response is ok but sometimes its better
        // to handle various errors and define your own and also don't give
        // away too much info about the structure of backend
        // which can happen if you just pass back the error
        // that your db throws
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", (req, res) => {

    const { text, user } = req.body;

    if (!text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return; // is this necessary?
    }

    const tweet = {
      user: (user || userHelper.generateRandomUser()),
      content: { text },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, err => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;
}
