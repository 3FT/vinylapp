var mongoose = require('mongoose');

var vinylSchema = new mongoose.Schema({
    album: {
        type: String,
        unique: true,
        required: true
    },
    artist_id: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    images: {
        frontCover: String,
        backCover: String
    },
    addedBy: {
        type: String
    },
    dateAdded: {
        type: Number
    },
    tracklist : [{
        title : String,
        length : Number
    }],
    reviews : [{
        stars: Number,
        body: String,
        author: String,
        createdOn: Number
    }],
    averageRating: {
        type: Number
    }
});


mongoose.model('Vinyl', vinylSchema);
