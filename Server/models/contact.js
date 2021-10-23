let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema
(
    {
        organization : String,
        name: String,
        email: String,
        phone: Number
    },
    {
        collection: "contacts"
    }
);

module.exports = mongoose.model('Contact', contactModel)