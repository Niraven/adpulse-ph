import type { DashboardData } from "./types"

const STORAGE_KEYS = {
  ACCESS_TOKEN: "adpulse_access_token",
  DASHBOARD_DATA: "adpulse_dashboard_data",
  USER_INFO: "adpulse_user_info",
  SETTINGS: "adpulse_settings"
}

export async function getAccessToken(): Promise<string | null> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.ACCESS_TOKEN)
  return result[STORAGE_KEYS.ACCESS_TOKEN] || null
}

export async function setAccessToken(token: string): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.ACCESS_TOKEN]: token })
}

export async function clearAccessToken(): Promise<void> {
  await chrome.storage.local.remove(STORAGE_KEYS.ACCESS_TOKEN)
}

export async function getDashboardData(): Promise<DashboardData | null> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.DASHBOARD_DATA)
  return result[STORAGE_KEYS.DASHBOARD_DATA] || null
}

export async function setDashboardData(data: DashboardData): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.DASHBOARD_DATA]: data })
}

export async function getUserInfo(): Promise<any> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.USER_INFO)
  return result[STORAGE_KEYS.USER_INFO] || null
}

export async function setUserInfo(info: any): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.USER_INFO]: info })
}

export async function getSettings(): Promise<Record<string, any>> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS)
  return result[STORAGE_KEYS.SETTINGS] || { autoRefresh: true, refreshInterval: 30 }
}

export async function setSettings(settings: Record<string, any>): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings })
}
