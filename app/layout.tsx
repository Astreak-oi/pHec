import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import '../styles/globals.css';

const title = 'Get Idea Rating & Feedback By AI';
const description = 'We&apos;ll analyze your idea and provide ratings, feedback and suggestions';

export const metadata: Metadata = {
  metadataBase: new URL('https://phec.vercel.app'),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

