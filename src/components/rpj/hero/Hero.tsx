'use client';

import { PROCESS } from '@/lib/rpj/catalog';
import { useUiStore } from '@/lib/rpj/ui-store';
import { useStickyDrawerStore } from '@/store/useStickyDrawerStore';
import { animate } from 'animejs';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { Magnetic } from '../motion/Magnetic';
import { SplitText } from '../motion/SplitText';
import { INTRO_END } from './theatre-state';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

const FACTS = [
  { value: '07', label: 'Guar products' },
  { value: '100–300', label: 'Mesh range' },
  { value: '3,000–6,500', label: 'CPS viscosity' },
  { value: '25 / 50 kg', label: 'Standard packing' },
];

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const introDone = useUiStore((s) => s.introDone);
  const openDrawer = useStickyDrawerStore((s) => s.openDrawer);
  const reducedMotion = !!useReducedMotion();
  const onScreen = useInView(stage, { amount: 0.05 });

  // Scroll through the pinned stage scrubs the Theatre sequence from INTRO_END to the end.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const frame1Opacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const frame1Y = useTransform(scrollYProgress, [0, 0.22], [0, -80]);
  const frame2Opacity = useTransform(scrollYProgress, [0.32, 0.5], [0, 1]);
  const frame2Y = useTransform(scrollYProgress, [0.32, 0.5], [60, 0]);
  // const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // anime.js plays the intro half of the Theatre sequence once the preloader hands over.
  const intro = useMemo(() => ({ t: 0 }), []);
  useEffect(() => {
    if (!introDone) return;
    if (reducedMotion) {
      intro.t = INTRO_END;
      return;
    }
    const anim = animate(intro, { t: INTRO_END, duration: INTRO_END * 1000, ease: 'linear' });
    return () => {
      anim.pause();
    };
  }, [introDone, reducedMotion, intro]);

  // `?studio` in development opens Theatre Studio to edit the camera choreography.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (!new URLSearchParams(window.location.search).has('studio')) return;
    import('./theatre').then(({ enableStudioMode }) => enableStudioMode());
    import('@theatre/studio').then(({ default: studio }) => studio.initialize());
  }, []);

  return (
    <section ref={section} className="relative h-[230vh] bg-ink" aria-label="Introduction">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden text-cream">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,#1d3f6b_0%,#0f2440_38%,#0a1a2f_72%)]"
        />
        <HeroScene
          active={onScreen}
          intro={intro}
          scroll={scrollYProgress}
          reducedMotion={reducedMotion}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,26,47,0.85)_0%,rgba(10,26,47,0.35)_45%,transparent_70%)] max-md:bg-[linear-gradient(180deg,rgba(10,26,47,0.9)_0%,rgba(10,26,47,0.5)_45%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
        />

        {/* Frame 1 — headline */}
        <motion.div
          style={{ opacity: frame1Opacity, y: frame1Y }}
          className="shell relative z-10 flex h-full flex-col justify-center pb-24 pt-28 max-md:justify-start max-md:pt-32"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="eyebrow flex items-center gap-3 text-gold-bright"
          >
            <span className="h-px w-10 bg-gold-bright" />
            Export & sourcing · Jaipur, Rajasthan
          </motion.p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.7rem,6vw,5.6rem)] font-medium leading-[1.02]">
            <SplitText as="span" by="chars" when={introDone} delay={150} className="block">
              Indian guar,
            </SplitText>
            <SplitText
              as="span"
              by="chars"
              when={introDone}
              delay={450}
              className="block italic text-gold-bright"
            >
              sourced for the world.
            </SplitText>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg"
          >
            Guar seeds, splits, food &amp; industrial grade guar gum and feed by-products —
            coordinated to your grade, mesh, viscosity and packaging requirements.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
              >
                Explore products
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <button
              onClick={openDrawer}
              className="rounded-full border border-cream/25 px-7 py-4 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              Request a quote
            </button>
          </motion.div>
        </motion.div>

        {/* Frame 2 — revealed while the camera swings the globe across */}
        <motion.div
          style={{ opacity: frame2Opacity, y: frame2Y }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center"
        >
          <div className="shell flex justify-end max-md:items-start max-md:pt-28">
            <div className="max-w-md rounded-3xl border border-cream/10 bg-ink/80 p-7 md:p-9">
              <p className="eyebrow text-gold-bright">From Jaipur to the world</p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                Your requirement. Our sourcing.{' '}
                <em className="text-gold-bright">Reliable supply.</em>
              </h2>
              <ol className="mt-7 hidden space-y-4 sm:block">
                {PROCESS.map((p) => (
                  <li key={p.step} className="flex gap-4 text-sm">
                    <span className="font-mono text-gold-bright">{p.step}</span>
                    <span>
                      <strong className="font-semibold text-cream">{p.title}</strong>
                      <span className="block text-cream/60">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Facts rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="absolute inset-x-0 bottom-0 z-10 border-t border-cream/10 sm:hidden display:b "
        >
          <div className="shell grid grid-cols-2 md:grid-cols-4">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`py-5 ${i > 0 ? 'md:border-l md:border-cream/10 md:pl-6' : ''} ${
                  i % 2 === 1 ? 'max-md:border-l max-md:border-cream/10 max-md:pl-4' : ''
                }`}
              >
                <p className="font-display text-xl text-cream md:text-2xl">{f.value}</p>
                <p className="eyebrow mt-1 text-[10px] text-cream/45">{f.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
