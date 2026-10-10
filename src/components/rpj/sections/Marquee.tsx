'use client';

import { PRODUCTS } from '@/lib/rpj/catalog';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import { useRef } from 'react';

/** Two opposing rows of product names whose speed follows scroll velocity. */
export function Marquee() {
  return (
    <section aria-hidden className="overflow-hidden border-y border-border bg-cream py-6 md:py-8">
      <Row baseVelocity={-2.2}>
        {PRODUCTS.map((p) => (
          <span key={p.id} className="flex items-center gap-8 pr-8">
            <span className="font-display text-4xl text-navy md:text-6xl">{p.name}</span>
            <Star />
          </span>
        ))}
      </Row>
      <Row baseVelocity={1.6}>
        {['Food', 'Oil & Gas', 'Textile', 'Paper', 'Mining', 'Animal Feed', 'Gum Processing'].map(
          (label) => (
            <span key={label} className="flex items-center gap-8 pr-8">
              <span className="eyebrow text-sm text-stone-ink md:text-base">{label}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
          )
        )}
      </Row>
    </section>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-gold md:h-8 md:w-8">
      <path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0z" />
    </svg>
  );
}

function Row({ children, baseVelocity }: { children: React.ReactNode; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="flex whitespace-nowrap py-2">
      <motion.div className="flex" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}
