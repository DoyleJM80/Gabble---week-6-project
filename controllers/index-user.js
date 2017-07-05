const express = require ('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

module.exports = {
  renderIndex: (req, res) => {
    models.Gab.findAll().then((gabs) => {
      res.render('index', {model: gabs});
    });
  },
  deleteGab: (req, res) => {
    let id = req.params.id;
    models.Gab.destroy({
      where: {
        id: id
      }
    }).then(() => {
      res.redirect('/');
    });
  },
  logout: (req, res) => {
    req.session.username = '';
    req.session.userId = '';
    res.redirect('/welcome');
  }
};
// renderWelcome: (req, res) => {
//   res.render('welcome', {});
// }
