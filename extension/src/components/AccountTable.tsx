import React, { useState, useMemo } from "react"
import type { AdAccount, StatusFilter, SortField, SortDirection } from "../lib/types"
import { StatusBadge } from "./StatusBadge"

interface AccountTableProps {
  accounts: AdAccount[]
  onExport: (accounts: AdAccount[]) => void
}

export function AccountTable({ accounts, onExport }: AccountTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDir, setSortDir] = useState<SortDirection>("asc")

  const filtered = useMemo(() => {
    let result = [...accounts]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.accountId.includes(q) ||
        (a.businessName || "").toLowerCase().includes(q)
      )
    }

    if (statusFilter !== "all") {
      const statusMap: Record<string, string[]> = {
        active: ["ACTIVE"],
        disabled: ["DISABLED"],
        review: ["PENDING_RISK_REVIEW", "IN_GRACE_PERIOD"]
      }
      result = result.filter(a => statusMap[statusFilter]?.includes(a.status))
    }

    result.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case "name": cmp = a.name.localeCompare(b.name); break
        case "status": cmp = a.status.localeCompare(b.status); break
        case "spent": cmp = a.amountSpent - b.amountSpent; break
        case "balance": cmp = a.balance - b.balance; break
      }
      return sortDir === "asc" ? cmp : -cmp
    })

    return result
  }, [accounts, search, statusFilter, sortField, sortDir])

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDir("asc") }
  }

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return "↕"
    return sortDir === "asc" ? "↑" : "↓"
  }

  const stats = useMemo(() => ({
    total: accounts.length,
    active: accounts.filter(a => a.status === "ACTIVE").length,
    disabled: accounts.filter(a => a.status === "DISABLED").length,
    totalSpent: accounts.reduce((sum, a) => sum + a.amountSpent, 0)
  }), [accounts])

  const fmt = (n: number, currency = "PHP") =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency, maximumFractionDigits: 0 }).format(n)

  return (
    <div className="space-y-3">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-blue-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-blue-700">{stats.total}</div>
          <div className="text-[10px] text-blue-500 uppercase font-medium">Total</div>
        </div>
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-700">{stats.active}</div>
          <div className="text-[10px] text-green-500 uppercase font-medium">Active</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-red-700">{stats.disabled}</div>
          <div className="text-[10px] text-red-500 uppercase font-medium">Disabled</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-purple-700">{fmt(stats.totalSpent)}</div>
          <div className="text-[10px] text-purple-500 uppercase font-medium">Spent</div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search accounts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-2.5 top-2.5 text-gray-400 text-sm">🔍</span>
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as StatusFilter)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
          <option value="review">In Review</option>
        </select>
        <button
          onClick={() => onExport(filtered)}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          title="Export to CSV"
        >
          📥
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="text-left px-3 py-2 cursor-pointer hover:text-gray-700" onClick={() => toggleSort("name")}>
                Account {sortIcon("name")}
              </th>
              <th className="text-left px-3 py-2 cursor-pointer hover:text-gray-700" onClick={() => toggleSort("status")}>
                Status {sortIcon("status")}
              </th>
              <th className="text-right px-3 py-2 cursor-pointer hover:text-gray-700" onClick={() => toggleSort("spent")}>
                Spent {sortIcon("spent")}
              </th>
              <th className="text-right px-3 py-2 cursor-pointer hover:text-gray-700" onClick={() => toggleSort("balance")}>
                Balance {sortIcon("balance")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-gray-400">
                  {accounts.length === 0 ? "No ad accounts found" : "No accounts match your filters"}
                </td>
              </tr>
            ) : filtered.map(account => (
              <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2">
                  <div className="font-medium text-gray-900 truncate max-w-[160px]">{account.name}</div>
                  <div className="text-[11px] text-gray-400">{account.accountId}{account.businessName ? ` • ${account.businessName}` : ""}</div>
                </td>
                <td className="px-3 py-2"><StatusBadge status={account.status} /></td>
                <td className="px-3 py-2 text-right font-mono text-gray-700">{fmt(account.amountSpent, account.currency)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-700">{fmt(account.balance, account.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-[11px] text-gray-400 text-right">
        Showing {filtered.length} of {accounts.length} accounts
      </div>
    </div>
  )
}
