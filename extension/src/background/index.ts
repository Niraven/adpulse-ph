import { getAdAccounts, getBusinessManagers, getFanPages, getUserInfo } from "../lib/facebook-api"
import { getAccessToken, setDashboardData, setUserInfo, getDashboardData } from "../lib/storage"
import type { DashboardData } from "../lib/types"

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "REFRESH_DATA") {
    refreshAllData().then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }))
    return true // async response
  }

  if (message.type === "GET_DATA") {
    getDashboardData().then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }))
    return true
  }

  if (message.type === "EXPORT_CSV") {
    exportToCSV(message.accounts).then(csv => sendResponse({ success: true, csv }))
      .catch(err => sendResponse({ success: false, error: err.message }))
    return true
  }

  if (message.type === "TOKEN_CAPTURED") {
    import("../lib/storage").then(({ setAccessToken }) => {
      setAccessToken(message.token).then(() => {
        refreshAllData().then(() => sendResponse({ success: true }))
      })
    })
    return true
  }
})

async function refreshAllData(): Promise<DashboardData> {
  const token = await getAccessToken()
  if (!token) throw new Error("Not authenticated. Please log in to Facebook.")

  const [adAccounts, businessManagers, fanPages, userInfo] = await Promise.all([
    getAdAccounts(token).catch(() => []),
    getBusinessManagers(token).catch(() => []),
    getFanPages(token).catch(() => []),
    getUserInfo(token).catch(() => null)
  ])

  if (userInfo) await setUserInfo(userInfo)

  const data: DashboardData = {
    businessManagers,
    adAccounts,
    fanPages,
    lastUpdated: new Date().toISOString()
  }

  await setDashboardData(data)
  return data
}

function exportToCSV(accounts: any[]): Promise<string> {
  const headers = ["Account ID", "Name", "Status", "Currency", "Amount Spent", "Balance", "Spend Cap", "Business Manager", "Created"]
  const rows = accounts.map(acc => [
    acc.accountId,
    `"${acc.name}"`,
    acc.status,
    acc.currency,
    acc.amountSpent,
    acc.balance,
    acc.spendCap || "N/A",
    acc.businessName || "N/A",
    acc.createdTime
  ])
  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
  return Promise.resolve(csv)
}

// Auto-refresh alarm
chrome.alarms.create("refresh-data", { periodInMinutes: 30 })
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "refresh-data") {
    try { await refreshAllData() } catch {}
  }
})

export {}
