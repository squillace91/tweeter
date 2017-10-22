"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    console.log('active sessions: ',req.session);
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        const response = {
          tweets:tweets,
          session: req.session
        };
        res.json(response);
      }
    });
  });

  tweetsRoutes.put("/likes/:id", function(req, res) {
    const tweetId = req.params.id;
    const userId = req.session.user_id;
    DataHelpers.likeTweet(tweetId,userId, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).send();
      }
    });
  });

  tweetsRoutes.put("/dislikes/:id", function(req, res) {
    const tweetId = req.params.id;
    const userId = req.session.user_id;
    DataHelpers.dislikeTweet(tweetId,userId, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).send();
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    user.name = req.session.username;
    user.handle = '@' + req.session.username;
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0,
      likedBy: []
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
