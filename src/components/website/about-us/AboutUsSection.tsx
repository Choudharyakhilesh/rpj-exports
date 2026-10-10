'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Package, Globe2, MoveUpRight, Sparkles } from 'lucide-react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

function Counter({ value, active }: { value: string; active: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;

  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, numericValue, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

const stats = [
  {
    number: '50+',
    label: 'Trusted Buyers',
    description: 'Building reliable supply relationships.',
    icon: Users,
  },
  {
    number: '25+',
    label: 'Global Markets',
    description: 'Supporting international sourcing.',
    icon: Globe2,
  },
  {
    number: '60k+',
    label: 'Units Handled',
    description: 'Coordinated across supply requirements.',
    icon: Package,
  },
];

export function AboutUsSection() {
  const router = useRouter();
  const [activeStat, setActiveStat] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#FAFAF9] py-10">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Soft orange glow */}
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#E7551B]/[0.035] blur-[100px]"
        />

        {/* Navy glow */}
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#17335A]/[0.045] blur-[110px]"
        />

        {/* Very subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(23,51,90,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(23,51,90,0.025) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* RPJ watermark */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            opacity: [0.018, 0.028, 0.018],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute right-[250px] top-[-10px] select-none text-[130px] font-black leading-none tracking-[0.09em] text-[#17335A] sm:text-[220px] lg:text-[240px]"
        >
          RPJ
        </motion.div>
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Eyebrow */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-5 flex items-center gap-3"
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 42 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="h-px bg-secondary"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">
                Who We Are
              </span>
            </motion.div>

            {/* Heading */}

            <h2 className="max-w-2xl text-[40px] font-medium leading-[1.02] tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-[58px]">
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.15,
                  duration: 0.65,
                }}
                className="block"
              >
                We Supply Quality
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.28,
                  duration: 0.65,
                }}
                className="block"
              >
                Products{' '}
                <span className="relative text-secondary">
                  Across Borders.
                  {/* animated underline */}
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.8,
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                    className="absolute -bottom-1 left-0 h-[2px] bg-secondary/30"
                  />
                </span>
              </motion.span>
            </h2>

            {/* Intro */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.45,
                duration: 0.7,
              }}
              className="mt-7 max-w-xl text-[15px] leading-7 text-slate-600 sm:text-base"
            >
              RPJ Exports is an India-based export and sourcing partner, helping international
              buyers access quality products with dependable sourcing support and smooth trade
              coordination.
            </motion.p>

            {/* Animated divider */}

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{
                delay: 0.55,
                duration: 0.8,
              }}
              className="my-7 h-px max-w-xl bg-slate-200"
            />

            {/* Points */}

            <div className="max-w-xl space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="group flex gap-4"
              >
                <div className="relative mt-2 shrink-0">
                  <motion.span
                    animate={{
                      scale: [1, 1.35, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                    className="block h-2 w-2 rounded-full bg-secondary"
                  />

                  <span className="absolute inset-[-4px] rounded-full border border-secondary/20" />
                </div>

                <p className="text-[14px] leading-6 text-slate-500">
                  We work with reliable supply partners to coordinate consistent products,
                  documentation and export requirements.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.72, duration: 0.6 }}
                className="group flex gap-4"
              >
                <div className="relative mt-2 shrink-0">
                  <motion.span
                    animate={{
                      scale: [1, 1.35, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 0.5,
                      repeat: Infinity,
                    }}
                    className="block h-2 w-2 rounded-full bg-secondary"
                  />

                  <span className="absolute inset-[-4px] rounded-full border border-secondary/20" />
                </div>

                <p className="text-[14px] leading-6 text-slate-500">
                  From supplier coordination to packaging and shipment support, we help buyers move
                  from enquiry to export with greater clarity.
                </p>
              </motion.div>
            </div>

            {/* CTA */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-8"
            >
              <Button
                onClick={() => router.push('/about-us')}
                size="lg"
                className="group relative h-11 overflow-hidden rounded-full bg-[#17335A] px-6 text-sm font-semibold shadow-[0_10px_30px_rgba(23,51,90,0.12)] transition-all duration-300 hover:bg-[#17335A] hover:shadow-[0_15px_40px_rgba(23,51,90,0.2)]"
              >
                {/* Hover orange layer */}

                <motion.span
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-secondary"
                />

                <span className="relative z-10">Learn More About Us</span>

                <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT STATS
          ================================================= */}

          <div className="relative">
            {/* Vertical animated line */}

            <div className="absolute left-[30px] top-5 bottom-5 hidden w-px overflow-hidden bg-slate-200 md:block">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.8,
                  ease: 'easeInOut',
                }}
                className="w-full bg-gradient-to-b from-[#c8a15a] via-[#c8a15a]/40 to-transparent"
              />
            </div>

            {/* Stats */}

            <div className="space-y-2">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const active = activeStat === index;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{
                      opacity: 0,
                      x: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={() => setActiveStat(index)}
                    className="group relative cursor-default"
                  >
                    {/* Card */}

                    <motion.div
                      animate={{
                        x: active ? 5 : 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className={`relative flex items-center gap-5 rounded-[24px] border p-5 transition-all duration-500 md:py-6 ${
                        active
                          ? 'border-secondary/15 bg-white shadow-[0_18px_50px_rgba(16,41,68,0.08)]'
                          : 'border-transparent bg-transparent'
                      }`}
                    >
                      {/* Icon */}

                      <motion.div
                        animate={{
                          rotate: active ? [0, -5, 5, 0] : 0,
                          scale: active ? 1.05 : 1,
                        }}
                        transition={{
                          duration: 0.5,
                        }}
                        className={`relative z-10 flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          active
                            ? 'border-secondary bg-primary shadow-[0_10px_25px_rgba(23,51,90,0.16)]'
                            : 'border-slate-200 bg-[#FAFAF9]'
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 transition-colors duration-500 ${
                            active ? 'text-white' : 'text-slate-400'
                          }`}
                        />

                        {/* pulse ring */}

                        {active && (
                          <motion.span
                            initial={{
                              scale: 0.8,
                              opacity: 0.5,
                            }}
                            animate={{
                              scale: 1.45,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                            className="absolute inset-0 rounded-full border border-secondary"
                          />
                        )}
                      </motion.div>

                      {/* Content */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <motion.span
                            animate={{
                              scale: active ? 1.04 : 1,
                            }}
                            className={`text-5xl font-semibold leading-none tracking-[-0.055em] transition-colors duration-500 sm:text-6xl ${
                              active ? 'text-[#17335A]' : 'text-slate-900'
                            }`}
                          >
                            <Counter value={stat.number} active={active} />
                          </motion.span>

                          <motion.div
                            animate={{
                              x: active ? 3 : 0,
                              y: active ? -3 : 0,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                          >
                            <MoveUpRight
                              className={`h-4 w-4 transition-colors duration-500 ${
                                active ? 'text-secondary' : 'text-slate-300'
                              }`}
                            />
                          </motion.div>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                              active ? 'text-secondary' : 'text-slate-400'
                            }`}
                          >
                            {stat.label}
                          </span>
                        </div>

                        {/* Description appears on active */}

                        <AnimatePresence>
                          {active && (
                            <motion.p
                              initial={{
                                opacity: 0,
                                height: 0,
                                y: -5,
                              }}
                              animate={{
                                opacity: 1,
                                height: 'auto',
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                              }}
                              transition={{
                                duration: 0.3,
                              }}
                              className="mt-2 max-w-[280px] overflow-hidden text-xs leading-5 text-slate-400"
                            >
                              {stat.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Tiny active indicator */}

                      <motion.div
                        animate={{
                          scaleY: active ? 1 : 0,
                          opacity: active ? 1 : 0,
                        }}
                        className="absolute right-0 top-5 bottom-5 w-[3px] origin-center rounded-full bg-secondary transition-all"
                      />
                    </motion.div>

                    {/* Divider */}

                    {index !== stats.length - 1 && (
                      <div className="ml-[82px] h-px bg-slate-200/70" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
