'use client';

import { animate, splitText, stagger, utils } from 'animejs';
import { useInView } from 'framer-motion';
import { createElement, useEffect, useRef, type ElementType } from 'react';

type SplitTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  /** Animate word by word (default) or letter by letter. */
  by?: 'words' | 'chars';
  delay?: number;
  /** Extra gate, e.g. wait for the preloader before revealing the hero title. */
  when?: boolean;
};

/** anime.js text splitter + staggered rise, triggered when scrolled into view. */
export function SplitText({
  children,
  as = 'h2',
  className,
  by = 'words',
  delay = 0,
  when = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const targets = useRef<HTMLElement[]>([]);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const split = splitText(el, {
      words: { wrap: 'clip' },
      chars: by === 'chars',
    });
    targets.current = by === 'chars' ? split.chars : split.words;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      utils.set(targets.current, { y: '125%' });
    }
    el.classList.add('is-split');
    return () => {
      split.revert();
      el.classList.remove('is-split');
    };
  }, [by, children]);

  useEffect(() => {
    if (!inView || !when || !targets.current.length) return;
    const anim = animate(targets.current, {
      y: '0%',
      duration: by === 'chars' ? 1000 : 1200,
      delay: stagger(by === 'chars' ? 18 : 55, { start: delay }),
      ease: 'outExpo',
    });
    return () => {
      anim.pause();
    };
  }, [inView, when, by, delay]);

  return createElement(as, { ref, className, 'data-split': '' }, children);
}
