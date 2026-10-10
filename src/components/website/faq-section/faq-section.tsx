'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

export function FaqSection() {
  const router = useRouter();
  const { start } = useTopLoader();

  const [activeIndex, setActiveIndex] = useState(0);

  const faqs: FAQItem[] = [
    {
      question: 'What types of guar gum does RPJ Exports supply?',
      answer:
        'RPJ Exports helps buyers source guar gum according to their application and requirements, including food-grade and industrial-grade options. Product suitability is discussed based on grade, mesh size, viscosity, quantity and destination.',
    },
    {
      question: 'Can you help us choose the right guar gum specification?',
      answer:
        'Yes. Share your application, required viscosity, mesh size, grade, quantity and destination. Our team can help coordinate the requirement with a suitable supply source before commercial confirmation.',
    },
    {
      question: 'Do you provide samples before an order?',
      answer:
        'Product details and sample discussions can be coordinated based on the requirement, application and destination. Share your specifications with RPJ Exports and we can discuss the suitable next step.',
    },
    {
      question: 'What information is needed to request a quote?',
      answer:
        'Please share the required grade, mesh size, viscosity, application, quantity, packaging preference, delivery destination and any quality or documentation requirements.',
    },
    {
      question: 'What packaging options are available?',
      answer:
        'Packaging is discussed according to product specification, order quantity, handling needs and destination-market requirements before the order is finalised.',
    },
    {
      question: 'Can RPJ Exports support quality and documentation requirements?',
      answer:
        'Yes. Quality expectations and required documents can be discussed before commercial confirmation according to your market and application requirements.',
    },
    {
      question: 'Do you support international shipments from India?',
      answer:
        'Yes. RPJ Exports supports international buyers with sourcing communication, export packaging discussions, documentation coordination and shipment follow-ups from India.',
    },
    {
      question: 'How long does a guar gum order usually take?',
      answer:
        'The timeline depends on product availability, specification, quantity, packaging, documentation and destination. A practical timeline can be discussed once the complete requirement is received.',
    },
    {
      question: 'Can I discuss a custom guar gum requirement?',
      answer:
        'Absolutely. You can share a custom requirement based on application, technical specification, quantity, packaging or destination and our team can review the requirement.',
    },
  ];

  const activeFaq = faqs[activeIndex];

  const QuestionCard = ({
    faq,
    index,
    side,
  }: {
    faq: FAQItem;
    index: number;
    side: 'left' | 'right';
  }) => {
    const active = activeIndex === index;

    return (
      <motion.button
        onClick={() => setActiveIndex(index)}
        whileHover={{
          x: side === 'left' ? 5 : -5,
          scale: 1.01,
        }}
        whileTap={{ scale: 0.98 }}
        className={`group relative flex min-h-[72px] w-full items-center gap-3 overflow-hidden rounded-xl border p-3 text-left transition-all duration-500 ${
          active
            ? 'border-secondary/20 bg-[#17335A] shadow-[0_15px_35px_rgba(16,41,68,0.15)]'
            : 'border-slate-200/80 bg-white hover:border-secondary/20 hover:shadow-[0_8px_25px_rgba(16,41,68,0.05)]'
        }`}
      >
        {active && (
          <motion.div
            layoutId="faq-active-glow"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          />
        )}

        <span
          className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold transition-all duration-300 ${
            active
              ? 'bg-secondary text-white shadow-[0_0_15px_rgba(231,85,27,0.3)]'
              : 'bg-slate-100 text-slate-400 group-hover:bg-secondary/10 group-hover:text-secondary'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          className={`relative flex-1 text-[11px] font-medium leading-5 transition-colors duration-300 ${
            active ? 'text-white' : 'text-slate-600'
          }`}
        >
          {faq.question}
        </span>

        <ChevronRight
          size={14}
          className={`relative shrink-0 transition-all duration-300 ${
            active ? 'text-secondary' : 'text-slate-300 group-hover:text-secondary'
          }`}
        />
      </motion.button>
    );
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-secondary/[0.035] blur-[100px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#17335A]/[0.04] blur-[110px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-secondary" />

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17335A]">
              RPJ EXPORTS
            </span>

            <span className="h-px w-8 bg-secondary" />
          </div>

          <h2 className="text-3xl font-serif tracking-tight text-slate-900 sm:text-4xl">
            Got questions?
            <span className="text-secondary"> Ask us.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
            Explore the questions buyers ask us most about guar gum, specifications and export
            supply.
          </p>
        </motion.div>

        {/* =========================================
            FAQ EXPERIENCE
        ========================================= */}
        <div className="relative mx-auto max-w-6xl">
          {/* Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#17335A]/[0.055] lg:block"
          />

          {/* THREE COLUMN LAYOUT */}
          <div className="relative z-10 grid items-center gap-5 lg:grid-cols-[1fr_1.55fr_1fr] lg:gap-6">
            {/* ================= LEFT ================= */}
            <div className="space-y-2">
              {faqs.slice(0, 5).map((faq, index) => (
                <QuestionCard key={faq.question} faq={faq} index={index} side="left" />
              ))}
            </div>

            {/* ================= CENTER ================= */}
            <div className="relative">
              {/* Glow behind card */}
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute inset-5 rounded-[35px] bg-secondary/10 blur-3xl"
              />

              <motion.div
                layout
                className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[#102944] p-7 shadow-[0_30px_80px_rgba(16,41,68,0.18)] sm:p-9"
              >
                {/* Orange top line */}
                <motion.div
                  key={`line-${activeIndex}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-0 right-0 top-0 h-[3px] origin-left bg-secondary"
                />

                {/* Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-secondary/10 blur-[65px]" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{
                      opacity: 0,
                      y: 25,
                      filter: 'blur(6px)',
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                      filter: 'blur(5px)',
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                  >
                    {/* Icon */}
                    <motion.div
                      initial={{
                        scale: 0.7,
                        rotate: -20,
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        type: 'spring',
                      }}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10"
                    >
                      <HelpCircle size={21} strokeWidth={1.6} className="text-secondary" />
                    </motion.div>

                    {/* Question number */}
                    <div className="mt-7 flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">
                        Question {String(activeIndex + 1).padStart(2, '0')}
                      </span>

                      <span className="h-px w-8 bg-white/10" />
                    </div>

                    {/* QUESTION */}
                    <h3 className="mt-4 text-xl font-medium leading-8 tracking-tight text-white sm:text-2xl">
                      {activeFaq.question}
                    </h3>

                    {/* ANSWER */}
                    <p className="mt-5 text-sm leading-7 text-white/50">{activeFaq.answer}</p>

                    {/* Bottom */}
                    <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                      <div className="flex items-center gap-2">
                        <Sparkles size={13} className="text-secondary" />

                        <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                          RPJ Exports
                        </span>
                      </div>

                      <span className="text-[9px] text-white/20">
                        {String(activeIndex + 1).padStart(2, '0')} / 09
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="space-y-2">
              {faqs.slice(5, 9).map((faq, index) => {
                const realIndex = index + 5;

                return <QuestionCard key={faq.question} faq={faq} index={realIndex} side="right" />;
              })}
            </div>
          </div>
        </div>

        {/* =========================================
            BOTTOM CTA
        ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <p className="text-xs text-slate-400">Didn't find what you're looking for?</p>

          {/* ROTATING BORDER BUTTON */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="relative">
            {/* Rotating border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -inset-[2px] rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, transparent 220deg, #E7551B 280deg, #ff9a72 320deg, transparent 360deg)',
              }}
            />

            {/* Glow */}
            <motion.div
              animate={{
                opacity: [0.15, 0.4, 0.15],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-2 rounded-full bg-secondary/20 blur-md"
            />

            {/* Actual button */}
            <Button
              onClick={() => {
                start();
                router.push('/contact-us');
              }}
              variant="ghost"
              className="relative z-10 h-9 rounded-full border border-white bg-white px-4 text-xs font-semibold text-[#17335A] shadow-sm transition-colors duration-300 hover:bg-white hover:text-secondary"
            >
              Talk to us
              <ArrowRight
                size={13}
                className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
