// models/Feedback.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: {
        type: String,
        required: true
    },
    date:{
        type: Date,
    },
    email: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    howDidYouHear: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    cleanliness: {
        type: String,
        required: true
    },
    food: {
        type: String,
        required: true
    },
    staff: {
        type: String,
        required: true
    },
    suggestions: {
        type: String
    },
    rating: {
        type: Number, 
        required: true,
        min: 1, 
        max: 5  
    }
}
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
