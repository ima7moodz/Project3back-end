const express = require("express")
const Booking = require("../models/Booking")
const router = express.Router()
// Book a class
router.post("/", async (req, res) => {
  const { role, user_id, class_id } = req.body
  if (!role || !user_id || !class_id)
    return res.status(400).json({ message: "Missing required fields" })
  if (role !== "regular")
    return res
      .status(403)
      .json({ message: "Only regular users can book classes" })
  try {
    const booking = new Booking({ user_id, class_id })
    await booking.save()
    res.status(201).json(booking)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
// Get user bookings
router.get("/", async (req, res) => {
  const { user_id } = req.query // Pass user ID in query parameters
  if (!user_id) return res.status(400).json({ message: "Missing user ID" })
  try {
    const bookings = await Booking.find({ user_id }).populate("class_id")
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
module.exports = router
