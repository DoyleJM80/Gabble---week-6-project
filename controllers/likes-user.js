const express = require ('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

module.exports = {
  renderLikes: (req, res) => {
    models.Gab.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: models.User,
        as: 'users'
      }]
      // ,
      // include: [
      //   {
      //     model: models.User,
      //     as: 'users'
      //   }
      // ]
    }).then((gab) => {
      let context = {
        model: gab
      };
      res.render('likes', context);
    });
  }
};
