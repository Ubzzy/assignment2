var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('home', {title: 'My Home Page', page:'home'});
});

/* GET Home page. */
router.get('/home', function(req, res, next) {
  res.render('home', {title: 'My Home Page', page:'home'});
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', {title: 'About Me', page:'about'});
});

/* GET Products page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', {title: 'My Projects', page:'projects'});
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', {title: 'My Services', page:'services'});
});

/* GET Contact Us page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {title: 'Contact Me', page:'contact'});
});

module.exports = router;
