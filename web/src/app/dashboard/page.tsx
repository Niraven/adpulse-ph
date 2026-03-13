"use client"

import { useState } from "react"

type Tab = "overview" | "accounts" | "health" | "pages"

// Demo data for the web dashboard
const demoAccounts = [
  { id: "1", name: "Shopee PH — Main", accountId: "123456789", status: "ACTIVE", currency: "PHP", amountSpent: 847230, balance: 12400, spendCap: 1000000, businessName: "E-Commerce BM", dailyLimit: 50000 },
  { id: "2", name: "Lazada Campaign Q1", accountId: "987654321", status: "ACTIVE", currency: "PHP", amountSpent: 523100, balance: 8200, spendCap: 750000, businessName: "E-Commerce BM", dailyLimit: 30000 },
  { id: "3", name: "TikTok Shop Retarget", accountId: "456789123", status: "PENDING_RISK_REVIEW", currency: "PHP", amountSpent: 234500, balance: 0, spendCap: null, businessName: "Social BM", dailyLimit: null },
  { id: "4", name: "Brand Awareness 2024", accountId: "789123456", status: "DISABLED", currency: "PHP", amountSpent: 156800, balance: 0, spendCap: 200000, businessName: "Brand BM", dailyLimit: 0 },
  { id: "5", name: "Carousell PH Ads", accountId: "321654987", status: "ACTIVE", currency: "PHP", amountSpent: 345600, balance: 5600, spendCap: 500000, businessName: "E-Commerce BM", dailyLimit: 25000 },
  { id: "6", name: "Agency Client — ABC Corp", accountId: "654987321", status: "ACTIVE", currency: "PHP", amountSpent: 189400, balance: 15000, spendCap: 300000, businessName: "Agency BM", dailyLimit: 20000 },
]

const fmt = (n: number) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(n)

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ACTIVE: "bg-green-50 text-green-700",
    DISABLED: "bg-red-50 text-red-700",
    PENDING_RISK_REVIEW: "bg-yellow-50 text-yellow-700",
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status.replace(/_/g, " ")}
    </span>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [search, setSearch] = useState("")

  const stats = {
    total: demoAccounts.length,
    active: demoAccounts.filter(a => a.status === "ACTIVE").length,
    disabled: demoAccounts.filter(a => a.status === "DISABLED").length,
    inReview: demoAccounts.filter(a => a.status === "PENDING_RISK_REVIEW").length,
    totalSpent: demoAccounts.reduce((s, a) => s + a.amountSpent, 0),
    totalBalance: demoAccounts.reduce((s, a) => s + a.balance, 0),
  }

  const filteredAccounts = search
    ? demoAccounts.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.accountId.includes(search))
    : demoAccounts

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "accounts", label: "Ad Accounts" },
    { key: "health", label: "Health Monitor" },
    { key: "pages", label: "Fan Pages" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar + Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 hidden lg:block">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AdPulse</span>
          </div>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="text-sm font-semibold text-blue-800 mb-1">Upgrade to Pro</div>
            <div className="text-xs text-blue-600 mb-3">Unlock unlimited accounts, bulk actions, and API access.</div>
            <button className="w-full py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "accounts" && "Ad Accounts"}
                {activeTab === "health" && "Health Monitor"}
                {activeTab === "pages" && "Fan Pages"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last synced: {new Date().toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Export CSV
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Sync Now
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Accounts", value: stats.total, color: "blue", icon: "📊" },
                  { label: "Active", value: stats.active, color: "green", icon: "✅" },
                  { label: "Disabled", value: stats.disabled, color: "red", icon: "⛔" },
                  { label: "In Review", value: stats.inReview, color: "yellow", icon: "⏳" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <span className={`text-3xl font-bold text-${s.color}-600`}>{s.value}</span>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-sm text-gray-500 font-medium mb-2">Total Amount Spent</div>
                  <div className="text-3xl font-bold text-gray-900">{fmt(stats.totalSpent)}</div>
                  <div className="text-sm text-green-600 mt-1">Across all accounts</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-sm text-gray-500 font-medium mb-2">Total Balance</div>
                  <div className="text-3xl font-bold text-gray-900">{fmt(stats.totalBalance)}</div>
                  <div className="text-sm text-blue-600 mt-1">Available to spend</div>
                </div>
              </div>

              {/* Recent Accounts */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Recent Ad Accounts</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {demoAccounts.slice(0, 5).map(acc => (
                    <div key={acc.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <div className="font-medium text-gray-900">{acc.name}</div>
                        <div className="text-xs text-gray-400">{acc.accountId} - {acc.businessName}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusBadge status={acc.status} />
                        <div className="text-right">
                          <div className="text-sm font-semibold">{fmt(acc.amountSpent)}</div>
                          <div className="text-xs text-gray-400">spent</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Accounts Tab */}
          {activeTab === "accounts" && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search accounts by name or ID..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                      <th className="text-left px-6 py-3">Account</th>
                      <th className="text-left px-6 py-3">Status</th>
                      <th className="text-right px-6 py-3">Spent</th>
                      <th className="text-right px-6 py-3">Balance</th>
                      <th className="text-right px-6 py-3">Spend Cap</th>
                      <th className="text-right px-6 py-3">Daily Limit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredAccounts.map(acc => (
                      <tr key={acc.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3">
                          <div className="font-medium text-gray-900">{acc.name}</div>
                          <div className="text-xs text-gray-400">{acc.accountId} - {acc.businessName}</div>
                        </td>
                        <td className="px-6 py-3"><StatusBadge status={acc.status} /></td>
                        <td className="px-6 py-3 text-right font-mono text-sm">{fmt(acc.amountSpent)}</td>
                        <td className="px-6 py-3 text-right font-mono text-sm">{fmt(acc.balance)}</td>
                        <td className="px-6 py-3 text-right font-mono text-sm text-gray-500">{acc.spendCap ? fmt(acc.spendCap) : "—"}</td>
                        <td className="px-6 py-3 text-right font-mono text-sm text-gray-500">{acc.dailyLimit ? fmt(acc.dailyLimit) : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Health Monitor Tab */}
          {activeTab === "health" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 rounded-xl p-5 border border-green-100 text-center">
                  <div className="text-3xl font-bold text-green-700">{stats.active}</div>
                  <div className="text-sm text-green-600 font-medium mt-1">Healthy</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100 text-center">
                  <div className="text-3xl font-bold text-yellow-700">{stats.inReview}</div>
                  <div className="text-sm text-yellow-600 font-medium mt-1">Needs Attention</div>
                </div>
                <div className="bg-red-50 rounded-xl p-5 border border-red-100 text-center">
                  <div className="text-3xl font-bold text-red-700">{stats.disabled}</div>
                  <div className="text-sm text-red-600 font-medium mt-1">Critical</div>
                </div>
              </div>
              {demoAccounts.map(acc => {
                const healthPct = acc.spendCap ? Math.min((acc.amountSpent / acc.spendCap) * 100, 100) : 0
                const barColor = acc.status === "ACTIVE" ? "bg-green-500" : acc.status === "DISABLED" ? "bg-red-500" : "bg-yellow-500"
                return (
                  <div key={acc.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">{acc.name}</div>
                        <div className="text-xs text-gray-400">{acc.businessName}</div>
                      </div>
                      <StatusBadge status={acc.status} />
                    </div>
                    {acc.spendCap && (
                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Spend: {fmt(acc.amountSpent)}</span>
                          <span>Cap: {fmt(acc.spendCap)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className={`h-2 rounded-full ${barColor} transition-all`} style={{ width: `${healthPct}%` }} />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{healthPct.toFixed(0)}% of spend cap used</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Fan Pages Tab */}
          {activeTab === "pages" && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Shopee Deals PH", category: "E-Commerce", followers: 45200, likes: 42100 },
                { name: "Lazada Best Finds", category: "Shopping", followers: 32800, likes: 31500 },
                { name: "Tech Reviews PH", category: "Technology", followers: 18900, likes: 17200 },
                { name: "Beauty Hub Manila", category: "Beauty", followers: 67300, likes: 65100 },
                { name: "PH Gadget Store", category: "Electronics", followers: 12400, likes: 11800 },
                { name: "Fashion Forward PH", category: "Fashion", followers: 28700, likes: 27300 },
              ].map(page => (
                <div key={page.name} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-lg font-bold text-blue-600">
                      {page.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{page.name}</div>
                      <div className="text-xs text-gray-400">{page.category}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{page.followers.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Followers</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{page.likes.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Likes</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
