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
      ],
      order: [['createdAt', 'DESC']]
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
    models.Like.destroy({
      where: {
        gab_id: req.params.id
      }
    }).then(() => {
      models.Gab.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => {
        res.redirect('/');
      });
    });
  },
  likeGab: (req, res) => {
    models.Like.create({
      user_id: req.session.userId,
      gab_id: req.params.id
    }).then((result) => {
      res.redirect('/');
    });
  },
  logout: (req, res) => {
    req.session.username = '';
    req.session.userId = '';
    res.redirect('/welcome');
  }
};
