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
    models.Like.findAll({
      where: {
        gab_id: req.params.id
      }
      // ,
      // include: [
      //   {
      //     model: models.User,
      //     as: 'users'
      //   }
      // ]
    }).then((likes) => {
      let context = {
        model: likes,
      };
      res.render('likes', context);
    });
  }
};
