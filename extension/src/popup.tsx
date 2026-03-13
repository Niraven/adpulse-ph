import React, { useEffect, useState } from "react"
import "./style.css"
import type { DashboardData, AdAccount } from "./lib/types"
import { getAccessToken, getDashboardData } from "./lib/storage"
import { AccountTable } from "./components/AccountTable"

type Tab = "accounts" | "pages" | "bm"

function Popup() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState<DashboardData | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>("accounts")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    init()
  }, [])

  async function init() {
    try {
      const token = await getAccessToken()
      setIsLoggedIn(!!token)
      if (token) {
        const cached = await getDashboardData()
        if (cached) setData(cached)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleRefresh() {
    setRefreshing(true)
    setError(null)
    try {
      const response = await chrome.runtime.sendMessage({ type: "REFRESH_DATA" })
      if (response?.success) {
        setData(response.data)
        setIsLoggedIn(true)
      } else {
        setError(response?.error || "Failed to refresh data")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setRefreshing(false)
    }
  }

  async function handleExport(accounts: AdAccount[]) {
    try {
      const response = await chrome.runtime.sendMessage({ type: "EXPORT_CSV", accounts })
      if (response?.success) {
        const blob = new Blob([response.csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `adpulse-export-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch {}
  }

  function openFacebook() {
    chrome.tabs.create({ url: "https://business.facebook.com/latest/home" })
  }

  if (loading) {
    return (
      <div className="w-[500px] h-[400px] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading AdPulse...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="w-[500px] bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-center text-white">
          <h1 className="text-2xl font-bold mb-1">⚡ AdPulse</h1>
          <p className="text-blue-100 text-sm">Meta Ads Manager — All accounts, one dashboard</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-4 text-sm">
            Open Facebook Business Suite to get started. AdPulse will automatically connect to your ad accounts.
          </p>
          <button
            onClick={openFacebook}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            Open Facebook Business Suite
          </button>
          <p className="text-[11px] text-gray-400 mt-4">
            Your data stays in your browser. We never store your credentials on any server.
          </p>
        </div>
      </div>
    )
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "accounts", label: "Ad Accounts", count: data?.adAccounts?.length || 0 },
    { key: "bm", label: "Business Managers", count: data?.businessManagers?.length || 0 },
    { key: "pages", label: "Fan Pages", count: data?.fanPages?.length || 0 }
  ]

  return (
    <div className="w-[520px] max-h-[580px] bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <h1 className="text-white font-bold text-lg">AdPulse</h1>
        </div>
        <div className="flex items-center gap-2">
          {data?.lastUpdated && (
            <span className="text-blue-100 text-[10px]">
              Updated {new Date(data.lastUpdated).toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {refreshing ? "⟳ Syncing..." : "⟳ Refresh"}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-b border-red-100 px-4 py-2 text-red-700 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
              activeTab === tab.key ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === "accounts" && (
          <AccountTable accounts={data?.adAccounts || []} onExport={handleExport} />
        )}

        {activeTab === "bm" && (
          <div className="space-y-3">
            {(data?.businessManagers || []).length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">No Business Managers found</div>
            ) : (data?.businessManagers || []).map(bm => (
              <div key={bm.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">{bm.name}</div>
                    <div className="text-[11px] text-gray-400">ID: {bm.id}</div>
                  </div>
                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    {bm.adAccountCount} accounts
                  </span>
                </div>
                {bm.adAccounts.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {bm.adAccounts.slice(0, 3).map(acc => (
                      <div key={acc.id} className="flex items-center justify-between text-xs bg-gray-50 rounded px-2 py-1">
                        <span className="truncate max-w-[200px]">{acc.name}</span>
                        <span className={acc.status === "ACTIVE" ? "text-green-600" : "text-red-500"}>{acc.status}</span>
                      </div>
                    ))}
                    {bm.adAccounts.length > 3 && (
                      <div className="text-[11px] text-gray-400 text-center">+{bm.adAccounts.length - 3} more accounts</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "pages" && (
          <div className="space-y-2">
            {(data?.fanPages || []).length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">No Fan Pages found</div>
            ) : (data?.fanPages || []).map(page => (
              <div key={page.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:border-blue-200 transition-colors">
                <div>
                  <div className="font-medium text-gray-900">{page.name}</div>
                  <div className="text-[11px] text-gray-400">{page.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-700">{page.followers.toLocaleString()}</div>
                  <div className="text-[10px] text-gray-400">followers</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-4 py-2 flex items-center justify-between shrink-0 bg-gray-50">
        <span className="text-[10px] text-gray-400">AdPulse v1.0.0 — Your data stays local</span>
        <a
          href="https://adpulse.ph"
          target="_blank"
          rel="noopener"
          className="text-[10px] text-blue-500 hover:text-blue-700"
        >
          Open Dashboard →
        </a>
      </div>
    </div>
  )
}

export default Popup
