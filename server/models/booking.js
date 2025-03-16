const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parking: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking', required: true },
    slotNumber: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    totalAmount: { type: Number },
    status: { type: String, enum: ['Booked', 'Checked-In', 'Completed', 'Cancelled'], default: 'Booked' }
});


module.exports = mongoose.model('Booking', bookingSchema);