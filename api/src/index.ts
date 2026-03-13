import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { authRouter } from "./routes/auth"
import { accountsRouter } from "./routes/accounts"
import { exportRouter } from "./routes/export"
import { paymentsRouter } from "./routes/payments"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }))
app.use(express.json())

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", version: "1.0.0", timestamp: new Date().toISOString() })
})

// Routes
app.use("/api/auth", authRouter)
app.use("/api/accounts", accountsRouter)
app.use("/api/export", exportRouter)
app.use("/api/payments", paymentsRouter)

app.listen(PORT, () => {
  console.log(`AdPulse API running on port ${PORT}`)
})
