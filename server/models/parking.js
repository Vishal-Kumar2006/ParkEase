const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    image: { type: String, default : "https://www.newdelhiairport.in/media/2011/premium-lane-parking.jpg"},
    location: { type: String, required: true },
    totalSlots: { type: Number, required: true },
    availableSlots: { type: Number, required: true },
    pricePerHour: { type: Number, required: true },
    isOpen: { type: Boolean, default: true },
    isElectric: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parking', parkingSchema);
