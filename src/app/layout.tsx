import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'RPJ Exports — Guar Seeds, Splits, Guar Gum & Feed By-Products from India',
    template: '%s · RPJ Exports',
  },
  description:
    'RPJ Exports is a Jaipur, Rajasthan-based export and sourcing company supplying guar seeds, guar splits, food and industrial grade guar gum, guar dust, churi and korma to global buyers.',
  icons: {
    icon: '/favicon.ico',
    apple: '/brand/rpj-mark.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a1a2f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RVH87K29JD"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RVH87K29JD');
          `}
        </Script>
      </body>
    </html>
  );
}
