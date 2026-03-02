'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cookie, ArrowLeft, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-pink-950/20">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl dark:text-white">CardGen AI</span>
          </Link>
          
          <Link href="/">
            <Button variant="ghost" className="dark:text-slate-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-32 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white">Cookies Policy</h1>
          </div>

          <p className="text-slate-500 dark:text-slate-400 mb-8">
            <strong>Last Updated: January 1, 2026</strong>
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">1. What Are Cookies</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how visitors use their site. Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device for a set period or until you delete them, while session cookies are deleted when you close your web browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                CardGen AI uses cookies and similar technologies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for the operation of our website, including maintaining your session and preferences.</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences such as language, theme (light/dark mode), and accessibility options.</li>
                <li><strong>Functionality Cookies:</strong> Enable enhanced functionality, such as remembering your generated cards and customizations.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous statistical data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">3. Local Storage</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                In addition to cookies, we use HTML5 local storage to store your generated greeting cards and preferences directly on your device. This data remains on your device and is not transmitted to our servers. Local storage allows you to access your saved cards even when you're offline and provides a faster, more personalized experience. You can clear this data at any time through your browser settings or by using the clear function in our application.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">4. Types of Cookies We Use</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                The following table explains the types of cookies we use:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-700">
                      <th className="border border-slate-200 dark:border-slate-600 p-3 text-left dark:text-white">Cookie Type</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-3 text-left dark:text-white">Purpose</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-3 text-left dark:text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">Essential</td>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">Core functionality</td>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">Session</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      <td className="border border-slate-200 dark:border-slate-700 p-3">Preference</td>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">User settings</td>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">1 year</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">Theme</td>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">Dark/Light mode</td>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">1 year</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      <td className="border border-slate-200 dark:border-slate-700 p-3">Analytics</td>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">Usage statistics</td>
                      <td className="border border-slate-200 dark:border-slate-700 p-3">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">5. Third-Party Cookies</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We may use third-party services that set their own cookies on your device. These include analytics providers (such as Vercel Analytics) and AI service providers (such as Groq). These third parties have their own privacy policies and cookie practices. We do not control these third-party cookies and recommend reviewing the privacy policies of these providers for more information about their cookie usage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">6. Managing Cookies</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                <li><strong>Browser Settings:</strong> Most browsers allow you to manage cookie settings. You can set your browser to refuse cookies or delete certain cookies.</li>
                <li><strong>Clear Browsing Data:</strong> You can clear all cookies and local storage data through your browser's privacy settings.</li>
                <li><strong>Incognito Mode:</strong> Using private/incognito browsing mode prevents cookies from being stored after you close the browser.</li>
                <li><strong>Opt-Out:</strong> Some analytics cookies can be disabled through opt-out mechanisms provided by the analytics service.</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                Please note that disabling certain cookies may affect the functionality of our Service. Essential cookies are necessary for the Service to work properly, and disabling them may result in a degraded experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">7. Browser Cookie Settings</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Here are links to manage cookies in popular browsers:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                <li>Google Chrome: Settings → Privacy and Security → Cookies</li>
                <li>Mozilla Firefox: Settings → Privacy & Security → Cookies</li>
                <li>Safari: Preferences → Privacy → Cookies</li>
                <li>Microsoft Edge: Settings → Cookies and Site Permissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">8. Do Not Track</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Some browsers have a "Do Not Track" feature that signals to websites that you do not want your online activity tracked. Our Service currently responds to Do Not Track signals by limiting certain analytics tracking. However, essential cookies required for the functioning of the Service will still be used.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">9. Updates to This Policy</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We may update this Cookies Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">10. Contact Us</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                If you have any questions about our use of cookies or this Cookies Policy, please contact us through our website. We are committed to transparency about our data practices and are happy to address any concerns you may have.
              </p>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/privacy" className="text-sm text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Link href="/terms" className="text-sm text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors">Terms of Use</Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Link href="/disclaimer" className="text-sm text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors">Disclaimer</Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Link href="/cookies" className="text-sm text-purple-600 dark:text-purple-400 font-medium">Cookies Policy</Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
