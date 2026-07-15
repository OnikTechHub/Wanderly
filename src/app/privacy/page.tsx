export const metadata = { title: "Privacy & Terms | Wanderly" };

export default function PrivacyPage() {
  return (
    <div className="container-app py-14 max-w-3xl">
      <h1 className="text-3xl font-extrabold mb-2">Privacy Policy &amp; Terms of Service</h1>
      <p className="text-gray-500 mb-10 text-sm">Last updated: June 1, 2026</p>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-bold text-gray-900 text-lg mb-2">1. Information We Collect</h2>
          <p>
            When you create an account, we collect your name, email address, and a securely hashed version of your
            password. When you add a tour listing, we store the details you provide, including pricing, dates, and
            imagery, associated with your account.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-gray-900 text-lg mb-2">2. How We Use Your Information</h2>
          <p>
            Account information is used to authenticate you, associate listings with your profile, and send booking
            confirmations. We do not sell personal data to third parties.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-gray-900 text-lg mb-2">3. Cookies</h2>
          <p>
            We use a single secure, HTTP-only session cookie to keep you logged in. It contains no personal data
            beyond an encrypted reference to your account and expires after seven days.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-gray-900 text-lg mb-2">4. Booking Terms</h2>
          <p>
            Full refunds are available up to 14 days before departure. Between 14 and 3 days, a 50% credit is issued
            toward a future trip. Cancellations within 3 days of departure are non-refundable.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-gray-900 text-lg mb-2">5. Listing Content</h2>
          <p>
            Users who publish tour listings are responsible for the accuracy of the information provided, including
            pricing, availability, and safety disclosures. Wanderly reserves the right to remove listings that
            violate these terms.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-gray-900 text-lg mb-2">6. Contact</h2>
          <p>Questions about this policy can be sent to support@wanderly.com.</p>
        </section>
      </div>
    </div>
  );
}
