import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: [
    "https://www.facebook.com/*",
    "https://business.facebook.com/*",
    "https://adsmanager.facebook.com/*"
  ],
  run_at: "document_idle"
}

// Extract Facebook access token from the page context
function extractToken() {
  // Method 1: Look for token in page source (common pattern)
  const pageSource = document.documentElement.innerHTML
  const tokenPatterns = [
    /\"accessToken\":\"(EAA[A-Za-z0-9]+)\"/,
    /access_token=(EAA[A-Za-z0-9]+)/,
    /\"token\":\"(EAA[A-Za-z0-9]+)\"/
  ]

  for (const pattern of tokenPatterns) {
    const match = pageSource.match(pattern)
    if (match?.[1]) return match[1]
  }
  return null
}

// Try to capture token on page load
const token = extractToken()
if (token) {
  chrome.runtime.sendMessage({ type: "TOKEN_CAPTURED", token })
}

// Also inject a small overlay indicator when on FB Ads Manager
if (window.location.hostname.includes("business.facebook.com") ||
    window.location.pathname.includes("/adsmanager")) {
  const indicator = document.createElement("div")
  indicator.id = "adpulse-indicator"
  indicator.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; z-index: 99999;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white; padding: 8px 16px; border-radius: 24px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    box-shadow: 0 4px 12px rgba(59,130,246,0.4);
    display: flex; align-items: center; gap: 6px;
    transition: transform 0.2s, box-shadow 0.2s;
  `
  indicator.innerHTML = `<span style="font-size:16px">⚡</span> AdPulse`
  indicator.title = "Open AdPulse Dashboard"
  indicator.addEventListener("mouseenter", () => {
    indicator.style.transform = "scale(1.05)"
    indicator.style.boxShadow = "0 6px 20px rgba(59,130,246,0.5)"
  })
  indicator.addEventListener("mouseleave", () => {
    indicator.style.transform = "scale(1)"
    indicator.style.boxShadow = "0 4px 12px rgba(59,130,246,0.4)"
  })
  indicator.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "OPEN_POPUP" })
  })
  document.body.appendChild(indicator)
}
