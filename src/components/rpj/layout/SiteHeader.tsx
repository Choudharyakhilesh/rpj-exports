'use client';

import { COMPANY } from '@/lib/rpj/catalog';
import { useStickyDrawerStore } from '@/store/useStickyDrawerStore';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Magnetic } from '../motion/Magnetic';
import { setScrollLocked } from '../motion/SmoothScroll';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const openDrawer = useStickyDrawerStore((s) => s.openDrawer);
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 480 && y > prev && !menuOpen);
  });

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    setScrollLocked(menuOpen);
    return () => setScrollLocked(false);
  }, [menuOpen]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const light = !solid || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          solid && !menuOpen
            ? 'border-b border-border/70 bg-paper/95'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label="RPJ Exports home">
            <Image
              src={light ? '/brand/rpj-mark-light.png' : '/brand/rpj-mark.png'}
              alt=""
              width={48}
              height={36}
              className="h-8 w-auto transition-transform duration-500 group-hover:rotate-[-6deg]"
              priority
            />
            <span
              className={`font-display text-[15px] font-semibold tracking-[0.24em] transition-colors duration-500 ${
                light ? 'text-cream' : 'text-navy'
              }`}
            >
              RPJ EXPORTS
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    light
                      ? active
                        ? 'text-ink'
                        : 'text-cream/80 hover:text-cream'
                      : active
                        ? 'text-cream'
                        : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 -z-10 rounded-full ${light ? 'bg-cream' : 'bg-navy'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Magnetic>
                <button
                  onClick={openDrawer}
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_8px_30px_-8px_rgba(200,161,90,0.7)] transition-colors hover:bg-gold-bright"
                >
                  Request a quote
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>
            </div>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors md:hidden ${
                light ? 'border-cream/25 text-cream' : 'border-ink/15 text-ink'
              }`}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 42px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 42px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 42px) 36px)' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grain fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-28 text-cream md:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.8, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-baseline gap-4 font-display text-xl ${
                      isActive(item.href) ? 'text-gold-bright' : 'text-cream'
                    }`}
                  >
                    <span className="font-mono text-xs text-cream/40">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto space-y-4"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openDrawer();
                }}
                className="w-full rounded-full bg-gold py-4 text-center font-semibold text-ink"
              >
                Request a quote
              </button>
              <div className="eyebrow flex flex-wrap justify-between gap-2 text-cream/50">
                {COMPANY.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>
                    {p}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
