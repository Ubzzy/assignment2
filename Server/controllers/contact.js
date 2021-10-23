let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// reference to the model
let Contact = require('../models/contact')

module.exports.displayContactList = (req,res,next) => {
    Contact.find((err, ContactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('book/list', {title: 'Business Contacts', ContactList: ContactList, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req,res,next)=>{
    res.render('book/add', {title: 'Add Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req,res,next)=>{
    let newContact = Contact({
        "organization": req.body.organization,
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
    });

    Contact.create(newContact, (err, Contact)=>{
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
    
}

module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;

    Contact.findById(id, (err, ContactToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }else
        {
            // show the edit view
            res.render('book/edit',{title: 'Edit Contact', Contact: ContactToEdit, displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id;

    let updateContact = Contact({
        "_id": id, 
        "organization": req.body.organization,
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
    });

    Contact.updateOne({_id: id}, updateContact , (err) => {
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
}

module.exports.performDelete = (req,res,next)=>{
    let id = req.params.id;

    Contact.deleteOne({_id: id}, (err) =>{
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
}