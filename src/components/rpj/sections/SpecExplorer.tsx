'use client';

import { PRODUCTS, SPEC_NOTE, VISCOSITY_RANGES } from '@/lib/rpj/catalog';
import { animate, stagger } from 'animejs';
import { LayoutGroup, motion } from 'framer-motion';
import { Info } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../motion/Reveal';
import { SectionHeading } from './SectionHeading';

const AXIS = { min: 2000, max: 7000 };
const TICKS = [2000, 3000, 4000, 5000, 6000, 7000];
const pct = (v: number) => ((v - AXIS.min) / (AXIS.max - AXIS.min)) * 100;

export function SpecExplorer() {
  const [activeId, setActiveId] = useState(PRODUCTS[0].id);
  const active = PRODUCTS.find((p) => p.id === activeId) ?? PRODUCTS[0];
  const rows = useRef<HTMLDListElement>(null);

  // anime.js staggers the spec rows in whenever the selected product changes.
  useEffect(() => {
    const el = rows.current;
    if (!el) return;
    const anim = animate(el.querySelectorAll('[data-row]'), {
      opacity: [0, 1],
      x: [-16, 0],
      duration: 700,
      delay: stagger(45),
      ease: 'outExpo',
    });
    return () => {
      anim.pause();
    };
  }, [activeId]);

  return (
    <section className="relative bg-cream py-8 md:py-10">
      <div className="shell">
        <SectionHeading
          eyebrow="Technical specifications"
          title="Reference data, product by product."
          body="Indicative commercial specification ranges. Final specifications may vary according to grade, application and agreed customer requirements."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <LayoutGroup id="spec-list">
            <div
              role="tablist"
              aria-label="Products"
              className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
            >
              {PRODUCTS.map((p) => {
                const on = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActiveId(p.id)}
                    className={`relative isolate flex shrink-0 items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors ${
                      on ? 'text-cream' : 'text-ink/70 hover:bg-sand/60 hover:text-ink'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="spec-active"
                        className="absolute inset-0 -z-10 rounded-2xl bg-navy"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      className={`font-mono text-xs ${on ? 'text-gold-bright' : 'text-gold-deep'}`}
                    >
                      {p.index}
                    </span>
                    <span className="whitespace-nowrap font-medium">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="overflow-hidden rounded-[28px] border border-border bg-paper">
            <div className="flex flex-col gap-6 border-b border-border p-6 sm:flex-row sm:items-center md:p-8">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-cream"
              >
                <Image src={active.image} alt="" fill sizes="96px" className="object-cover" />
              </motion.div>
              <div>
                <p className="eyebrow text-gold-deep">{active.grade}</p>
                <h3 className="mt-2 font-display text-3xl text-ink md:text-4xl">{active.name}</h3>
              </div>
            </div>

            <dl ref={rows} className="grid sm:grid-cols-2">
              {active.specs.map((s) => (
                <div
                  key={`${active.id}-${s.label}`}
                  data-row
                  className="flex flex-col gap-1 border-b border-border px-6 py-5 sm:odd:border-r md:px-8"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-stone-ink">
                    {s.label}
                  </dt>
                  <dd className="font-display text-xl text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex gap-3 bg-sand/40 p-6 text-sm text-stone-ink md:px-8">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              <p>{SPEC_NOTE}</p>
            </div>
          </div>
        </div>

        <Reveal className="mt-6 rounded-[28px] border border-border bg-paper p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold-deep">Viscosity at a glance</p>
              <p className="mt-2 font-display text-2xl text-ink">
                Guar gum viscosity range, CPS (1% solution, ~25°C)
              </p>
            </div>
            <p className="text-xs text-stone-ink">Indicative — confirmed per agreed test method</p>
          </div>
          <div className="mt-10 space-y-7">
            {VISCOSITY_RANGES.map((r, i) => (
              <div key={r.id} className="grid items-center gap-3 md:grid-cols-[160px_1fr]">
                <button
                  onClick={() => setActiveId(r.id)}
                  className="text-left text-sm font-semibold text-ink hover:text-navy"
                >
                  {r.label}
                </button>
                <div className="relative h-10 rounded-full bg-cream">
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute inset-y-1 flex origin-left items-center justify-between rounded-full px-4 font-mono text-[11px] ${
                      activeId === r.id ? 'bg-navy text-cream' : 'bg-gold/80 text-ink'
                    }`}
                    style={{ left: `${pct(r.min)}%`, width: `${pct(r.max) - pct(r.min)}%` }}
                  >
                    <span>{r.min.toLocaleString('en-IN')}</span>
                    <span>{r.max.toLocaleString('en-IN')}</span>
                  </motion.div>
                </div>
              </div>
            ))}
            <div className="grid gap-3 md:grid-cols-[160px_1fr]">
              <span />
              <div className="relative h-4">
                {TICKS.map((t) => (
                  <span
                    key={t}
                    className="absolute -translate-x-1/2 font-mono text-[10px] text-stone-ink"
                    style={{ left: `${pct(t)}%` }}
                  >
                    {t / 1000}k
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
