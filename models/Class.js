const mongoose = require("mongoose")
const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date_time: { type: Date, required: true },
  location: String,
  category: String,
  max_participants: {
    type: Number,
    default: 10,
  },
  current_participants: {
    type: Number,
    default: 0,
  },
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})
module.exports = mongoose.model("Class", classSchema)
