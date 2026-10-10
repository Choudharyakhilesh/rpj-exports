'use client';

import { FAQS } from '@/lib/rpj/catalog';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

type FAQItem = (typeof FAQS)[number];

function QuestionCard({
  faq,
  index,
  side,
  active,
  onSelect,
}: {
  faq: FAQItem;
  index: number;
  side: 'left' | 'right';
  active: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.button
      onClick={() => onSelect(index)}
      whileHover={{ x: side === 'left' ? 5 : -5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex min-h-[72px] w-full items-center gap-3 overflow-hidden rounded-xl border p-3 text-left transition-all duration-500 ${
        active
          ? 'border-gold-deep/30 bg-navy shadow-[0_15px_35px_rgba(16,41,68,0.15)]'
          : 'border-border bg-white hover:border-gold-deep/30 hover:shadow-[0_8px_25px_rgba(16,41,68,0.05)]'
      }`}
    >
      {active && (
        <motion.div
          layoutId="faq-active-glow"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        />
      )}

      <span
        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-bold transition-all duration-300 ${
          active
            ? 'bg-gold-deep text-white'
            : 'bg-stone-100 text-stone-ink group-hover:bg-gold-deep/10 group-hover:text-gold-deep'
        }`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <span
        className={`relative flex-1 text-[12px] font-medium leading-5 transition-colors duration-300 ${
          active ? 'text-white' : 'text-ink'
        }`}
      >
        {faq.q}
      </span>

      <ChevronRight
        size={14}
        className={`relative shrink-0 transition-all duration-300 ${
          active ? 'text-gold-deep' : 'text-stone-ink/40 group-hover:text-gold-deep'
        }`}
      />
    </motion.button>
  );
}

export function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFaq = FAQS[activeIndex];
  const total = String(FAQS.length).padStart(2, '0');
  const splitAt = Math.ceil(FAQS.length / 2);

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-8 lg:py-10">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-gold-deep/[0.05] blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-navy/[0.04] blur-[110px]"
        />
      </div>

      <div className="shell relative">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gold-deep" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy">FAQ</span>
            <span className="h-px w-8 bg-gold-deep" />
          </div>

          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Questions buyers <span className="text-gold-deep">ask us.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-stone-ink">
            Can&apos;t find what you&apos;re looking for? Share your requirement and our team will
            respond.
          </p>
        </motion.div>

        {/* FAQ EXPERIENCE */}
        <div className="relative mx-auto max-w-6xl">
          {/* Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-navy/[0.07] lg:block"
          />

          <div className="relative z-10 grid items-center gap-5 lg:grid-cols-[1fr_1.55fr_1fr] lg:gap-6">
            {/* LEFT */}
            <div className="order-2 space-y-2 lg:order-none">
              {FAQS.slice(0, splitAt).map((faq, index) => (
                <QuestionCard
                  key={faq.q}
                  faq={faq}
                  index={index}
                  side="left"
                  active={activeIndex === index}
                  onSelect={setActiveIndex}
                />
              ))}
            </div>

            {/* CENTER */}
            <div className="relative order-1 lg:order-none">
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-5 rounded-[35px] bg-gold-deep/10 blur-3xl"
              />

              <motion.div
                layout
                className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-navy p-7 shadow-[0_30px_80px_rgba(16,41,68,0.18)] sm:p-9"
              >
                <motion.div
                  key={`line-${activeIndex}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-0 right-0 top-0 h-[3px] origin-left bg-gold-deep"
                />

                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gold-deep/10 blur-[65px]" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <motion.div
                      initial={{ scale: 0.7, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-deep/10"
                    >
                      <HelpCircle size={21} strokeWidth={1.6} className="text-gold-deep" />
                    </motion.div>

                    <div className="mt-7 flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-deep">
                        Question {String(activeIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px w-8 bg-white/10" />
                    </div>

                    <h3 className="mt-4 font-display text-xl font-medium leading-8 tracking-tight text-white sm:text-2xl">
                      {activeFaq.q}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-white/60">{activeFaq.a}</p>

                    <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                      <div className="flex items-center gap-2">
                        <Sparkles size={13} className="text-gold-deep" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                          FAQ
                        </span>
                      </div>
                      <span className="text-[10px] text-white/30">
                        {String(activeIndex + 1).padStart(2, '0')} / {total}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="order-3 space-y-2 lg:order-none">
              {FAQS.slice(splitAt).map((faq, index) => {
                const realIndex = index + splitAt;
                return (
                  <QuestionCard
                    key={faq.q}
                    faq={faq}
                    index={realIndex}
                    side="right"
                    active={activeIndex === realIndex}
                    onSelect={setActiveIndex}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
