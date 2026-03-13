import { Router, Response } from "express"
import { authMiddleware, AuthRequest } from "../middleware/auth"

export const accountsRouter = Router()

accountsRouter.use(authMiddleware)

// Get all ad accounts
accountsRouter.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const fbResponse = await fetch(
      `https://graph.facebook.com/v21.0/me/adaccounts?fields=account_id,name,account_status,currency,spend_cap,amount_spent,balance,created_time,timezone_name,business&limit=500&access_token=${encodeURIComponent(req.fbAccessToken!)}`
    )
    const data: any = await fbResponse.json()

    if (data.error) {
      return res.status(400).json({ error: data.error.message })
    }

    res.json({ accounts: data.data || [], paging: data.paging })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch ad accounts" })
  }
})

// Get business managers
accountsRouter.get("/business-managers", async (req: AuthRequest, res: Response) => {
  try {
    const fbResponse = await fetch(
      `https://graph.facebook.com/v21.0/me/businesses?fields=id,name,primary_page,created_time&limit=100&access_token=${encodeURIComponent(req.fbAccessToken!)}`
    )
    const data: any = await fbResponse.json()

    if (data.error) {
      return res.status(400).json({ error: data.error.message })
    }

    res.json({ businessManagers: data.data || [] })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch business managers" })
  }
})

// Get fan pages
accountsRouter.get("/pages", async (req: AuthRequest, res: Response) => {
  try {
    const fbResponse = await fetch(
      `https://graph.facebook.com/v21.0/me/accounts?fields=id,name,category,fan_count,followers_count,is_published,link&limit=500&access_token=${encodeURIComponent(req.fbAccessToken!)}`
    )
    const data: any = await fbResponse.json()

    if (data.error) {
      return res.status(400).json({ error: data.error.message })
    }

    res.json({ pages: data.data || [] })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch fan pages" })
  }
})

// Get account health summary
accountsRouter.get("/health", async (req: AuthRequest, res: Response) => {
  try {
    const fbResponse = await fetch(
      `https://graph.facebook.com/v21.0/me/adaccounts?fields=account_id,name,account_status,spend_cap,amount_spent&limit=500&access_token=${encodeURIComponent(req.fbAccessToken!)}`
    )
    const data: any = await fbResponse.json()

    const accounts = data.data || []
    const summary = {
      total: accounts.length,
      active: accounts.filter((a: any) => a.account_status === 1).length,
      disabled: accounts.filter((a: any) => a.account_status === 2).length,
      inReview: accounts.filter((a: any) => [3, 7, 8, 9].includes(a.account_status)).length,
      accounts: accounts.map((a: any) => ({
        accountId: a.account_id,
        name: a.name,
        status: a.account_status,
        spendCap: a.spend_cap ? parseFloat(a.spend_cap) / 100 : null,
        amountSpent: a.amount_spent ? parseFloat(a.amount_spent) / 100 : 0,
        utilizationPct: a.spend_cap ? Math.min((parseFloat(a.amount_spent) / parseFloat(a.spend_cap)) * 100, 100) : null
      }))
    }

    res.json(summary)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch health data" })
  }
})
