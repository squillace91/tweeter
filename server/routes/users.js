"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const usersRoutes  = express.Router();

module.exports = function(UserHelpers) {

  usersRoutes.post("/new", function(req, res) {
    const user = {
      username: req.body.username,
      password: req.body.password
    }
    UserHelpers.createNewUser(user, (err) => {
      if (err) {
        res.status(200).send({ error: err.message });
        // res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  usersRoutes.post("/login", function(req, res) {
    const checkUser = {
      username: req.body.username,
      password: req.body.password
    }
    UserHelpers.authenticate(checkUser, (err, user) => {
      console.log('autenticate');
      if (err) {
        console.log('error: ',user);
        res.status(200).send({ error: err.message });
        // res.status(500).json({ error: err.message });
      } else {
        console.log('data: ',user);
        res.status(200).send(user);
      }
    });
  });

  return usersRoutes;

}
