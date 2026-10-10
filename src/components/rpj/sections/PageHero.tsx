'use client';

import { useUiStore } from '@/lib/rpj/ui-store';
import { motion } from 'framer-motion';
import { SplitText } from '../motion/SplitText';
import { GlobeArcs } from './Globe';

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  crumb: string;
}) {
  const introDone = useUiStore((s) => s.introDone);

  return (
    <section className="grain relative min-h-[700px] overflow-hidden bg-ink pb-10 pt-40 text-cream md:min-h-[500px] md:pb-10 md:pt-28">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_80%_30%,#1d3f6b_0%,#0f2440_40%,#0a1a2f_75%)]"
      />

      {/* Globe */}
      <GlobeArcs
        className="
          pointer-events-none
          absolute
          right-[-25%]
          top-[15%]
          z-[1]
          h-[70%]
          w-full
        "
      />

      {/* Text readability overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_35%_45%,rgba(10,26,47,0)_0%,rgba(10,26,47,0.08)_45%,rgba(10,26,47,0.35)_100%)]"
      />

      {/* Content */}
      <div className="shell relative z-10 mt-8">
        <SplitText
          as="h1"
          by="chars"
          when={introDone}
          className="mt-4 max-w-4xl font-display text-[clamp(3rem,8vw,5rem)] leading-[0.98]"
        >
          {title}
        </SplitText>

        {body && (
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={
              introDone
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 1,
              ease: EASE,
              delay: 0.5,
            }}
            className="mt-8 max-w-4xl text-lg leading-relaxed text-cream/65"
          >
            {body}
          </motion.p>
        )}
      </div>
    </section>
  );
}
