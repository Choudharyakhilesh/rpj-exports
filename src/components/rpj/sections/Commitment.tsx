'use client';

import { COMPANY } from '@/lib/rpj/catalog';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const QUOTE =
  'We focus on clear specifications, responsive communication and dependable export coordination — to help customers source guar products from India with confidence.';

export function Commitment() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const { scrollYProgress: textProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'center 45%'],
  });
  const words = QUOTE.split(' ');

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-32 text-cream md:py-48">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image src="/media/port-logistics.webp" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,26,47,0.92)_0%,rgba(10,26,47,0.7)_50%,rgba(10,26,47,0.95)_100%)]" />
      <div className="shell relative text-center">
        <p className="eyebrow text-gold-bright">Our commitment</p>
        <blockquote className="mx-auto mt-8 max-w-5xl font-display text-[clamp(1.8rem,4vw,3.6rem)] leading-[1.15]">
          {words.map((w, i) => (
            <Word key={i} progress={textProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </blockquote>
        <p className="eyebrow mt-12 text-cream/60">{COMPANY.tagline}</p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}
