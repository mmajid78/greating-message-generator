'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Cookie,
  Gift,
  Moon,
  Sun,
  ChevronUp,
  Database,
  Settings,
  Trash2,
  Eye,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CookiesPolicyPage() {
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
      id: 'what-are-cookies',
      icon: Cookie,
      title: 'What Are Cookies?',
      content: `Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.

**How Cookies Work:**
When you visit a website, the server may send a cookie to your browser. Your browser stores this cookie on your device. When you return to the same website, your browser sends the cookie back to the server. This allows the website to recognize you and remember your preferences.

**Types of Cookies:**
Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device for a set period or until you delete them. First-party cookies are set by the website you're visiting. Third-party cookies are set by other websites through the site you're visiting (often for tracking purposes).`,
    },
    {
      id: 'how-we-use',
      icon: Database,
      title: 'How We Use Cookies & Local Storage',
      content: `Our greeting card generator uses localStorage and cookies to enhance your experience. Here's a detailed breakdown of what we store and why:

**Essential Storage:**
We use localStorage (a technology similar to cookies) for essential functions that make the Service work properly. This includes storing your generated greeting cards so you can access them later, remembering your form preferences like language and tone selections, keeping track of your theme preference (light or dark mode), and saving your accessibility settings for font size, high contrast, and reduced motion options.

**Why LocalStorage:**
We primarily use localStorage instead of traditional HTTP cookies because localStorage provides more storage capacity than cookies, data stays entirely on your device, we cannot access this data from our servers, and you have complete control over your data at all times.`,
    },
    {
      id: 'storage-details',
      icon: Settings,
      title: 'Detailed Storage Information',
      content: `The following table shows exactly what data we store locally on your device:

**birthdayCards:**
Purpose: Stores all your generated greeting cards including message, recipient name, sender name, occasion, tone, theme, and timestamp. Duration: Persists until you clear it. Location: Browser localStorage.

**userPreferences:**
Purpose: Remembers your preferred settings like language, tone, theme, font, and creativity level. Duration: Persists until you clear it. Location: Browser localStorage.

**darkMode:**
Purpose: Stores your theme preference for light or dark mode. Duration: Persists until you change it or clear browser data. Location: Browser localStorage.

**accessibilitySettings:**
Purpose: Saves your accessibility preferences including font size, high contrast mode, reduced motion, and dyslexia font settings. Duration: Persists until you change or clear it. Location: Browser localStorage.`,
    },
    {
      id: 'no-tracking',
      icon: Eye,
      title: 'No Tracking Cookies',
      content: `We are committed to protecting your privacy. Unlike many websites, we do NOT use:

**What We Don't Use:**
Third-party tracking cookies that follow you across the web. Advertising cookies from ad networks. Analytics cookies that track your behavior across multiple websites. Social media tracking cookies from platforms like Facebook or Google. Fingerprinting technologies that identify your device without cookies. Session recording or heat mapping tools that record your actions.

**Why This Matters:**
Your browsing habits are not tracked or monitored. Your data is not sold to advertisers or third parties. You won't see targeted ads based on your usage of our Service. Your privacy is respected while you use our greeting card generator.`,
    },
    {
      id: 'third-party',
      icon: Shield,
      title: 'Third-Party Cookies',
      content: `While we don't set third-party cookies ourselves, our Service does use third-party services that may employ their own cookies:

**Groq AI:**
Used for generating your greeting card messages. They may process your input according to their privacy policy. We recommend reviewing Groq's privacy policy for details on their data practices.

**Vercel:**
Our hosting provider that ensures the Service is available and performs well. They may use cookies for security and performance monitoring. Vercel's privacy policy governs their cookie practices.

**Social Media Platforms:**
When you use our social sharing features, those platforms (WhatsApp, Facebook, X, Instagram, TikTok, Snapchat) may set their own cookies according to their policies. We have no control over these third-party cookies and recommend reviewing each platform's privacy policy.`,
    },
    {
      id: 'manage-data',
      icon: Trash2,
      title: 'Managing Your Data',
      content: `You have complete control over your stored data. Here are all the ways you can manage, view, or delete your information:

**Within Our Service:**
Use the "Clear All Cards" button in the gallery to remove all saved greeting cards. Use the "Reset to Defaults" button in the accessibility panel to clear accessibility settings. Toggle dark mode or other settings to change your preferences.

**Through Your Browser:**
Clear your browser cache and cookies through browser settings. Open Developer Tools (F12), go to Application > Local Storage, and delete specific entries. Use your browser's "Clear browsing data" feature to remove all stored data. Browse in incognito or private mode for sessions where no data is saved.

**Mobile Devices:**
Clear app data through your device settings. Use private browsing mode. Clear browser history and website data through system settings.`,
    },
    {
      id: 'browser-settings',
      icon: Settings,
      title: 'Browser Cookie Settings',
      content: `Most modern browsers allow you to control how cookies are handled. Here's how to manage cookies in popular browsers:

**Google Chrome:**
Go to Settings > Privacy and security > Cookies and other site data. You can block all cookies, block third-party cookies, or clear cookies on exit. You can also add specific sites to allow or block lists.

**Mozilla Firefox:**
Go to Settings > Privacy & Security. Under Cookies and Site Data, choose your preferred settings. You can delete cookies and site data when Firefox closes.

**Safari:**
Go to Preferences > Privacy. You can block all cookies or prevent cross-site tracking. Safari also offers Intelligent Tracking Prevention.

**Microsoft Edge:**
Go to Settings > Cookies and site permissions. Manage cookies and site data with granular controls. Block third-party cookies or clear browsing data on exit.

**Important Note:**
Blocking all cookies may affect the functionality of our Service. Some features require local storage to work properly. If you block cookies, you may lose saved cards and preferences between sessions.`,
    },
    {
      id: 'effects',
      icon: HelpCircle,
      title: 'Effects of Disabling Cookies',
      content: `If you choose to disable cookies or localStorage, please be aware of how it may affect your experience:

**Features That Require Storage:**
Generated greeting cards will not be saved between sessions. Your form preferences will reset each time you visit. Theme and accessibility settings won't be remembered. Your card history and saved cards will not persist.

**Features That Still Work:**
You can still generate greeting cards normally. All customization options are still available. You can copy, share, and export cards immediately. Dark mode can be set manually during your session.

**Recommendations:**
If you prefer not to use persistent storage, consider exporting important cards before leaving the Service. Take screenshots of cards you want to keep. Use the share features to save cards to other platforms or apps.`,
    },
    {
      id: 'your-rights',
      icon: Shield,
      title: 'Your Rights & Choices',
      content: `You have the following rights regarding your data and cookies:

**Right to Access:**
You can view your stored data through browser developer tools. All your data is accessible and transparent.

**Right to Delete:**
You can delete your data at any time using our built-in features or browser tools. No special request is needed - you have direct control.

**Right to Object:**
You can object to data processing by simply not using the Service or clearing your data. Since we don't process your data on our servers, there's nothing to object to.

**Right to Portability:**
You can export your cards in JSON format using our export feature. Your data is yours to take with you.

**No Consent Required:**
Since we don't use tracking cookies, no cookie consent pop-up is required. We don't profile users or track behavior for advertising. Your data stays on your device by default.`,
    },
    {
      id: 'updates',
      icon: Cookie,
      title: 'Changes to This Policy',
      content: `We may update this Cookies Policy from time to time to reflect changes in technology, legislation, or our data practices.

**Notification of Changes:**
The "Last Updated" date at the top will be revised when changes are made. For significant changes, we may provide additional notice through the Service. Continued use of the Service after changes constitutes acceptance of the updated policy.

**Reviewing the Policy:**
We encourage you to review this policy periodically. Bookmark this page for easy reference. Contact us through our GitHub repository if you have questions about any changes.

**Version History:**
Previous versions of this policy may be available upon request through our GitHub repository. Major changes will be documented in our commit history.`,
    },
    {
      id: 'contact',
      icon: Gift,
      title: 'Contact Us',
      content: `If you have any questions about our use of cookies, localStorage, or this Cookies Policy, please contact us through our GitHub repository:

**GitHub Repository:** https://github.com/mmajid78/greating-message-generator

**When Contacting Us:**
Please include "Cookies Policy Question" in your subject line. Provide as much detail as possible about your question or concern. We will make every effort to respond promptly.

**Additional Resources:**
For more information about cookies and online privacy, visit your browser's help documentation. Consider using privacy-focused browser extensions if desired. Review privacy settings on your devices regularly.`,
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
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Cookies Policy
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Learn about how we use cookies and local storage to improve your experience.
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
            <Link href="/terms" className="text-sm text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Terms of Use
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link href="/disclaimer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Disclaimer
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link href="/cookies" className="text-sm text-purple-600 dark:text-purple-400 font-medium">
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
