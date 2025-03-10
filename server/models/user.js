const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
//     photo: { type: String, required: true, default:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" },
//     phone: { type: String, required: true },
//     role: { type: String, enum: ['user', 'admin'], default: 'user' },

//     // Parking spots booked by user
//     bookings: [{
//         parkingSpotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking' },
//         bookingTime: { type: Date, default: Date.now }, 
//         duration: { type: Number, required: true }, // in hours
//         status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' }
//     }],

//     // Parking spots owned by admin
//     parkings: [{
//         parkingSpotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking' }
//     }],

//     createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

