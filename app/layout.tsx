import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "https://phec.astreak.in",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_IN",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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
        <meta
          name="google-site-verification"
          content="6EVpVJ_CRnajBz5bw0UdB5_IFi-YPnpOtAyYqR9zHnQ"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-S10WVS5Q1J"
        ></script>
        
      </head>
      <body>{children}</body>
    </html>
  );
}
