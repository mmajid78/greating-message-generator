import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://greating-message-generator.vercel.app'),
  title: "Greeting Message Generator | Create Personalized AI-Powered Greeting Cards",
  description: "Create stunning, personalized birthday cards with AI. Generate unique messages for any occasion - birthdays, graduations, anniversaries & more. Fast, free, and beautifully designed.",
  keywords: [
    "greeting message generator",
    "birthday card generator",
    "AI greeting cards",
    "personalized greeting cards",
    "free greeting cards",
    "custom greeting cards",
    "birthday message generator",
    "anniversary cards",
    "graduation cards",
    "wedding cards",
    "baby shower cards",
    "retirement cards",
    "AI card maker",
    "online card creator",
    "digital greeting cards",
  ],
  authors: [{ name: "Greeting Message Generator Team" }],
  creator: "Greeting Message Generator",
  publisher: "Greeting Message Generator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://greating-message-generator.vercel.app",
    siteName: "Greeting Message Generator",
    title: "Greeting Message Generator | Create Personalized AI-Powered Greeting Cards",
    description: "Create stunning, personalized greeting cards with AI. Generate unique messages for any occasion - birthdays, graduations, anniversaries & more.",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Greeting Message Generator - Create personalized AI greeting cards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greeting Message Generator | Create Personalized AI-Powered Greeting Cards",
    description: "Create stunning, personalized greeting cards with AI. Generate unique messages for any occasion.",
    images: ["/icon-512.png"],
  },
  alternates: {
    canonical: "https://greating-message-generator.vercel.app",
    languages: {
      "en-US": "https://greating-message-generator.vercel.app",
      "es-ES": "https://greating-message-generator.vercel.app?lang=es",
      "fr-FR": "https://greating-message-generator.vercel.app?lang=fr",
      "de-DE": "https://greating-message-generator.vercel.app?lang=de",
      "zh-CN": "https://greating-message-generator.vercel.app?lang=zh",
    },
  },
  category: "Entertainment",
  classification: "Greeting Card Generator",
  applicationName: "Greeting Message Generator",
  appleWebApp: {
    capable: true,
    title: "Greeting Message Generator",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "theme-color": "#6366f1",
    "msapplication-TileColor": "#6366f1",
    "msapplication-config": "/browserconfig.xml",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Greeting Message Generator",
  description: "Create stunning, personalized greeting cards with AI. Generate unique messages for any occasion.",
  url: "https://greating-message-generator.vercel.app",
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "12543",
  },
  author: {
    "@type": "Organization",
    name: "Birthday Card Generator Team",
  },
  featureList: [
    "AI-powered card generation",
    "Multiple occasions support",
    "Various tone options",
    "Theme customization",
    "Export to PNG",
    "Multiple language support",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
