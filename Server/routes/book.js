let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Book = require('../models/book');

// Get Route for the book list page - READ Operation
router.get('/', (req,res,next) => {
    Book.find((err, BookList) => {
        if(err)
        {
            return console.error(err);
        }else{
            res.render('book/list', {title: 'Book List', BookList: BookList});
        }
    });
});

// GET Route for displaying the add page - CREATE Operation
router.get('/add', (req,res,next)=>{
    res.render('book/add', {title: 'Add Book'});
});

// POST Route for processing the add page - CREATE Operation
router.post('/add', (req,res,next)=>{
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "price": req.body.price,
    });

    Book.create(newBook, (err, Book)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }else
        {
            // refresh book list  after add
            res.redirect('/book-list')
        }
    });
    
});

// GET Route for displaying the edit page - UPDATE Operation
router.get('/edit/:id', (req,res,next)=>{
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }else
        {
            // show the edit view
            res.render('book/edit',{title: 'Edit Book', book: bookToEdit})
        }
    });
});
// POST Route for processing the edit page - UPDATE Operation
router.post('/edit/:id', (req,res,next)=>{
    let id = req.params.id;

    let updateBook = Book({
        "_id": id, 
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "price": req.body.price,
    });

    Book.updateOne({_id: id}, updateBook , (err) => {
        if(err)
        {
            console.log(err);
            res.end(err)
        }else
        {
            // refresh book list  after add
            res.redirect('/book-list')
        }
    });
});

// GET to perform Deletion - DELETE Operation
router.get('/delete/:id', (req,res,next)=>{
    let id = req.params.id;

    Book.remove({_id: id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err)
        }else
        {
            // refresh book list  after add
            res.redirect('/book-list')
        }
    });
});

module.exports = router;