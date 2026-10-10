'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

let lenis: Lenis | null = null;

export function scrollToTarget(target: string | HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : -72, duration: 1.4 });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (typeof el === 'number') window.scrollTo({ top: el, behavior: 'smooth' });
  else el?.scrollIntoView({ behavior: 'smooth' });
}

export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const instance = new Lenis({ lerp: 0.14, smoothWheel: true, wheelMultiplier: 1 });
    lenis = instance;
    let frame = requestAnimationFrame(function loop(time) {
      instance.raf(time);
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // New route: start at the top, unless the URL targets an in-page anchor.
  useEffect(() => {
    const hash = window.location.hash;
    const anchor = hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
    if (anchor) {
      requestAnimationFrame(() => scrollToTarget(anchor));
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
