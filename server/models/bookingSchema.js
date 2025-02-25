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

// Total Amount ko auto-calculate karne ke liye middleware
bookingSchema.pre('save', async function (next) {
    if (this.startTime && this.endTime) {
        const parking = await mongoose.model('Parking').findById(this.parking);
        const durationHours = (this.endTime - this.startTime) / (1000 * 60 * 60);
        this.totalAmount = durationHours * parking.pricePerHour;
    }
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;