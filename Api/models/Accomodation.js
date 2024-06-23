const mongoose = require('mongoose');


const accomodationSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true, unique: true},
    location: {type: String, required: true },
    nearestLandmark: {type: String, required: true, unique: true },
    photos: [String],
    ratings: {type: Number, required: true, default: 0},
    description: String,
    amenities: [String],
    extraInfo: String,
    checkIn: Date,
    checkOut: Date,
    maxGuest: Number,
})

const Place = mongoose.model('Place', accomodationSchema);
module.exports = Place;