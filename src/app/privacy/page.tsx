'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicy() {
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
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white">Privacy Policy</h1>
          </div>

          <p className="text-slate-500 dark:text-slate-400 mb-8">
            <strong>Last Updated: January 1, 2026</strong>
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">1. Introduction</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Welcome to CardGen AI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of any information you provide while using our greeting card generation service. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">2. Information We Collect</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We collect information that you provide directly to us when using our service. This includes:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                <li><strong>Card Generation Data:</strong> Information you enter to create greeting cards, including recipient names, sender names, occasions, and message preferences.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our service, including pages visited, features used, and time spent on the platform.</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution for optimizing your experience.</li>
                <li><strong>Preferences:</strong> Your saved preferences including language, theme, font choices, and accessibility settings stored locally on your device.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                <li>To generate personalized greeting cards using our AI technology</li>
                <li>To improve and optimize our service and user experience</li>
                <li>To analyze usage patterns and trends to enhance our features</li>
                <li>To troubleshoot technical issues and provide customer support</li>
                <li>To ensure the security and integrity of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">4. Data Storage and Security</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Your greeting cards and preferences are stored locally on your device using browser localStorage. We do not store your personal information or generated cards on our servers. This means your data remains on your device and is not transmitted to or stored on our servers. We implement appropriate technical and organizational security measures to protect the information processed through our service. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">5. Third-Party Services</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our service uses Groq AI technology for generating greeting card messages. When you generate a card, your input is sent to Groq's servers for processing. Please refer to Groq's privacy policy for information about how they handle data. We also use Vercel for hosting our application, and their privacy practices apply to the hosting infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">6. Cookies and Tracking</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We use essential cookies and similar tracking technologies to ensure the proper functioning of our service. These technologies help us remember your preferences and provide a personalized experience. For more information about our use of cookies, please see our Cookies Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">7. Your Rights and Choices</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                You have the following rights regarding your information:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                <li><strong>Access:</strong> You can view your saved cards and preferences directly in the application</li>
                <li><strong>Deletion:</strong> You can delete your cards at any time using the delete function</li>
                <li><strong>Clear Data:</strong> You can clear all stored data using the clear function in the gallery</li>
                <li><strong>Browser Settings:</strong> You can clear localStorage through your browser settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">8. Children's Privacy</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">9. Changes to This Policy</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">10. Contact Us</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our website or reach out to our support team. We are committed to addressing your concerns and providing transparent information about our data practices.
              </p>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/privacy" className="text-sm text-purple-600 dark:text-purple-400 font-medium">Privacy Policy</Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Link href="/terms" className="text-sm text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors">Terms of Use</Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Link href="/disclaimer" className="text-sm text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors">Disclaimer</Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Link href="/cookies" className="text-sm text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors">Cookies Policy</Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
