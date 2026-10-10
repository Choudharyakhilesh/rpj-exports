'use client';

import { animate } from 'animejs';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

/** Counts from 0 to `value` with anime.js once visible. */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1800,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    // Server HTML carries the final value; reset to 0 on the client before counting.
    if (ref.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ref.current.textContent = `${prefix}0${suffix}`;
    }
  }, [prefix, suffix]);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const counter = { v: 0 };
    const anim = animate(counter, {
      v: value,
      duration,
      ease: 'outExpo',
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(counter.v).toLocaleString('en-IN')}${suffix}`;
      },
    });
    return () => {
      anim.pause();
    };
  }, [inView, value, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">{`${prefix}${value.toLocaleString('en-IN')}${suffix}`}</span>
  );
}
