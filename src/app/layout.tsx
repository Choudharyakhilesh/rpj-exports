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
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TVP6BH78');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TVP6BH78"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
