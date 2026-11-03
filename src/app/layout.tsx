import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Manrope, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'RPJ Exports — Guar Seeds, Splits, Guar Gum & Feed By-Products from India',
    template: '%s · RPJ Exports',
  },
  description:
    'RPJ Exports is a Jaipur, Rajasthan-based export and sourcing company supplying guar seeds, guar splits, food and industrial grade guar gum, guar dust, churi and korma to global buyers.',
  icons: { icon: '/favicon.ico', apple: '/brand/rpj-mark.png' },
};

export const viewport: Viewport = {
  themeColor: '#0a1a2f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable} ${mono.variable}`}>
      <body>
        {children}

        {/* Google Analytics */}
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
