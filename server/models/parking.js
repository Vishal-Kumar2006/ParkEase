const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    name: { type: String, required: true },

    location: {
        address: { type: String, required: true },
        coordinates: { type: [Number], required: true, index: '2dsphere' } 
    },
    totalSlots: { type: Number, required: true },
    availableSlots: { type: Number, required: true },
    pricePerHour: { type: Number, required: true },
    isOpen: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Parking = mongoose.model('Parking', parkingSchema);
module.exports = Parking;
