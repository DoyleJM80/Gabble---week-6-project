const express = require ('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

module.exports = {
  renderGab: (req, res) => {
    // models.Gab.findOne({where: {user_id: 1}}).then((displayGab) => {
      // console.log(displayGab);
      res.render('gab', {});
    // });

  },
  newGab: (req, res) => {
    models.Gab.create({
      message: req.body.message,
      user_id: req.session.userId
    }).then(() => {
      res.redirect('/');
    });
  }

};
