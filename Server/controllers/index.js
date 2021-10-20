let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req,res,next) => {
    res.render('home', {title: 'My Home Page',page:'home'})
}

module.exports.displayAboutPage = (req,res,next) => {
    res.render('about', {title: 'About Me', page:'about'})
}

module.exports.displayProjectsPage = (req,res,next) => {
    res.render('projects', {title: 'My Projects',page:'projects'})
}

module.exports.displayServicesPage = (req,res,next) => {
    res.render('services', {title: 'My Services',page:'Services'})
}

module.exports.displayContactPage = (req,res,next) => {
    res.render('contact', {title: 'Contact Me',page:'contact'})
}