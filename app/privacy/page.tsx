import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for StatForge",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
          <p className="leading-relaxed">
            We collect information you provide directly to us, such as when you create an account, 
            update your profile, or communicate with us. This may include your username, email address, 
            and gaming preferences. We may also automatically collect certain technical data when you 
            visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
          <p className="leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, 
            such as generating game analytics, processing transactions, and personalizing your experience. 
            We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">3. Data Security</h2>
          <p className="leading-relaxed">
            We implement reasonable security measures to protect your personal information. 
            However, no method of transmission over the Internet is 100% secure, and we cannot 
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">4. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at support@statforge.gg.
          </p>
        </section>
        
        <p className="text-sm text-slate-500 pt-8 border-t border-slate-800">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
