'use client';

import { APPLICATIONS } from '@/lib/rpj/catalog';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Droplets, Layers, Pickaxe, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import { SplitText } from '../motion/SplitText';

export function Applications() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!rail.current) return;
      setDistance(Math.max(0, rail.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (rail.current) ro.observe(rail.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Lenis already smooths scrolling, so the rail maps scroll progress directly.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Desktop — vertical scroll drives a horizontal rail */}
      <section
        ref={section}
        className="relative hidden bg-ink text-cream md:block"
        style={{ height: `calc(100vh + ${distance}px)` }}
      >
        <div className="grain sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div
            ref={rail}
            style={{ x }}
            className="flex items-stretch gap-6 pl-[max(40px,calc((100vw-1320px)/2+40px))] pr-16"
          >
            <div className="flex w-[30rem] shrink-0 flex-col justify-center pr-10">
              <p className="eyebrow flex items-center gap-3 text-gold-bright">
                <span className="h-px w-8 bg-gold-bright" /> Applications
              </p>
              <SplitText
                as="h2"
                className="mt-5 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.05]"
              >
                One bean. Six industries.
              </SplitText>
              <p className="mt-6 max-w-sm text-cream/60">
                From bakery shelves to oilfields — guar&apos;s thickening, binding and protein value
                travels far beyond the farm.
              </p>
            </div>
            {APPLICATIONS.map((a, i) => (
              <ApplicationCard key={a.industry} app={a} index={i} />
            ))}
          </motion.div>
          <div className="shell mt-12">
            <div className="h-px w-full bg-cream/10">
              <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-gold-bright" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile — native swipe with snap points */}
      <section className="grain relative bg-ink py-20 text-cream md:hidden">
        <div className="shell">
          <p className="eyebrow flex items-center gap-3 text-gold-bright">
            <span className="h-px w-8 bg-gold-bright" /> Applications
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.05]">One bean. Six industries.</h2>
        </div>
        <div className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
          {APPLICATIONS.map((a, i) => (
            <ApplicationCard key={a.industry} app={a} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

const ILLUSTRATIONS: Record<string, LucideIcon> = {
  'Oil & Gas': Droplets,
  'Textile & Paper': Layers,
  Mining: Pickaxe,
};

function ApplicationCard({ app, index }: { app: (typeof APPLICATIONS)[number]; index: number }) {
  const Icon = ILLUSTRATIONS[app.industry] ?? Layers;
  return (
    <article className="group relative h-[62vh] max-h-[560px] min-h-[420px] w-[80vw] shrink-0 snap-start overflow-hidden rounded-[28px] md:w-[26rem]">
      {app.image ? (
        <>
          <Image
            src={app.image}
            alt=""
            fill
            sizes="(min-width: 768px) 26rem, 80vw"
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,#2c4b6a_0%,#17335a_45%,#0a1a2f_100%)]">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgba(227,194,127,.9) 0 1px, transparent 1px 14px)',
            }}
          />
          <Icon
            aria-hidden
            strokeWidth={0.6}
            className="absolute -right-8 top-10 h-72 w-72 text-gold-bright/40 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>
      )}
      <div className="relative flex h-full flex-col justify-between p-7">
        <span className="font-mono text-xs text-gold-bright">0{index + 1}</span>
        <div>
          <h3 className="font-display text-3xl md:text-4xl">{app.industry}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {app.uses.map((u) => (
              <li
                key={u}
                className="rounded-full border border-cream/20 bg-ink/60 px-3 py-1 text-xs text-cream/85"
              >
                {u}
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-6 border-t border-cream/15 pt-4 text-[10px] text-gold-bright">
            {app.product}
          </p>
        </div>
      </div>
    </article>
  );
}
