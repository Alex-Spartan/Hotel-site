const mongoose = require('mongoose');


const accomodationSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true, unique: true},
    location: {type: String, required: true },
    landmark: {type: String, unique: true },
    description: String,
    photos: [String],
    amenities: [String],
    extraInfo: String,
    checkIn: Date,
    checkOut: Date,
    members: Number,
    ratings: {type: Number, required: true, default: 0},
})

const Place = mongoose.model('Place', accomodationSchema);
module.exports = Place;