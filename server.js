const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

const { verifyToken } = require("./middleware/jwtUtils")

const authRouter = require("./controllers/auth")
const userRouter = require("./controllers/user")
const classRouter = require("./controllers/class")
const bookingRouter = require("./controllers/booking")

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
const PORT = process.env.PORT
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

// Routes go here
app.use("/auth", authRouter)
app.use("/user", verifyToken, userRouter)
app.use("/class", classRouter)
app.use("/booking", verifyToken, bookingRouter)

app.listen(PORT, () => {
  console.log("The express app is ready!", PORT)
})
