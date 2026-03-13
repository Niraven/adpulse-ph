import { Router, Request, Response } from "express"
import { authMiddleware, AuthRequest } from "../middleware/auth"

export const paymentsRouter = Router()

const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY || ""
const PAYMONGO_BASE = "https://api.paymongo.com/v1"

function paymongoHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET + ":").toString("base64")}`,
  }
}

const PLAN_PRICES: Record<string, { amount: number; name: string }> = {
  starter: { amount: 49900, name: "AdPulse Starter" },   // 499.00 PHP in centavos
  pro: { amount: 149900, name: "AdPulse Pro" },           // 1,499.00 PHP
  agency: { amount: 399900, name: "AdPulse Agency" },     // 3,999.00 PHP
}

// Create a checkout session for a subscription
paymentsRouter.post("/checkout", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { plan } = req.body

  if (!plan || !PLAN_PRICES[plan]) {
    return res.status(400).json({ error: "Invalid plan. Choose: starter, pro, or agency" })
  }

  if (!PAYMONGO_SECRET) {
    return res.status(500).json({ error: "Payment system not configured" })
  }

  const { amount, name } = PLAN_PRICES[plan]

  try {
    const response = await fetch(`${PAYMONGO_BASE}/checkout_sessions`, {
      method: "POST",
      headers: paymongoHeaders(),
      body: JSON.stringify({
        data: {
          attributes: {
            send_email_receipt: true,
            show_description: true,
            show_line_items: true,
            description: `${name} - Monthly Subscription`,
            line_items: [
              {
                currency: "PHP",
                amount,
                name,
                quantity: 1,
                description: "Monthly subscription",
              },
            ],
            payment_method_types: [
              "gcash",
              "grab_pay",
              "paymaya",
              "card",
              "dob",
              "billease",
            ],
            success_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/dashboard?payment=success&plan=${plan}`,
            cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/dashboard?payment=cancelled`,
            metadata: {
              user_id: req.userId,
              plan,
            },
          },
        },
      }),
    })

    const data: any = await response.json()

    if (data.errors) {
      return res.status(400).json({ error: data.errors[0]?.detail || "Payment error" })
    }

    res.json({
      checkoutUrl: data.data.attributes.checkout_url,
      checkoutId: data.data.id,
      plan,
      amount: amount / 100,
      currency: "PHP",
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create checkout session" })
  }
})

// PayMongo webhook handler for payment events
paymentsRouter.post("/webhook", async (req: Request, res: Response) => {
  const event = req.body?.data

  if (!event) {
    return res.status(400).json({ error: "Invalid webhook payload" })
  }

  const eventType = event.attributes?.type
  const paymentData = event.attributes?.data

  switch (eventType) {
    case "checkout_session.payment.paid": {
      const metadata = paymentData?.attributes?.metadata
      const userId = metadata?.user_id
      const plan = metadata?.plan

      // In production: update user's subscription in your database
      console.log(`Payment successful: user=${userId}, plan=${plan}`)
      console.log(`Payment ID: ${paymentData?.id}`)
      console.log(`Amount: ${paymentData?.attributes?.amount / 100} PHP`)

      // TODO: Store subscription status in database
      // await db.users.update({ id: userId }, { plan, subscribedAt: new Date() })

      break
    }

    case "payment.failed": {
      console.log(`Payment failed: ${paymentData?.id}`)
      break
    }

    default:
      console.log(`Unhandled webhook event: ${eventType}`)
  }

  res.json({ received: true })
})

// Get payment/subscription status (stub — implement with your database)
paymentsRouter.get("/status", authMiddleware, async (req: AuthRequest, res: Response) => {
  // TODO: Look up subscription in database
  // const subscription = await db.subscriptions.findOne({ userId: req.userId })

  res.json({
    plan: "free",
    status: "active",
    message: "Connect a database to track subscription status",
  })
})

// List available plans
paymentsRouter.get("/plans", (_req: Request, res: Response) => {
  res.json({
    plans: [
      {
        id: "free",
        name: "Free",
        price: 0,
        currency: "PHP",
        features: ["Up to 5 ad accounts", "Basic status checker", "Search & sort", "Single BM view"],
      },
      {
        id: "starter",
        name: "Starter",
        price: 499,
        currency: "PHP",
        features: ["Up to 50 ad accounts", "CSV/Excel exports", "Health alerts", "Web dashboard", "Email support"],
      },
      {
        id: "pro",
        name: "Pro",
        price: 1499,
        currency: "PHP",
        popular: true,
        features: ["Unlimited accounts", "Bulk actions", "Advanced analytics", "API access", "Team seats (3)", "Priority support"],
      },
      {
        id: "agency",
        name: "Agency",
        price: 3999,
        currency: "PHP",
        features: ["Everything in Pro", "Unlimited team seats", "Custom reports", "White-label option", "Dedicated support", "Onboarding call"],
      },
    ],
  })
})
