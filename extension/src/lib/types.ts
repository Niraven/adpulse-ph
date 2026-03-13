export interface AdAccount {
  id: string
  name: string
  accountId: string
  status: "ACTIVE" | "DISABLED" | "PENDING_RISK_REVIEW" | "IN_GRACE_PERIOD" | "PENDING_SETTLEMENT" | "UNSETTLED" | "ANY_ACTIVE" | "ANY_CLOSED"
  currency: string
  spendCap: number | null
  amountSpent: number
  balance: number
  dailyBudget: number | null
  businessId?: string
  businessName?: string
  createdTime: string
  timezoneId: number
  timezoneName: string
}

export interface BusinessManager {
  id: string
  name: string
  primaryPage?: string
  adAccountCount: number
  adAccounts: AdAccount[]
  status: "ACTIVE" | "DISABLED" | "CLOSED"
  createdTime: string
}

export interface FanPage {
  id: string
  name: string
  category: string
  followers: number
  likes: number
  isPublished: boolean
  link: string
}

export interface AccountHealth {
  accountId: string
  status: AdAccount["status"]
  spendingLimit: number | null
  dailyLimit: number | null
  policyViolations: number
  qualityScore: number | null
}

export interface DashboardData {
  businessManagers: BusinessManager[]
  adAccounts: AdAccount[]
  fanPages: FanPage[]
  lastUpdated: string
}

export type StatusFilter = "all" | "active" | "disabled" | "review"
export type SortField = "name" | "status" | "spent" | "balance"
export type SortDirection = "asc" | "desc"
