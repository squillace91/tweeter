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
    UserHelpers.createNewUser(user, (err, user) => {
      if (err) {
        res.status(200).send({ error: err.message });
        // res.status(500).json({ error: err.message });
      } else {
        req.session.user_id = user.ops[0]._id;
        req.session.username = user.ops[0].username;
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
        req.session.user_id = user[0]._id;
        req.session.username = user[0].username;
        res.status(200).send(user);
      }
    });
  });

  usersRoutes.post("/logout", function(req, res) {
    req.session = null;
    res.status(200).send();
  });

  return usersRoutes;

}
