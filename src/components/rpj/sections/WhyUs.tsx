'use client';

import { WHY_US } from '@/lib/rpj/catalog';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
  ClipboardList,
  FileCheck2,
  Layers,
  MapPin,
  Ship,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';
import { staggerChild, staggerParent } from '../motion/Reveal';
import { SectionHeading } from './SectionHeading';

const ICONS: LucideIcon[] = [ClipboardList, Layers, SlidersHorizontal, Ship, FileCheck2, MapPin];

export function WhyUs() {
  return (
    <section className="relative bg-paper py-8 md:py-10">
      <div className="shell">
        <SectionHeading
          eyebrow="Why choose us"
          title="Built around your specification — not a price list."
          align="center"
        />
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_US.map((item, i) => (
            <SpotlightCard key={item.title} icon={ICONS[i]} index={i} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SpotlightCard({
  icon: Icon,
  title,
  body,
  index,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  index: number;
}) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(200,161,90,0.16), transparent 70%)`;

  return (
    <motion.div
      variants={staggerChild}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-200);
        my.set(-200);
      }}
      className="group relative overflow-hidden rounded-[24px] border border-border bg-white p-8 transition-colors duration-500 hover:border-gold/60"
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0"
      />
      <div className="relative flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cream text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-gold-bright">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <span className="font-mono text-xs text-stone-ink/60">0{index + 1}</span>
      </div>
      <h3 className="relative mt-10 font-display text-2xl text-ink">{title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-stone-ink">{body}</p>
    </motion.div>
  );
}
