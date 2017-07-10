const express = require ('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');


module.exports = {
  renderWelcome: (req, res) => {
    models.Gab.findOne({where:{user_id:1}}).then((displayGab) => {
      res.render('welcome', {model: displayGab});
    });

  },
  signupWelcome: (req, res) => {
    models.User.create({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }).then((newUser) => {
      req.session.userId = newUser.id;
    });
    res.redirect('/');
  },
  signinWelcome: (req, res) => {
    let currentUser = req.body.username;
    let currentPassword = req.body.password;
    models.User.findOne({
      where: {
        username: currentUser,
        password: currentPassword
      }
    }).then((user) => {
      req.session.username = user.username;
      req.session.userId = user.id;
      res.redirect('/');
    });
  }
};
