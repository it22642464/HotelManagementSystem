// models/Feedback.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: {
        type: String,
        required: true
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
        type: Number, // Add a new field for the rating
        required: true,
        min: 1, // Minimum value of 1
        max: 5  // Maximum value of 5
    }
}
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
