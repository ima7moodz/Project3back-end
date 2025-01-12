const express = require("express")
const Class = require("../models/Class")
const User = require("../models/User")
const { verifyToken } = require("../middleware/jwtUtils")
const router = express.Router()

// Create class
router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res
        .status(403)
        .json({ error: "Only instructors can create classes." })
    }

    req.body.instructor_id = req.user._id

    const fitnessClass = await Class.create(req.body)
    res.status(201).json(fitnessClass)
  } catch (error) {
    console.error("Error creating class:", error)
    res.status(400).json({ error: error.message })
  }
})

// Get all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find()
    res.status(200).json(classes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get class by ID
router.get("/:classId", async (req, res) => {
  try {
    const fitnessClass = await Class.findById(req.params.classId)
    if (!fitnessClass) {
      return res.status(404).json({ error: "Class not found." })
    }
    res.status(200).json(fitnessClass)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update class
router.put("/:classId", verifyToken, async (req, res) => {
  try {
    const fitnessClass = await Class.findById(req.params.classId)
    if (!fitnessClass) {
      return res.status(404).json({ error: "Class not found." })
    }

    if (
      req.user.role === "instructor" &&
      fitnessClass.instructor_id.toString() === req.user._id
    ) {
      const updatedClass = await Class.findByIdAndUpdate(
        req.params.classId,
        req.body,
        { new: true }
      )
      return res.status(200).json(updatedClass)
    }

    return res.status(403).json({ error: "Access denied." })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete class
router.delete("/:classId", verifyToken, async (req, res) => {
  try {
    const fitnessClass = await Class.findById(req.params.classId)
    if (!fitnessClass) {
      return res.status(404).json({ error: "Class not found." })
    }

    if (
      req.user.role === "instructor" &&
      fitnessClass.instructor_id.toString() === req.user._id
    ) {
      await Class.findByIdAndDelete(req.params.classId)
      return res.status(200).json({ message: "Class deleted successfully." })
    }

    return res.status(403).json({ error: "Access denied." })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
