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
    }).then((gab) => {
      gab.getUserLikes().then((result) => {
        let context = {
          model: gab,
          name: req.session.name,
          loggedIn: true,
          signedIn: true,
          likes: []
        };
        for (var i = 0; i < result.length; i++) {
          context.likes.push(result[i].username);
        }
        console.log(context.likes);
        res.render('likes', context);
      });
    });
  }
};
