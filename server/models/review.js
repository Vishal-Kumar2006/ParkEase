const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref:"User", require: true},
    parkingId : {type : mongoose.Schema.Types.ObjectId, ref:"Parking", require: true},
    review:{type:String},
    rating:{type:Number},
})

module.exports = mongoose.model("Review", reviewSchema);