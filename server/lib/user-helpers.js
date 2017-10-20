"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const mongo = require('mongodb');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    createNewUser: function(newUser, callback) {
      db.collection("users").ensureIndex({username:1},{unique:true});
      db.collection("users").insertOne(newUser,callback);
    },

    // Get all tweets in `db`, sorted by newest first
    authenticate: function(user, callback) {
      // TODO return true if user exists
      db.collection("users").find(user).toArray(callback);
    },

  };
}
