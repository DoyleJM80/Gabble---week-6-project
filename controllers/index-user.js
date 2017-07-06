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
    models.Gab.findAll({
      include: [
        {
          model: models.User,
          as: 'users'
        }
      ]
    }).then((gabs) => {
      let context = {
        model: gabs,
        sessionName: req.session.username
      };
      res.render('index', context);
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
