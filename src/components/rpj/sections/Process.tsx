'use client';

import { PROCESS } from '@/lib/rpj/catalog';
import { createTimeline, stagger, svg } from 'animejs';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ClipboardList, PackageCheck, SearchCheck, Ship } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { SectionHeading } from './SectionHeading';

const ICONS = [ClipboardList, SearchCheck, PackageCheck, Ship];

// Path nodes in a 1200×220 viewBox; the curve threads through each step.
const NODES = [
  { x: 150, y: 70 },
  { x: 450, y: 150 },
  { x: 750, y: 70 },
  { x: 1050, y: 150 },
];
const PATH = [
  `M 0 110 C 75 110 75 ${NODES[0].y} ${NODES[0].x} ${NODES[0].y}`,
  ...NODES.slice(1).map(
    (n, i) => `C ${NODES[i].x + 150} ${NODES[i].y} ${n.x - 150} ${n.y} ${n.x} ${n.y}`
  ),
  `C 1125 ${NODES[3].y} 1125 110 1200 110`,
].join(' ');

type Timeline = ReturnType<typeof createTimeline>;

export function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const timeline = useRef<Timeline | null>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 70%', 'end 80%'] });
  const mobileLine = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  // anime.js builds the draw-on timeline; framer-motion's scroll progress scrubs it.
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const path = root.querySelector<SVGPathElement>('[data-path]');
    if (!path) return;
    const tl = createTimeline({ autoplay: false, defaults: { ease: 'linear' } });
    tl.add(svg.createDrawable(path), { draw: ['0 0', '0 1'], duration: 1000 }, 0)
      .add(
        root.querySelectorAll('[data-node]'),
        { scale: [0, 1], opacity: [0, 1], duration: 110, ease: 'outBack', delay: stagger(250) },
        90
      )
      .add(
        root.querySelectorAll('[data-step]'),
        { opacity: [0, 1], y: [28, 0], duration: 180, ease: 'outQuad', delay: stagger(250) },
        110
      );
    timeline.current = tl;
    tl.seek(scrollYProgress.get() * tl.duration);
    return () => {
      tl.revert();
      timeline.current = null;
    };
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const tl = timeline.current;
    if (tl) tl.seek(Math.min(1, p * 1.15) * tl.duration);
  });

  return (
    <section
      ref={section}
      className="grain relative overflow-hidden bg-navy text-cream py-8 md:py-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(247,243,236,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(247,243,236,.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <div className="shell relative">
        <SectionHeading
          tone="dark"
          eyebrow="How we work"
          title="Four steps from requirement to reliable supply."
          body="A clear, specification-led process — so what ships matches what was agreed."
        />

        {/* Desktop: drawn curve with steps under each node */}
        <div ref={track} className="relative mt-20 hidden md:block">
          <div className="relative h-[220px]">
            <svg
              viewBox="0 0 1200 220"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              <path
                d={PATH}
                fill="none"
                stroke="rgba(247,243,236,0.12)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <path
                data-path
                d={PATH}
                fill="none"
                stroke="url(#process-gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="process-gold" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#9c7632" />
                  <stop offset="0.5" stopColor="#e3c27f" />
                  <stop offset="1" stopColor="#c8a15a" />
                </linearGradient>
              </defs>
            </svg>
            {NODES.map((n, i) => {
              const Icon = ICONS[i];
              return (
                <div
                  key={i}
                  data-node
                  className="absolute grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/50 bg-ink text-gold-bright shadow-[0_0_0_8px_rgba(200,161,90,0.08)]"
                  style={{ left: `${(n.x / 1200) * 100}%`, top: `${(n.y / 220) * 100}%` }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid grid-cols-4 gap-8">
            {PROCESS.map((p) => (
              <div key={p.step} data-step className="px-2 text-center">
                <p className="font-mono text-sm text-gold-bright">{p.step}</p>
                <h3 className="mt-2 font-display text-3xl">{p.title}</h3>
                <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-cream/60">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical rail */}
        <div className="relative mt-14 md:hidden">
          <div className="absolute bottom-0 left-8 top-0 w-px bg-cream/10" />
          <motion.div
            style={{ scaleY: mobileLine }}
            className="absolute bottom-0 left-8 top-0 w-px origin-top bg-gold-bright"
          />
          <ol className="space-y-10">
            {PROCESS.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <motion.li
                  key={p.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-6"
                >
                  <span className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-gold/50 bg-ink text-gold-bright">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <div className="pt-2">
                    <p className="font-mono text-xs text-gold-bright">{p.step}</p>
                    <h3 className="mt-1 font-display text-2xl">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">{p.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
