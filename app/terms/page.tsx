import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for StatForge",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing or using StatForge, you agree to be bound by these Terms of Service and all 
            applicable laws and regulations. If you do not agree with any of these terms, you are 
            prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">2. User Accounts</h2>
          <p className="leading-relaxed">
            You are responsible for maintaining the confidentiality of your account and password. 
            You agree to accept responsibility for all activities that occur under your account. 
            We reserve the right to terminate accounts that violate our policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">3. Prohibited Conduct</h2>
          <p className="leading-relaxed">
            You agree not to use the service for any unlawful purpose or in any way that could damage, 
            disable, overburden, or impair our servers or networks. Scraping, data mining, or 
            automated access to our API without permission is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">4. Disclaimer</h2>
          <p className="leading-relaxed">
            StatForge is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that 
            the service will be uninterrupted, error-free, or completely accurate regarding game statistics.
          </p>
        </section>

        <p className="text-sm text-slate-500 pt-8 border-t border-slate-800">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
