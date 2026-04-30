import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

// Static JSON-LD schema to prevent hydration mismatches
const JSON_LD_SCHEMA = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ballouard-atelier.com/#person",
      "name": "Ludovic Ballouard",
      "jobTitle": "Independent Watchmaker",
      "description": "Independent watchmaker creating hand-crafted timepieces in the Geneva countryside since 2009.",
      "birthPlace": {
        "@type": "Place",
        "name": "Brittany, France"
      },
      "knowsAbout": ["Haute Horlogerie", "Watch Complications", "Hand Engraving"],
      "alumniOf": [
        { "@type": "Organization", "name": "F.P. Journe" },
        { "@type": "Organization", "name": "Franck Muller" }
      ],
      "url": "https://ballouard-atelier.com"
    },
    {
      "@type": "Organization",
      "@id": "https://ballouard-atelier.com/#organization",
      "name": "Ballouard Atelier",
      "description": "Independent watchmaking atelier in the Geneva countryside, creating hand-crafted timepieces with unique complications.",
      "url": "https://ballouard-atelier.com",
      "founder": { "@id": "https://ballouard-atelier.com/#person" },
      "location": {
        "@type": "Place",
        "name": "Geneva Countryside, Switzerland"
      }
    },
    {
      "@type": "Product",
      "@id": "https://ballouard-atelier.com/#upsidedown",
      "name": "UPSIDE DOWN",
      "description": "Timepiece where all hour numerals are upside down except the current hour. Past and future literally inverted.",
      "brand": { "@id": "https://ballouard-atelier.com/#organization" },
      "material": "Hand-engraved case, in-house calibre B01",
      "productionDate": "2009"
    },
    {
      "@type": "Product",
      "@id": "https://ballouard-atelier.com/#halftime",
      "name": "HALF TIME",
      "description": "Timepiece where hour numerals are split in half across two discs. Only the current hour is complete.",
      "brand": { "@id": "https://ballouard-atelier.com/#organization" },
      "material": "Hand-engraved case, patented complication",
      "productionDate": "2013"
    },
    {
      "@type": "WebSite",
      "@id": "https://ballouard-atelier.com/#website",
      "url": "https://ballouard-atelier.com",
      "name": "Ballouard Atelier",
      "publisher": { "@id": "https://ballouard-atelier.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://ballouard-atelier.com/#webpage",
      "url": "https://ballouard-atelier.com",
      "name": "Ludovic Ballouard — Atelier Geneva",
      "isPartOf": { "@id": "https://ballouard-atelier.com/#website" },
      "about": { "@id": "https://ballouard-atelier.com/#person" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "contentUrl": "https://ballouard-atelier.com/og-image.jpg"
      }
    }
  ]
}`;

export const metadata: Metadata = {
  title: "Ludovic Ballouard — Atelier Geneva | Independent Watchmaker",
  description: "Only the present moment has a meaning. Ludovic Ballouard creates hand-crafted timepieces in the Geneva countryside. The UPSIDE DOWN and HALF TIME collections reinterpret how we perceive time.",
  keywords: ["Ludovic Ballouard", "independent watchmaker", "Geneva", "haute horlogerie", "Upside Down watch", "Half Time watch", "hand-crafted timepieces"],
  authors: [{ name: "Ludovic Ballouard" }],
  creator: "Velocity Agency",
  publisher: "Velocity Agency",
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
  openGraph: {
    title: "Ludovic Ballouard — Atelier Geneva",
    description: "Only the present moment has a meaning. Hand-crafted timepieces in the Geneva countryside.",
    url: "https://ballouard-atelier.com",
    siteName: "Ballouard Atelier",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ludovic Ballouard — Atelier Geneva",
    description: "Only the present moment has a meaning. Hand-crafted timepieces in the Geneva countryside.",
  },
  alternates: {
    canonical: "https://ballouard-atelier.com",
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD_SCHEMA }}
          suppressHydrationWarning
        />
      </head>
      <body suppressHydrationWarning>
        <CustomCursor />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
