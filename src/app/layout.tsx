import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://birthday-card-generator.app'),
  title: "Birthday Card Generator | Create Personalized AI-Powered Greeting Cards",
  description: "Create stunning, personalized birthday cards with AI. Generate unique messages for any occasion - birthdays, graduations, anniversaries & more. Fast, free, and beautifully designed.",
  keywords: [
    "birthday card generator",
    "AI greeting cards",
    "personalized birthday cards",
    "free birthday cards",
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
  authors: [{ name: "Birthday Card Generator Team" }],
  creator: "Birthday Card Generator",
  publisher: "Birthday Card Generator",
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
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://birthday-card-generator.app",
    siteName: "Birthday Card Generator",
    title: "Birthday Card Generator | Create Personalized AI-Powered Greeting Cards",
    description: "Create stunning, personalized birthday cards with AI. Generate unique messages for any occasion - birthdays, graduations, anniversaries & more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Birthday Card Generator - Create personalized AI greeting cards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Birthday Card Generator | Create Personalized AI-Powered Greeting Cards",
    description: "Create stunning, personalized birthday cards with AI. Generate unique messages for any occasion.",
    images: ["/og-image.png"],
    creator: "@birthdaycardgen",
  },
  alternates: {
    canonical: "https://birthday-card-generator.app",
    languages: {
      "en-US": "https://birthday-card-generator.app",
      "es-ES": "https://birthday-card-generator.app?lang=es",
      "fr-FR": "https://birthday-card-generator.app?lang=fr",
      "de-DE": "https://birthday-card-generator.app?lang=de",
      "zh-CN": "https://birthday-card-generator.app?lang=zh",
    },
  },
  category: "Entertainment",
  classification: "Greeting Card Generator",
  applicationName: "Birthday Card Generator",
  appleWebApp: {
    capable: true,
    title: "Birthday Card Generator",
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
  name: "Birthday Card Generator",
  description: "Create stunning, personalized birthday cards with AI. Generate unique messages for any occasion.",
  url: "https://birthday-card-generator.app",
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
      </body>
    </html>
  );
}
