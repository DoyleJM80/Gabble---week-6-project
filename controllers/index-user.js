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
    let context = {
      loggedIn: true,
      name: req.session.username,
      signedIn: true,
      loggedInUser: req.session.userId,
      modelArray: []
    };
    models.Gab.findAll({
      include: [
        {
          model: models.User,
          as: 'users'
        }, 'UserLikes'],
      order: [['createdAt', 'DESC']]
    }).then((gabs) => {
      context.model = gabs;
      res.render('index', context);
    });
  },
  deleteGab: (req, res) => {
    models.Gab.destroy(
        {
        where: { id: req.params.id, user_id: req.session.userId}
      }).then(function() {
        res.redirect('/');
      });
    // let id = req.params.id;
    // models.Like.destroy({
    //   where: {
    //     gab_id: req.params.id
    //   }
    // }).then(() => {
    //   models.Gab.destroy({
    //     where: {
    //       id: req.params.id
    //     }
    //   }).then(() => {
    //     res.redirect('/');
    //   });
    // });
  },
  likeGab: (req, res) => {
    models.Gab.findOne(
      {
        where: {id: req.params.id},
        include: [{
            model: models.User,
            as: 'users'
          }],
      }).then((gab) => {
        gab.addUserLikes(req.session.userId);
        res.redirect('/');
      });
  },
  logout: (req, res) => {
    req.session.username = '';
    req.session.userId = '';
    res.redirect('/welcome');
  }
};
