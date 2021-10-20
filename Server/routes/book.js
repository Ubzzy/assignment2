let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Book = require('../models/book');

let bookController = require('../controllers/book')

// Get Route for the book list page - READ Operation
router.get('/', bookController.displayBookList);

// GET Route for displaying the add page - CREATE Operation
router.get('/add', bookController.displayAddPage);

// POST Route for processing the add page - CREATE Operation
router.post('/add', bookController.processAddPage);

// GET Route for displaying the edit page - UPDATE Operation
router.get('/edit/:id', bookController.displayEditPage);

// POST Route for processing the edit page - UPDATE Operation
router.post('/edit/:id', bookController.processEditPage);

// GET to perform Deletion - DELETE Operation
router.get('/delete/:id', bookController.performDelete);

module.exports = router;