'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Gift,
  Moon,
  Sun,
  ChevronUp,
  Scale,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Ban,
  RefreshCw,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function TermsOfUsePage() {
  const [isDark, setIsDark] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Initialize dark mode from localStorage
    const savedDark = localStorage.getItem('darkMode');
    if (savedDark !== null) {
      const isDarkMode = savedDark === 'true';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle('dark', isDarkMode);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDark = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      document.documentElement.classList.toggle('dark', newValue);
      localStorage.setItem('darkMode', String(newValue));
      return newValue;
    });
  };

  const sections = [
    {
      id: 'acceptance',
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: `By accessing and using Greeting Message Generator ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.

These Terms of Use constitute a legally binding agreement between you and the Service regarding your use of the Service. Your use of the Service is also governed by our Privacy Policy and Cookies Policy, which are incorporated into these Terms by reference.

By using the Service, you represent that you are at least 13 years of age and have the legal capacity to enter into this agreement. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.`,
    },
    {
      id: 'description',
      icon: Gift,
      title: 'Description of Service',
      content: `The Service provides AI-powered greeting card message generation for personal and non-commercial use. Our platform allows you to create personalized greeting card messages using artificial intelligence technology powered by Groq AI.

**Features Include:**
Generate personalized greeting card messages for various occasions including birthdays, anniversaries, graduations, holidays, and many more special events. Customize cards with various themes, tones, languages, and styles to match your preferences. Save, edit, copy, and share generated cards through various channels including social media and messaging applications. Export card data for personal backup and record-keeping purposes.

**Service Availability:**
We strive to maintain high availability of the Service, but we do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or technical issues. We reserve the right to modify or discontinue any feature of the Service at any time without notice.`,
    },
    {
      id: 'responsibilities',
      icon: Scale,
      title: 'User Responsibilities',
      content: `As a user of the Service, you agree to comply with the following responsibilities and restrictions:

**You Agree To:**
Use the Service only for lawful purposes and in accordance with these Terms. Provide accurate information when using the Service. Respect the intellectual property rights of others. Report any violations or inappropriate content to us through our GitHub repository. Use the Service in a manner that does not interfere with its operation or other users' enjoyment.

**You Agree NOT To:**
Generate content that is harmful, illegal, defamatory, or infringes on others' rights. Attempt to overload, abuse, or disrupt our systems or servers. Use the Service for spam, harassment, or any form of abuse. Attempt to reverse engineer, decompile, or extract source code from the Service. Use automated systems or bots to access the Service without permission. Impersonate any person or entity or misrepresent your affiliation. Generate content that promotes discrimination, hate speech, or violence.`,
    },
    {
      id: 'intellectual',
      icon: Shield,
      title: 'Intellectual Property',
      content: `The following terms govern intellectual property rights related to the Service:

**Generated Content:**
You own the greeting cards you generate using the Service and are free to use them as you wish for personal purposes. You may share, print, and distribute your generated cards. You are responsible for ensuring your use of generated content complies with applicable laws.

**Service Content:**
The Service's design, code, interface, graphics, and original content remain our exclusive property. You may not copy, modify, distribute, or create derivative works based on the Service without our written permission. All trademarks, logos, and service marks displayed on the Service are our property or the property of third parties.

**AI-Generated Content:**
Content generated by artificial intelligence may not be copyrightable in some jurisdictions. The legal status of AI-generated content varies by location. We make no claims regarding the copyright status of generated content. You should consult legal counsel if you intend to use generated content commercially.`,
    },
    {
      id: 'warranty',
      icon: XCircle,
      title: 'Disclaimer of Warranties',
      content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:

**No Implied Warranties:**
Implied warranties of merchantability are disclaimed to the fullest extent permitted by law. Implied warranties of fitness for a particular purpose are disclaimed. Implied warranties of non-infringement are disclaimed.

**No Guarantee of Results:**
We do not guarantee that the Service will meet your specific requirements. We do not guarantee that the Service will be uninterrupted, timely, secure, or error-free. We do not guarantee the accuracy, reliability, or quality of any generated content. We do not guarantee that any errors will be corrected.

**Third-Party Services:**
We are not responsible for the performance or availability of third-party services used in the Service, including Groq AI for message generation and Vercel for hosting. Your use of third-party services is subject to their respective terms and policies.`,
    },
    {
      id: 'liability',
      icon: AlertTriangle,
      title: 'Limitation of Liability',
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY:

**Types of Damages:**
Indirect, incidental, special, consequential, or punitive damages. Damages for loss of profits, goodwill, use, data, or other intangible losses. Damages resulting from your use or inability to use the Service. Damages resulting from any content obtained from the Service. Damages resulting from unauthorized access to your data.

**Limitation:**
Our total liability for any claim arising from the Service shall not exceed the amount you paid to us for the Service (which is $0 for free usage). We are not responsible for any content created, shared, or stored using the Service. You assume full responsibility for your use of the Service.

**Exceptions:**
Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded or limited under applicable law.`,
    },
    {
      id: 'indemnification',
      icon: RefreshCw,
      title: 'Indemnification',
      content: `You agree to indemnify, defend, and hold harmless the Service, its owners, operators, affiliates, and partners from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from:

**Covered Claims:**
Your use of the Service. Your violation of these Terms of Use. Your violation of any rights of another party. Your violation of any applicable laws or regulations. Content you generate or share through the Service. Your infringement of any intellectual property rights.

**Defense Obligations:**
You agree to cooperate fully with us in the defense of any claim. We reserve the right to assume exclusive defense of any matter subject to indemnification. We reserve the right to settle any claim without your consent.`,
    },
    {
      id: 'modifications',
      icon: Ban,
      title: 'Modifications to Service & Terms',
      content: `We reserve the following rights regarding modifications:

**Service Modifications:**
We may modify, suspend, or discontinue any aspect of the Service at any time without notice. We may update features, functionality, or content of the Service. We may change pricing or introduce new pricing models (if applicable) with reasonable notice.

**Terms Modifications:**
We may update these Terms of Use at any time by posting revised Terms on this page. Your continued use of the Service after changes constitutes acceptance of the modified Terms. We encourage you to review these Terms periodically.

**Notice of Changes:**
Material changes will be indicated by updating the "Last Updated" date above. For significant changes, we may provide additional notice through the Service. It is your responsibility to check for updates to these Terms.`,
    },
    {
      id: 'termination',
      icon: XCircle,
      title: 'Termination',
      content: `The following terms govern termination of your access to the Service:

**Termination by Us:**
We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including breach of these Terms. We may terminate or suspend access for conduct we determine to be harmful to the Service or other users.

**Termination by You:**
You may stop using the Service at any time. You may clear your data from the Service using browser tools.

**Effect of Termination:**
Upon termination, your right to use the Service will immediately cease. Provisions of these Terms that by their nature should survive termination shall survive. These include intellectual property provisions, warranty disclaimers, liability limitations, and indemnification obligations.`,
    },
    {
      id: 'governing',
      icon: Scale,
      title: 'Governing Law & Disputes',
      content: `These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.

**Dispute Resolution:**
Any disputes arising from these Terms or the Service should first be addressed through informal communication via our GitHub repository. We prefer to resolve disputes amicably through direct communication.

**Jurisdiction:**
You agree to submit to the personal jurisdiction of the courts located in the jurisdiction governing these Terms. You waive any objection to venue in those courts.

**Severability:**
If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect. Any unenforceable provision will be modified to reflect the parties' intent to the maximum extent permitted by law.`,
    },
    {
      id: 'contact',
      icon: Gift,
      title: 'Contact Information',
      content: `If you have questions about these Terms of Use, please contact us through our GitHub repository:

**GitHub Repository:** https://github.com/mmajid78/greating-message-generator

When contacting us about these Terms, please include "Terms of Use Inquiry" in your communication subject line. We will make every effort to respond to your inquiry in a timely manner.

**Acknowledgment:**
By using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our related policies including the Privacy Policy, Disclaimer, and Cookies Policy.`,
    },
  ];

  return (
    <div className={cn('min-h-screen gradient-bg dark:from-slate-900 dark:via-slate-800 dark:to-slate-900')}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl dark:text-white">CardGen AI</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="dark:text-slate-200">
                ← Back to App
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="rounded-full dark:text-slate-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Terms of Use
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Please read these terms carefully before using our greeting card generator service.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Last updated: January 1, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Table of Contents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-1"
                  >
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold dark:text-white">{section.title}</h2>
                </div>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {section.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {paragraph.split('\n').map((line, j) => (
                        <span key={j}>
                          {line.startsWith('**') && line.endsWith('**') ? (
                            <strong className="dark:text-white">{line.replace(/\*\*/g, '')}</strong>
                          ) : (
                            line
                          )}
                          {j < paragraph.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-50 dark:bg-slate-800 border-t dark:border-slate-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <Link href="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link href="/terms" className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              Terms of Use
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link href="/disclaimer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Disclaimer
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link href="/cookies" className="text-sm text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Cookies Policy
            </Link>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-xs">
            © 2026 CardGen AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
