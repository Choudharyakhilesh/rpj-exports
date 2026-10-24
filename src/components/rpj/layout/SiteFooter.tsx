'use client';

import { COMPANY, PRODUCTS } from '@/lib/rpj/catalog';
import { useSettings } from '@/lib/rpj/use-settings';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About us', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
  // { label: 'Privacy policy', href: '/privacy-policy' },
];

const SOCIAL_LINKS = [
  {
    key: 'instagram_url',
    label: 'Instagram',
    href: 'https://www.instagram.com/rpj.exports/',
    Icon: Instagram,
  },
  {
    key: 'linkedln_url',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/rpj-exports/',
    Icon: Linkedin,
  },
];

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const { email, socials } = useSettings();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const wordY = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const wordOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <footer ref={ref} className="grain relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="shell relative">
        {/* <div className="flex flex-col items-start justify-between gap-10 border-b border-cream/10 pb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-gold-bright">Start a conversation</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl">
              Have a specification in mind? <em className="text-gold-bright">Let&apos;s source it.</em>
            </h2>
          </div>
          <Magnetic>
            <button
              onClick={openDrawer}
              className="group grid h-36 w-36 place-items-center rounded-full bg-gold text-center text-sm font-semibold text-ink transition-colors hover:bg-gold-bright md:h-44 md:w-44"
            >
              <span className="flex flex-col items-center gap-2">
                <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
                Send enquiry
              </span>
            </button>
          </Magnetic>
        </div> */}

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/brand/rpj-logo-light.png"
              alt="RPJ Exports"
              width={160}
              height={107}
              className="h-auto w-32"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              Export and sourcing of Indian-origin guar products for food, industrial and
              animal-feed applications.
            </p>
            <p className="eyebrow mt-6 text-gold-bright">{COMPANY.tagline}</p>

            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ key, label, href, Icon }) => {
                const socialUrl = socials.find((social) => social.key === key)?.url;

                return (
                  <a
                    key={label}
                    href={socialUrl || href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Products">
            {PRODUCTS.map((p) => (
              <FooterLink key={p.id} href={`/products#${p.id}`}>
                {p.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {COMPANY_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            {COMPANY.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-sm text-cream/70 transition-colors hover:text-gold-bright"
              >
                <Phone className="h-4 w-4 text-gold" /> {p}
              </a>
            ))}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 break-all text-sm text-cream/70 transition-colors hover:text-gold-bright"
            >
              <Mail className="h-4 w-4 shrink-0 text-gold" /> {'info@rpjexports.com'}
            </a>
            {/* <p className="flex items-start gap-3 text-sm text-cream/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {address}
            </p> */}
          </FooterColumn>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ y: wordY, opacity: wordOpacity }}
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[15vw] font-semibold leading-[0.8] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_rgba(227,194,127,0.35)]"
      >
        RPJ EXPORTS
      </motion.div>

      <div className="shell relative flex flex-col items-center justify-between gap-3 border-t border-cream/10 py-6 text-xs text-cream/45 md:flex-row">
        <p>© {new Date().getFullYear()} RPJ Exports. All rights reserved.</p>
        <p className="eyebrow">Jaipur · Rajasthan · India</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-6 text-cream/40">{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold-bright"
    >
      <span className="h-px w-0 bg-gold-bright transition-all duration-300 group-hover:w-4" />
      {children}
    </Link>
  );
}
