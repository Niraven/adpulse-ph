import React from "react"

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  ACTIVE: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  DISABLED: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  PENDING_RISK_REVIEW: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
  IN_GRACE_PERIOD: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  UNSETTLED: { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-400" }
}

export function StatusBadge({ status }: { status: string }) {
  const colors = statusColors[status] || statusColors.DISABLED
  const label = status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {label}
    </span>
  )
}
