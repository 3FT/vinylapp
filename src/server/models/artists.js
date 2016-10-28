var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    country: {
        type: String
    }
});

mongoose.model('Artist', artistSchema);