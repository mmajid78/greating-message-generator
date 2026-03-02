'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsOfUse() {
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
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white">Terms of Use</h1>
          </div>

          <p className="text-slate-500 dark:text-slate-400 mb-8">
            <strong>Last Updated: January 1, 2026</strong>
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                By accessing and using CardGen AI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service. These Terms of Use apply to all visitors, users, and others who access or use the Service. Your use of the Service is also governed by our Privacy Policy and Cookies Policy, which are incorporated into these Terms by reference.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">2. Description of Service</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                CardGen AI is an AI-powered greeting card generation service that allows users to create personalized greeting cards for various occasions. The Service uses artificial intelligence to generate custom messages based on user inputs. The Service is provided free of charge and is intended for personal, non-commercial use unless otherwise specified.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">3. User Responsibilities</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                When using our Service, you agree to the following responsibilities:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                <li>Provide accurate and truthful information when generating cards</li>
                <li>Use the Service only for lawful purposes and in accordance with these Terms</li>
                <li>Not generate content that is harmful, offensive, discriminatory, or illegal</li>
                <li>Not attempt to interfere with or disrupt the Service or servers</li>
                <li>Not use automated systems or software to extract data from the Service</li>
                <li>Respect the intellectual property rights of others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">4. Intellectual Property</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The Service and its original content, features, and functionality are owned by CardGen AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. The greeting cards you generate are for your personal use. You retain ownership of the personal content you input, but grant us a license to process that content through our AI system to generate your cards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">5. User-Generated Content</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                You are responsible for the content you input into the Service. You agree not to input content that infringes on the rights of others, is defamatory, obscene, offensive, or otherwise inappropriate. We do not claim ownership of your generated cards, but you acknowledge that similar cards may be generated for other users based on similar inputs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. To the fullest extent permitted by law, we disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the Service will be uninterrupted, secure, or error-free. In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">7. AI-Generated Content Disclaimer</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The greeting cards generated by our Service are created using artificial intelligence. While we strive to provide high-quality, appropriate content, we cannot guarantee the accuracy, appropriateness, or quality of AI-generated messages. You are responsible for reviewing and approving all generated content before sharing or using it. Some generated content may inadvertently be similar to existing works, and we are not responsible for any such similarities.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">8. Modifications to Service</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service. We may also update these Terms of Use from time to time. Your continued use of the Service after any changes indicates your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">9. Termination</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease. Since we do not store user data on our servers, termination does not affect cards stored locally on your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">10. Governing Law</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved through arbitration or in the courts of the applicable jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold dark:text-white mb-4">11. Contact Information</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                If you have any questions about these Terms of Use, please contact us through our website. We appreciate your feedback and are committed to providing a positive experience for all users of our Service.
              </p>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/privacy" className="text-sm text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Link href="/terms" className="text-sm text-purple-600 dark:text-purple-400 font-medium">Terms of Use</Link>
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
