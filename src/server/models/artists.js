var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    _id: String,
    style: {
        type: String,
        enum : ['rock','blues','funk']
    },
    addedBy: String,
    dateAdded: Number,
    images: [String]
});

mongoose.model('Artist', artistSchema);