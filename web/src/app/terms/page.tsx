import Link from "next/link"

export default function TermsOfService() {
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
        <h1>Terms of Service</h1>
        <p className="text-gray-500">Last updated: March 13, 2026</p>

        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of the AdPulse Chrome Extension, website, and API services (collectively, the &quot;Service&quot;) operated by AdPulse (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
        </p>
        <p>By using the Service, you agree to these Terms. If you do not agree, do not use the Service.</p>

        <h2>1. Description of Service</h2>
        <p>
          AdPulse provides tools to view and manage Facebook/Meta ad accounts, Business Managers, and Fan Pages through a Chrome Extension and optional web dashboard. AdPulse uses Facebook&apos;s official Marketing API and does not modify, create, or delete any data in your Facebook account unless you explicitly initiate such actions.
        </p>

        <h2>2. Eligibility</h2>
        <ul>
          <li>You must be at least 18 years old</li>
          <li>You must have a valid Facebook account with ad account access</li>
          <li>You must comply with Facebook&apos;s Terms of Service and Advertising Policies</li>
          <li>You are responsible for maintaining the security of your Facebook credentials</li>
        </ul>

        <h2>3. Account and Security</h2>
        <ul>
          <li>You are responsible for all activity under your account</li>
          <li>Do not share your AdPulse access or Facebook session with unauthorized users</li>
          <li>Notify us immediately if you suspect unauthorized access</li>
          <li>We reserve the right to suspend accounts that violate these Terms</li>
        </ul>

        <h2>4. Subscription Plans and Payments</h2>

        <h3>4.1 Free Plan</h3>
        <p>The free plan provides limited access at no cost with no expiration.</p>

        <h3>4.2 Paid Plans</h3>
        <ul>
          <li>Paid plans (Starter, Pro, Agency) are billed monthly in Philippine Peso (PHP)</li>
          <li>Payments are processed by PayMongo and support GCash, Maya, credit/debit cards, and bank transfers</li>
          <li>Subscriptions auto-renew unless cancelled before the billing date</li>
          <li>All paid plans include a 7-day free trial for new subscribers</li>
        </ul>

        <h3>4.3 Refund Policy</h3>
        <ul>
          <li>7-day free trial: No charge if cancelled within the trial period</li>
          <li>Monthly subscriptions: No refunds for partial months</li>
          <li>If you experience technical issues preventing use, contact support for case-by-case evaluation</li>
        </ul>

        <h2>5. Acceptable Use</h2>
        <p>You agree NOT to:</p>
        <ul>
          <li>Use the Service to violate Facebook&apos;s Terms of Service or Advertising Policies</li>
          <li>Attempt to reverse engineer, decompile, or extract source code from the Service</li>
          <li>Use the Service to scrape, harvest, or collect data for unauthorized purposes</li>
          <li>Share, resell, or sublicense your AdPulse subscription</li>
          <li>Use automated scripts or bots to interact with the Service</li>
          <li>Attempt to circumvent plan limitations or access controls</li>
          <li>Use the Service for any illegal activity under Philippine or international law</li>
        </ul>

        <h2>6. Intellectual Property</h2>
        <p>
          The Service, including its code, design, logos, and content, is owned by AdPulse and protected by intellectual property laws. Your subscription grants you a limited, non-exclusive, non-transferable license to use the Service.
        </p>

        <h2>7. Disclaimers</h2>
        <ul>
          <li>The Service is provided &quot;as is&quot; without warranties of any kind</li>
          <li>We do not guarantee uninterrupted or error-free operation</li>
          <li>We are not responsible for changes to Facebook&apos;s API that may affect functionality</li>
          <li>We do not guarantee any specific results from using the Service</li>
          <li>Ad account data accuracy depends on Facebook&apos;s API responses</li>
        </ul>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by Philippine law, AdPulse shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the Service.
        </p>
        <p>
          Our total liability for any claim shall not exceed the amount you paid for the Service in the 12 months preceding the claim.
        </p>

        <h2>9. Termination</h2>
        <ul>
          <li>You may cancel your subscription at any time through your account settings</li>
          <li>We may terminate or suspend your access for violation of these Terms</li>
          <li>Upon termination, your right to use the Service ceases immediately</li>
          <li>Data stored locally in your browser remains under your control</li>
        </ul>

        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the Republic of the Philippines. Any disputes shall be resolved in the courts of Cebu City, Philippines.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. Material changes will be communicated via email or in-app notification at least 14 days before taking effect. Continued use after changes constitutes acceptance.
        </p>

        <h2>12. Contact</h2>
        <p>For questions about these Terms:</p>
        <ul>
          <li>Email: legal@adpulse.ph</li>
          <li>Address: Cebu City, Philippines</li>
        </ul>
      </article>
    </main>
  )
}
