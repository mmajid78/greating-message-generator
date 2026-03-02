'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Gift,
  Moon,
  Sun,
  ChevronUp,
  Lock,
  Database,
  UserCheck,
  Cookie,
  Globe,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
      id: 'collect',
      icon: Database,
      title: 'Information We Collect',
      content: `At Greeting Message Generator, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.

**Personal Information:**
We collect minimal personal information necessary to provide our service. This includes the names you enter for greeting cards (recipient name and sender name), which are used solely for personalizing your greeting cards. We also collect usage data in an anonymous form to help improve our service quality and user experience. Your preferences such as theme, language, and font settings are stored locally on your device to enhance your experience.

**Information We Do NOT Collect:**
We take your privacy seriously. We do not store your generated cards on our servers. We do not sell, rent, or share your personal information with third parties for marketing purposes. We do not track you across other websites or applications. We do not collect sensitive personal data such as financial information, health records, or government IDs.`,
    },
    {
      id: 'usage',
      icon: UserCheck,
      title: 'How We Use Your Information',
      content: `Your information is used exclusively to provide and improve our greeting card generation service.

**Primary Uses:**
Your names and preferences are used to generate personalized greeting cards using our AI technology. We use anonymous usage statistics to understand how users interact with our service and make improvements accordingly. Your preferences are saved locally to provide a consistent experience across sessions.

**AI Processing:**
When you generate a greeting card, your input is sent to Groq AI for processing. This data is transmitted securely and is not stored by us after processing. Groq AI may temporarily process your data according to their own privacy policy.

**No Marketing:**
We do not use your personal information for marketing purposes. We do not send promotional emails or advertisements. We do not create user profiles for advertising targeting.`,
    },
    {
      id: 'storage',
      icon: Lock,
      title: 'Data Storage & Security',
      content: `All card data and user preferences are stored locally in your browser's localStorage, not on our servers.

**Local Storage Benefits:**
Your data never leaves your device unless you explicitly share it through the sharing features. You have full control over your data at all times. Clearing your browser data will remove your saved cards and preferences. This approach provides maximum privacy as we cannot access your stored data.

**Security Measures:**
We implement industry-standard security practices. All data transmission between your browser and our servers is encrypted using HTTPS. Our hosting provider (Vercel) maintains robust security infrastructure. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.

**Data Retention:**
Since we do not store your data on our servers, there is no data retention period on our end. Your data remains on your device until you choose to delete it through your browser settings or our "Clear All" feature.`,
    },
    {
      id: 'third-party',
      icon: Globe,
      title: 'Third-Party Services',
      content: `We use the following third-party services to operate our greeting card generator:

**Groq AI:**
Groq AI provides the artificial intelligence that generates your greeting card messages. When you create a card, your input (names, occasion, tone preferences) is sent to Groq's servers for processing. Groq AI processes this data according to their own privacy policy and terms of service.

**Vercel:**
Our application is hosted on Vercel's platform. Vercel may collect technical information about your visit for security and performance purposes. Vercel's privacy policy governs their data practices.

**Social Media Platforms:**
When you use our social sharing features, the respective platforms (WhatsApp, Facebook, X, Instagram, TikTok, Snapchat) will process your shared content according to their own privacy policies.`,
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: 'Cookies & Local Storage',
      content: `We use localStorage (similar to cookies) for essential functions only.

**What We Store Locally:**
Your generated greeting cards are stored locally so you can access them later. Your form preferences (language, tone, theme, font) are saved for convenience. Your dark mode preference is remembered across sessions. Your accessibility settings (font size, high contrast, reduced motion) are preserved.

**What We Do NOT Use:**
We do NOT use third-party tracking cookies. We do NOT use advertising cookies. We do NOT use analytics cookies that track you across sites. We do NOT use social media tracking cookies.

**Managing Your Data:**
You can clear your stored data at any time by using our "Clear All Cards" feature, clearing your browser cache and cookies, or opening browser developer tools and clearing localStorage manually.`,
    },
    {
      id: 'rights',
      icon: Shield,
      title: 'Your Rights',
      content: `You have certain rights regarding your personal information:

**Access and Control:**
You can view your data at any time through your browser's developer tools (localStorage). You have full control over your data since it's stored on your device.

**Deletion:**
You can delete your data at any time by using our "Clear All Cards" feature, clearing your browser data, or uninstalling/clearing the app data.

**Portability:**
You can export your cards using our export feature, which downloads your data in JSON format.

**Opt-Out:**
Since we don't track users or use marketing cookies, there's nothing to opt out of. Your data stays on your device.

**Regional Rights:**
Depending on your location (such as GDPR in Europe or CCPA in California), you may have additional rights. Contact us through our GitHub repository for any data-related requests.`,
    },
    {
      id: 'children',
      icon: UserCheck,
      title: "Children's Privacy",
      content: `Our service is not intended for children under the age of 13.

We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information. Parents and guardians should monitor their children's internet use and help protect their privacy online.

If you believe a child under 13 has provided us with personal information, please contact us immediately through our GitHub repository, and we will work to resolve the situation.`,
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contact Us',
      content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us through our GitHub repository:

**GitHub Repository:** https://github.com/mmajid78/greating-message-generator

We will make every effort to respond to your inquiry in a timely manner. For data deletion requests or other privacy concerns, please include "Privacy Request" in your communication subject line.`,
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
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
            <Link href="/privacy" className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              Privacy Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link href="/terms" className="text-sm text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
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
