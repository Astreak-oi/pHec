import { Metadata } from "next";
import "../styles/globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const nameAiConfig = {
  title: "Get Unique Name by AI",
  description: "Generate Names for your Startup or Business",
  url: "https://phec.astreak.in/name-ai",
};

export const metadata: Metadata = {
  metadataBase: new URL(nameAiConfig.url),
  title: {
    default: nameAiConfig.title,
    template: `%s - ${nameAiConfig.title}`,
  },
  description: nameAiConfig.description,
  openGraph: {
    title: nameAiConfig.title,
    description: nameAiConfig.description,
    url: nameAiConfig.url,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: nameAiConfig.title,
      },
    ],
    locale: "en_IN",
    siteName: nameAiConfig.title,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: nameAiConfig.title,
    description: nameAiConfig.description,
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
