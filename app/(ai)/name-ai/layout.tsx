import { Metadata } from "next";
import "@/styles/globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteConfig } from "@/config/site";


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.nameAi.url),
  title: siteConfig.nameAi.title,
  description: siteConfig.nameAi.description,
  openGraph: {
    title: siteConfig.nameAi.title,
    description: siteConfig.nameAi.description,
    url: siteConfig.nameAi.url,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.nameAi.title,
      },
    ],
    locale: "en_IN",
    siteName: siteConfig.nameAi.title,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.nameAi.title,
    description: siteConfig.nameAi.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
