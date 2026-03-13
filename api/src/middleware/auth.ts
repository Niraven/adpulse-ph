import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "adpulse-dev-secret-change-in-production"

export interface AuthRequest extends Request {
  userId?: string
  fbAccessToken?: string
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization token" })
  }

  try {
    const token = authHeader.slice(7)
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; fbAccessToken: string }
    req.userId = decoded.userId
    req.fbAccessToken = decoded.fbAccessToken
    next()
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

export function generateToken(userId: string, fbAccessToken: string): string {
  return jwt.sign({ userId, fbAccessToken }, JWT_SECRET, { expiresIn: "7d" })
}
