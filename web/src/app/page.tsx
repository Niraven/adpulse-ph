import Link from "next/link"

const features = [
  { icon: "📊", title: "Multi-Account Dashboard", desc: "View and manage hundreds of ad accounts + Business Managers simultaneously in one clean interface." },
  { icon: "🩺", title: "Account Health Checker", desc: "Instantly check account status — active, disabled, limited, in review. See spending limits and thresholds." },
  { icon: "🔍", title: "Smart Search & Sort", desc: "Search across all your data by keyword. Sort any column. Find any account in seconds." },
  { icon: "📥", title: "Export Reports", desc: "Export your ad account data to CSV/Excel with one click. Perfect for client reporting." },
  { icon: "🛡️", title: "Hidden Admin Detection", desc: "Find and remove unauthorized hidden administrators from your ad accounts and Business Managers." },
  { icon: "⚡", title: "Bulk Actions", desc: "Share pixels, grant access, create accounts — all in bulk across your entire portfolio." },
  { icon: "📱", title: "Fan Page Manager", desc: "Manage thousands of fan pages at once. See follower counts, categories, and publish status." },
  { icon: "🔒", title: "Privacy First", desc: "Your data never leaves your browser. No server-side storage. No tracking. Zero risk." },
]

const pricing = [
  {
    name: "Free",
    price: "₱0",
    period: "forever",
    desc: "Perfect for getting started",
    features: ["Up to 5 ad accounts", "Basic status checker", "Search & sort", "Single BM view"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Starter",
    price: "₱499",
    period: "/month",
    desc: "For growing advertisers",
    features: ["Up to 50 ad accounts", "CSV/Excel exports", "Health alerts", "Web dashboard", "Email support"],
    cta: "Start 7-Day Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "₱1,499",
    period: "/month",
    desc: "For power users & agencies",
    features: ["Unlimited accounts", "Bulk actions", "Advanced analytics", "API access", "Team seats (3)", "Priority support"],
    cta: "Start 7-Day Trial",
    popular: true,
  },
  {
    name: "Agency",
    price: "₱3,999",
    period: "/month",
    desc: "For large-scale operations",
    features: ["Everything in Pro", "Unlimited team seats", "Custom reports", "White-label option", "Dedicated support", "Onboarding call"],
    cta: "Contact Sales",
    popular: false,
  },
]

const faqs = [
  { q: "Is AdPulse safe to use?", a: "Yes. AdPulse operates entirely within your browser. Your Facebook credentials and ad account data never leave your device. We don't store any data on our servers. Our code is transparent and we request only the minimum permissions needed." },
  { q: "How does AdPulse access my ad accounts?", a: "When you visit Facebook Business Suite with AdPulse installed, the extension reads your existing authenticated session to pull your ad account data via Facebook's official Marketing API. You don't need to enter your password anywhere." },
  { q: "Will this get my Facebook account banned?", a: "No. AdPulse uses Facebook's official APIs the same way any authorized marketing tool does. We don't automate actions that violate Facebook's Terms of Service." },
  { q: "Can I manage multiple Business Managers?", a: "Absolutely. AdPulse aggregates all Business Managers linked to your Facebook account into a single dashboard view." },
  { q: "What payment methods do you accept?", a: "We accept GCash, Maya, credit/debit cards, and bank transfers through our Philippine payment processor." },
  { q: "Is there a free trial for paid plans?", a: "Yes! All paid plans come with a 7-day free trial. No credit card required to start." },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AdPulse</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">Dashboard</Link>
            <a
              href="#install"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Install Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Trusted by 500+ Filipino advertisers
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            All your Meta ad accounts.{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              One dashboard.
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            Stop switching between tabs. AdPulse gives you a unified view of every ad account, Business Manager, and Fan Page — with health checks, bulk actions, and CSV exports.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#install"
              id="install"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
            >
              Install Chrome Extension — Free
            </a>
            <a href="#features" className="px-6 py-4 text-gray-600 hover:text-gray-900 font-medium transition-colors">
              See how it works ↓
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">Free forever plan available. No credit card required.</p>
        </div>

        {/* Screenshot placeholder */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl shadow-2xl shadow-gray-200/50 overflow-hidden">
            <div className="bg-gray-200 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 text-center text-xs text-gray-500">adpulse.ph/dashboard</div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Accounts", value: "247", color: "blue" },
                  { label: "Active", value: "198", color: "green" },
                  { label: "Disabled", value: "31", color: "red" },
                  { label: "Total Spent", value: "₱2.4M", color: "purple" },
                ].map((stat) => (
                  <div key={stat.label} className={`bg-${stat.color}-50 rounded-xl p-4 text-center`}>
                    <div className={`text-2xl font-bold text-${stat.color}-700`}>{stat.value}</div>
                    <div className={`text-xs text-${stat.color}-500 font-medium mt-1`}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { name: "Shopee PH — Main", status: "Active", spent: "₱847,230", balance: "₱12,400" },
                  { name: "Lazada Campaign Q1", status: "Active", spent: "₱523,100", balance: "₱8,200" },
                  { name: "TikTok Shop Retarget", status: "In Review", spent: "₱234,500", balance: "₱0" },
                  { name: "Brand Awareness 2024", status: "Disabled", spent: "₱156,800", balance: "₱0" },
                ].map((row) => (
                  <div key={row.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-100">
                    <span className="font-medium text-sm">{row.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      row.status === "Active" ? "bg-green-50 text-green-700" :
                      row.status === "In Review" ? "bg-yellow-50 text-yellow-700" :
                      "bg-red-50 text-red-700"
                    }`}>{row.status}</span>
                    <span className="text-sm font-mono text-gray-600">{row.spent}</span>
                    <span className="text-sm font-mono text-gray-600">{row.balance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to manage ads at scale</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Built specifically for Filipino media buyers, e-commerce sellers, and agencies managing multiple accounts.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your security is our #1 priority</h2>
          <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
            Unlike other tools, AdPulse is built with a privacy-first architecture. We never store your data on any server.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🔒", title: "Zero Server Storage", desc: "All data stays in your browser's local storage. We literally cannot see your ad accounts." },
              { icon: "🛡️", title: "Minimal Permissions", desc: "We only request access to Facebook domains. No wildcard permissions. No access to other websites." },
              { icon: "👁️", title: "Transparent Code", desc: "Our extension code is open for inspection. We have nothing to hide because we store nothing." },
            ].map((s) => (
              <div key={s.title} className="bg-green-50 rounded-xl p-6 border border-green-100">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-500 text-lg">Start free. Upgrade when you need more. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-6 border-2 relative ${
                  plan.popular ? "border-blue-600 shadow-xl shadow-blue-100" : "border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      <span className="text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            All prices in Philippine Peso. Payable via GCash, Maya, credit card, or bank transfer.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-gray-50 rounded-xl border border-gray-100">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take control of your ad accounts?</h2>
          <p className="text-blue-100 text-lg mb-8">Join 500+ Filipino advertisers already using AdPulse. Free forever plan available.</p>
          <a
            href="#install"
            className="inline-block px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Install AdPulse — It&apos;s Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">⚡</span>
                <span className="text-lg font-bold text-white">AdPulse</span>
              </div>
              <p className="text-sm">The simplest way to manage all your Meta ad accounts in one dashboard.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Product</h4>
              <div className="space-y-2 text-sm">
                <a href="#features" className="block hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="block hover:text-white transition-colors">Pricing</a>
                <a href="#install" className="block hover:text-white transition-colors">Install Extension</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
            <p>2026 AdPulse. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Made with care in Cebu, Philippines</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
