const express = require ('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('./models');
const welcomeController = require('./controllers/welcome-user');
const gabController = require('./controllers/gab-user');
const indexController = require('./controllers/index-user');
const likesController = require('./controllers/likes-user');

const app = express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
// app.set('layout', 'layout');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator({
  additionalValidators: 'equals'
}));

app.use(session({
  secret: 'Covfefe',
  resave: false,
  saveUninitialized: false
}));

var backToLogin = (req, res, next) => {
  var pathname = parseurl(req).pathname;
  if (!req.session.username && pathname != '/welcome') {
    res.redirect('/welcome');
  } else {
    next();
  }
};

app.get('/', backToLogin, indexController.renderIndex);

app.get('/welcome', welcomeController.renderWelcome);

app.get('/gab', backToLogin, gabController.renderGab);

app.get('/likes/:id', backToLogin, likesController.renderLikes);

app.post('/signup', welcomeController.signupWelcome);

app.post('/signin', welcomeController.signinWelcome);

app.post('/gab', gabController.newGab);

app.post('/delete/:id', indexController.deleteGab);

app.post('/logout', indexController.logout);

app.post('/like/:id', indexController.likeGab);


app.listen(3000, () => {
  console.log('listening');
});
