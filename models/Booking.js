const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  booking_date: { type: Date, default: Date.now },
})
module.exports = mongoose.model("Booking", bookingSchema)
