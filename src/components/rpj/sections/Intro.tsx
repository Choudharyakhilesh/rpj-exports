'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { CountUp } from '../motion/CountUp';
import { Reveal } from '../motion/Reveal';
import { SplitText } from '../motion/SplitText';

const STORY =
  'RPJ Exports is a Jaipur, Rajasthan-based export and sourcing company supplying guar seeds, guar splits, food grade and industrial grade guar gum, guar dust, guar churi and guar korma to international customers. We understand your requirement and coordinate sourcing through suitable manufacturing and processing partners — around agreed grade, viscosity, mesh size, quality parameters, packaging and quantity.';

const TILES = [
  { value: 3, suffix: '', label: 'Product families', note: 'Seeds & splits · Guar gum · Feed' },
  { value: 7, suffix: '', label: 'Grades & forms', note: 'From whole seed to 300-mesh powder' },
  { value: 50, suffix: ' kg', label: 'Bags or on request', note: '25 kg / 50 kg standard packing' },
];

export function Intro() {
  const section = useRef<HTMLElement>(null);
  const story = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: story, offset: ['start 85%', 'end 45%'] });
  const { scrollYProgress: imageProgress } = useScroll({
    target: section,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(imageProgress, [0, 1], ['-8%', '8%']);
  const clip = useTransform(
    imageProgress,
    [0.05, 0.35],
    ['inset(18% 12% 18% 12% round 32px)', 'inset(0% 0% 0% 0% round 32px)']
  );
  const words = STORY.split(' ');

  return (
    <section ref={section} className="relative overflow-hidden bg-paper py-8 md:py-10">
      <div className="shell grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="eyebrow flex items-center gap-3 text-gold-deep">
            <span className="h-px w-8 bg-gold-deep" /> Who we are
          </p>
          <SplitText
            as="h2"
            className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.05] text-ink"
          >
            Connecting quality Indian guar products with global markets.
          </SplitText>
          <p ref={story} className="mt-10 text-xl leading-[1.6] md:text-2xl">
            {words.map((word, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              >
                {word}
              </Word>
            ))}
          </p>
        </div>

        <div className="relative">
          <motion.div
            style={{ clipPath: clip }}
            className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-sand"
          >
            <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
              <Image
                src="/media/guar-field.webp"
                alt="Guar seeds, pods and guar gum powder"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <Reveal
            delay={0.2}
            className="absolute -bottom-8 left-4 right-4 rounded-2xl border border-border bg-paper/95 p-5 shadow-[0_30px_60px_-30px_rgba(10,26,47,0.35)] md:-left-10 md:right-auto md:max-w-xs"
          >
            <p className="eyebrow text-gold-deep">Origin</p>
            <p className="mt-2 font-display text-xl text-ink">Jaipur · Rajasthan · India</p>
            <p className="mt-1 text-sm text-stone-ink">
              Access to India&apos;s established guar supply chain.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="shell mt-20 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
        {TILES.map((t, i) => (
          <Reveal key={t.label} delay={i * 0.08} className="bg-paper p-8 md:p-10">
            <p className="font-display text-6xl text-navy md:text-7xl">
              <CountUp value={t.value} suffix={t.suffix} />
            </p>
            <p className="mt-4 font-semibold text-ink">{t.label}</p>
            <p className="mt-1 text-sm text-stone-ink">{t.note}</p>
          </Reveal>
        ))}
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
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="text-ink">
      {children}{' '}
    </motion.span>
  );
}
