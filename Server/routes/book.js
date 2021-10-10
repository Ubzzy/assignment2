let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Book = require('../../models/book');

// Get Route for the book list page - READ Operation
router.get('/', (req,res,next) => {
    Book.find((err, BookList) => {
        if(err)
        {
            return console.error(err);
        }else{
            res.render('book', {title: 'Book List', BookList: BookList});
        }
    });
});

module.exports = router;