var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    _id: String,
    style: {
        type: String,
        enum : ['rock','blues','funk']
    },
    addedBy: String,
    dateAdded: Number
});

mongoose.model('Artist', artistSchema);