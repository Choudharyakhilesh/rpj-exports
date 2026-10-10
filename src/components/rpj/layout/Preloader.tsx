'use client';

import { useUiStore } from '@/lib/rpj/ui-store';
import { createTimeline, stagger } from 'animejs';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SESSION_KEY = 'rpj-intro-seen';
const WORD = 'RPJ EXPORTS';

// Decided once per page load so React StrictMode's double effect doesn't skip the intro.
let shouldPlay: boolean | null = null;
function decideIntro() {
  if (shouldPlay === null) {
    try {
      shouldPlay = sessionStorage.getItem(SESSION_KEY) !== '1';
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      shouldPlay = true;
    }
  }
  return shouldPlay;
}

/** First-visit intro, choreographed with an anime.js timeline. Skipped on repeat visits. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const setIntroDone = useUiStore((s) => s.setIntroDone);

  useEffect(() => {
    const el = root.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !decideIntro() || reduced) {
      setIntroDone();
      setVisible(false);
      return;
    }

    const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const counterEl = el.querySelector<HTMLElement>('[data-counter]');
    const counter = { v: 0 };

    const tl = createTimeline({
      defaults: { ease: 'outExpo' },
      onComplete: () => setVisible(false),
    });

    tl.add(q('[data-mark]'), { opacity: [0, 1], scale: [0.82, 1], duration: 700 }, 0)
      .add(q('[data-letter]'), { y: ['115%', '0%'], duration: 700, delay: stagger(25) }, 80)
      .add(q('[data-rule]'), { scaleX: [0, 1], duration: 900, ease: 'inOutExpo' }, 60)
      .add(
        counter,
        {
          v: 100,
          duration: 900,
          ease: 'inOutQuad',
          onUpdate: () => {
            if (counterEl) counterEl.textContent = String(Math.round(counter.v)).padStart(3, '0');
          },
        },
        60
      )
      .add(q('[data-caption]'), { opacity: [0, 1], y: [12, 0], duration: 500 }, 400)
      .add(q('[data-fade]'), { opacity: 0, y: -24, duration: 400, ease: 'inQuad' }, 1000)
      .call(() => setIntroDone(), 1150)
      .add(
        el,
        { clipPath: ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'], duration: 750, ease: 'inOutExpo' },
        1150
      );

    return () => {
      tl.pause();
    };
  }, [setIntroDone]);

  if (!visible) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="grain fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink text-cream"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div data-fade className="flex flex-col items-center">
        <div data-mark className="opacity-0">
          <Image
            src="/brand/rpj-mark-light.png"
            alt=""
            width={120}
            height={90}
            className="h-auto w-[120px]"
            priority
          />
        </div>
        <div className="mt-6 flex overflow-hidden font-display text-3xl tracking-[0.28em] md:text-4xl">
          {WORD.split('').map((ch, i) => (
            <span
              key={i}
              data-letter
              className="inline-block"
              style={{ transform: 'translateY(115%)' }}
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>
        <div
          data-rule
          className="mt-6 h-px w-56 origin-left bg-gold"
          style={{ transform: 'scaleX(0)' }}
        />
        <p data-caption className="eyebrow mt-5 text-gold-bright opacity-0">
          Guar products · Jaipur → World
        </p>
      </div>
      <div data-fade className="eyebrow absolute bottom-8 right-8 font-mono text-cream/60">
        <span data-counter>000</span>
      </div>
    </div>
  );
}
