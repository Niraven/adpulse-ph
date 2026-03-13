import { Router, Response } from "express"
import { authMiddleware, AuthRequest } from "../middleware/auth"

export const exportRouter = Router()

exportRouter.use(authMiddleware)

// Export ad accounts to CSV
exportRouter.get("/csv", async (req: AuthRequest, res: Response) => {
  try {
    const fbResponse = await fetch(
      `https://graph.facebook.com/v21.0/me/adaccounts?fields=account_id,name,account_status,currency,spend_cap,amount_spent,balance,created_time,timezone_name,business&limit=500&access_token=${encodeURIComponent(req.fbAccessToken!)}`
    )
    const data: any = await fbResponse.json()

    const statusMap: Record<number, string> = {
      1: "Active", 2: "Disabled", 3: "Unsettled",
      7: "Pending Risk Review", 8: "Pending Settlement", 9: "In Grace Period"
    }

    const headers = ["Account ID", "Name", "Status", "Currency", "Amount Spent", "Balance", "Spend Cap", "Business Manager", "Timezone", "Created"]
    const rows = (data.data || []).map((acc: any) => [
      acc.account_id,
      `"${(acc.name || "").replace(/"/g, '""')}"`,
      statusMap[acc.account_status] || "Unknown",
      acc.currency || "",
      acc.amount_spent ? (parseFloat(acc.amount_spent) / 100).toFixed(2) : "0",
      acc.balance ? (parseFloat(acc.balance) / 100).toFixed(2) : "0",
      acc.spend_cap ? (parseFloat(acc.spend_cap) / 100).toFixed(2) : "N/A",
      acc.business?.name || "N/A",
      acc.timezone_name || "",
      acc.created_time || ""
    ])

    const csv = [headers.join(","), ...rows.map((r: string[]) => r.join(","))].join("\n")

    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", `attachment; filename=adpulse-export-${new Date().toISOString().slice(0, 10)}.csv`)
    res.send(csv)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to generate export" })
  }
})
