import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AdPulse</span>
          </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-16 prose prose-gray prose-lg">
        <h1>Privacy Policy</h1>
        <p className="text-gray-500">Last updated: March 13, 2026</p>

        <p>
          AdPulse (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the AdPulse Chrome Extension, website at adpulse.ph, and related API services (collectively, the &quot;Service&quot;). This Privacy Policy explains how we collect, use, and protect your information.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Facebook/Meta Account Data</h3>
        <p>
          When you use the AdPulse Chrome Extension, we access the following data from your authenticated Facebook session through Facebook&apos;s official Marketing API:
        </p>
        <ul>
          <li>Ad account information (account IDs, names, status, currency, spend data)</li>
          <li>Business Manager information (IDs, names, associated accounts)</li>
          <li>Fan Page information (IDs, names, follower counts, categories)</li>
          <li>Your basic Facebook profile (name, email, profile picture)</li>
        </ul>
        <p><strong>Important: This data is stored exclusively in your browser&apos;s local storage (chrome.storage.local). We do not transmit, store, or retain any of this data on our servers.</strong></p>

        <h3>1.2 Authentication Tokens</h3>
        <p>
          When you use our optional web dashboard, we generate a JSON Web Token (JWT) that wraps your Facebook access token. This JWT is:
        </p>
        <ul>
          <li>Used only to authenticate API requests during your session</li>
          <li>Stored in your browser&apos;s memory only</li>
          <li>Not persisted in any database or server-side storage</li>
          <li>Automatically expired after 7 days</li>
        </ul>

        <h3>1.3 Payment Information</h3>
        <p>
          If you subscribe to a paid plan, payment processing is handled entirely by PayMongo, our third-party payment processor. We do not store your credit card numbers, GCash accounts, or Maya wallet details. We only receive confirmation of successful payments and your subscription status.
        </p>

        <h3>1.4 Usage Analytics</h3>
        <p>
          We may collect anonymous, aggregated usage statistics such as feature usage frequency and error rates. This data cannot be used to identify individual users and is used solely to improve the Service.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To display your Facebook ad account data within the extension and dashboard</li>
          <li>To authenticate your identity via Facebook&apos;s API</li>
          <li>To process subscription payments through PayMongo</li>
          <li>To improve and maintain the Service</li>
          <li>To send important service notifications (e.g., subscription changes)</li>
        </ul>

        <h2>3. Data Storage and Security</h2>

        <h3>3.1 Browser-First Architecture</h3>
        <p>
          AdPulse is built with a privacy-first, browser-first architecture. Your Facebook ad account data is:
        </p>
        <ul>
          <li>Processed entirely within your browser</li>
          <li>Stored only in chrome.storage.local on your device</li>
          <li>Never transmitted to our servers or any third party</li>
          <li>Automatically cleared when you uninstall the extension</li>
        </ul>

        <h3>3.2 Extension Permissions</h3>
        <p>
          The AdPulse Chrome Extension requests only the minimum permissions necessary:
        </p>
        <ul>
          <li><code>storage</code> — To save your preferences and cached data locally</li>
          <li><code>activeTab</code> — To detect when you&apos;re on Facebook Ads Manager</li>
          <li>Host permissions for <code>facebook.com</code>, <code>business.facebook.com</code>, and <code>adsmanager.facebook.com</code> only</li>
        </ul>
        <p>
          We do NOT request <code>&lt;all_urls&gt;</code>, <code>webRequest</code>, <code>tabs</code>, or any other broad permissions.
        </p>

        <h2>4. Data Sharing</h2>
        <p>We do not sell, trade, or share your personal data with third parties except:</p>
        <ul>
          <li><strong>PayMongo:</strong> For payment processing only (paid subscribers)</li>
          <li><strong>Facebook/Meta:</strong> API calls to retrieve your ad account data (using your own access token)</li>
          <li><strong>Legal requirements:</strong> If required by Philippine law or valid legal process</li>
        </ul>

        <h2>5. Data Retention</h2>
        <ul>
          <li><strong>Browser data:</strong> Retained until you clear it or uninstall the extension</li>
          <li><strong>JWT tokens:</strong> Expire automatically after 7 days</li>
          <li><strong>Payment records:</strong> Retained by PayMongo per their retention policy</li>
          <li><strong>Account information:</strong> Email and subscription status retained while your account is active; deleted upon request</li>
        </ul>

        <h2>6. Your Rights</h2>
        <p>Under the Philippine Data Privacy Act of 2012 (Republic Act No. 10173), you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate personal data</li>
          <li>Request deletion of your personal data</li>
          <li>Object to data processing</li>
          <li>Data portability</li>
          <li>Lodge a complaint with the National Privacy Commission</li>
        </ul>

        <h2>7. Children&apos;s Privacy</h2>
        <p>
          AdPulse is not intended for users under 18 years of age. We do not knowingly collect data from minors.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:
        </p>
        <ul>
          <li>Email: privacy@adpulse.ph</li>
          <li>Address: Cebu City, Philippines</li>
        </ul>
      </article>
    </main>
  )
}
