import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-lg text-gray-700">
              Welcome to DNS. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy, or our practices with regards to your personal information, please contact us at Hello@gmail.com.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="text-lg text-gray-700">
              We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
            </p>
            <ul className="list-disc list-inside ml-4 text-lg text-gray-700">
              <li>Personal Information Provided by You: We collect names; phone numbers; email addresses; mailing addresses; job titles; and other similar information.</li>
              <li>Payment Data: We collect data necessary to process your payment if you make purchases, such as your payment instrument number (e.g., a credit card number), and the security code associated with your payment instrument.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-lg text-gray-700">
              We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul className="list-disc list-inside ml-4 text-lg text-gray-700">
              <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To send administrative information to you.</li>
              <li>To fulfill and manage your orders.</li>
              <li>To post testimonials.</li>
              <li>To protect our services.</li>
              <li>To enforce our terms, conditions, and policies.</li>
              <li>To respond to legal requests and prevent harm.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
            <p className="text-lg text-gray-700">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>
            <ul className="list-disc list-inside ml-4 text-lg text-gray-700">
              <li>Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              <li>Affiliates: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy.</li>
              <li>Business Partners: We may share your information with our business partners to offer you certain products, services, or promotions.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Security of Your Information</h2>
            <p className="text-lg text-gray-700">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-lg text-gray-700">
              If you have questions or comments about this policy, you may email us at test@gmail.com or by post to:
            </p>
            <address className="text-lg text-gray-700">
            <p>B-11124, Golghar Road</p>
                <p>Hyderabad, Andhra Pradesh, 116161</p>
                <p>India</p>
            </address>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
