import type { AdAccount, BusinessManager, FanPage } from "./types"

const GRAPH_API_BASE = "https://graph.facebook.com/v21.0"

async function fbApiCall(endpoint: string, accessToken: string, params: Record<string, string> = {}): Promise<any> {
  const url = new URL(`${GRAPH_API_BASE}${endpoint}`)
  url.searchParams.set("access_token", accessToken)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  const response = await fetch(url.toString())
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.error?.message || `API error: ${response.status}`)
  }
  return response.json()
}

export async function getAdAccounts(accessToken: string): Promise<AdAccount[]> {
  const fields = "account_id,name,account_status,currency,spend_cap,amount_spent,balance,created_time,timezone_id,timezone_name,business"
  const result = await fbApiCall("/me/adaccounts", accessToken, {
    fields,
    limit: "500"
  })

  const statusMap: Record<number, AdAccount["status"]> = {
    1: "ACTIVE",
    2: "DISABLED",
    3: "UNSETTLED",
    7: "PENDING_RISK_REVIEW",
    8: "PENDING_SETTLEMENT",
    9: "IN_GRACE_PERIOD",
    100: "PENDING_RISK_REVIEW",
    101: "ANY_ACTIVE",
    201: "ANY_CLOSED"
  }

  return (result.data || []).map((acc: any) => ({
    id: acc.id,
    name: acc.name || `Account ${acc.account_id}`,
    accountId: acc.account_id,
    status: statusMap[acc.account_status] || "DISABLED",
    currency: acc.currency || "USD",
    spendCap: acc.spend_cap ? parseFloat(acc.spend_cap) / 100 : null,
    amountSpent: acc.amount_spent ? parseFloat(acc.amount_spent) / 100 : 0,
    balance: acc.balance ? parseFloat(acc.balance) / 100 : 0,
    dailyBudget: null,
    businessId: acc.business?.id,
    businessName: acc.business?.name,
    createdTime: acc.created_time,
    timezoneId: acc.timezone_id,
    timezoneName: acc.timezone_name
  }))
}

export async function getBusinessManagers(accessToken: string): Promise<BusinessManager[]> {
  const result = await fbApiCall("/me/businesses", accessToken, {
    fields: "id,name,primary_page,created_time",
    limit: "100"
  })

  const bms: BusinessManager[] = []
  for (const bm of result.data || []) {
    let bmAccounts: AdAccount[] = []
    try {
      const accResult = await fbApiCall(`/${bm.id}/owned_ad_accounts`, accessToken, {
        fields: "account_id,name,account_status,currency,spend_cap,amount_spent,balance",
        limit: "500"
      })
      bmAccounts = (accResult.data || []).map((acc: any) => ({
        id: acc.id,
        name: acc.name || `Account ${acc.account_id}`,
        accountId: acc.account_id,
        status: acc.account_status === 1 ? "ACTIVE" : "DISABLED",
        currency: acc.currency || "USD",
        spendCap: acc.spend_cap ? parseFloat(acc.spend_cap) / 100 : null,
        amountSpent: acc.amount_spent ? parseFloat(acc.amount_spent) / 100 : 0,
        balance: acc.balance ? parseFloat(acc.balance) / 100 : 0,
        dailyBudget: null,
        businessId: bm.id,
        businessName: bm.name,
        createdTime: acc.created_time || "",
        timezoneId: 0,
        timezoneName: ""
      }))
    } catch {}

    bms.push({
      id: bm.id,
      name: bm.name,
      primaryPage: bm.primary_page?.id,
      adAccountCount: bmAccounts.length,
      adAccounts: bmAccounts,
      status: "ACTIVE",
      createdTime: bm.created_time
    })
  }
  return bms
}

export async function getFanPages(accessToken: string): Promise<FanPage[]> {
  const result = await fbApiCall("/me/accounts", accessToken, {
    fields: "id,name,category,fan_count,followers_count,is_published,link",
    limit: "500"
  })

  return (result.data || []).map((page: any) => ({
    id: page.id,
    name: page.name,
    category: page.category || "Uncategorized",
    followers: page.followers_count || 0,
    likes: page.fan_count || 0,
    isPublished: page.is_published ?? true,
    link: page.link || `https://facebook.com/${page.id}`
  }))
}

export async function getUserInfo(accessToken: string) {
  return fbApiCall("/me", accessToken, { fields: "id,name,email,picture" })
}
