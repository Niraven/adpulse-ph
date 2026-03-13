import { Router, Request, Response } from "express"
import { generateToken } from "../middleware/auth"

export const authRouter = Router()

// Exchange Facebook access token for AdPulse JWT
authRouter.post("/login", async (req: Request, res: Response) => {
  const { fbAccessToken } = req.body

  if (!fbAccessToken) {
    return res.status(400).json({ error: "Facebook access token required" })
  }

  try {
    // Verify the FB token by calling the Graph API
    const fbResponse = await fetch(
      `https://graph.facebook.com/v21.0/me?fields=id,name,email,picture&access_token=${encodeURIComponent(fbAccessToken)}`
    )

    if (!fbResponse.ok) {
      return res.status(401).json({ error: "Invalid Facebook access token" })
    }

    const fbUser: any = await fbResponse.json()
    const token = generateToken(fbUser.id, fbAccessToken)

    res.json({
      token,
      user: {
        id: fbUser.id,
        name: fbUser.name,
        email: fbUser.email,
        picture: fbUser.picture?.data?.url
      }
    })
  } catch (err: any) {
    res.status(500).json({ error: "Authentication failed" })
  }
})

authRouter.post("/refresh", async (req: Request, res: Response) => {
  // Token refresh logic would go here
  res.json({ message: "Token refresh not yet implemented" })
})
