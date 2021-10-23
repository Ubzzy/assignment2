let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// connect to our Book Model
let Book = require('../models/book');

let bookController = require('../controllers/book')

// Get Route for the book list page - READ Operation
router.get('/', bookController.displayBookList);

// GET Route for displaying the add page - CREATE Operation
router.get('/add', requireAuth, bookController.displayAddPage);

// POST Route for processing the add page - CREATE Operation
router.post('/add', requireAuth, bookController.processAddPage);

// GET Route for displaying the edit page - UPDATE Operation
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

// POST Route for processing the edit page - UPDATE Operation
router.post('/edit/:id', requireAuth, bookController.processEditPage);

// GET to perform Deletion - DELETE Operation
router.get('/delete/:id', requireAuth, bookController.performDelete);

module.exports = router;