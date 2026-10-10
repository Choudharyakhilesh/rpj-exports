'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Globe2, MoveUpRight, Package, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';
import React from 'react';
import { motion } from 'framer-motion';

export function FinalCtc() {
  const router = useRouter();
  const { start } = useTopLoader();

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-5 py-8 sm:px-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[28px] bg-gray-300"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#E7551B]/10 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-400/5 blur-[80px]" />

        <div className="grid min-h-[390px] items-center lg:grid-cols-[1fr_0.85fr]">
          {/* ================= LEFT ================= */}
          <div className="relative z-10 px-7 py-9 sm:px-10 lg:px-12 lg:py-10">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mb-4 flex items-center gap-2"
            >
              <span className="h-[1px] w-8 bg-secondary" />

              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-secondary">
                Global Guar Gum Supply
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="max-w-xl text-3xl font-serif leading-[1.05] tracking-tight text-black sm:text-4xl"
            >
              Your requirement.
              <br />
              <span className="text-secondary">Our supply.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-4 max-w-md text-sm leading-6 text-gray-700 "
            >
              Tell us what guar product you need, where you need it, and the quantity. Let's discuss
              your requirement.
            </motion.p>

            {/* Product chips */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {['Guar Gum Powder', 'Guar Dust', 'Guar Seeds'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-medium text-[#17335A]"
                >
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="mt-6"
            >
              <Button
                onClick={() => {
                  start();
                  router.push('/contact-us');
                }}
                className="group h-11 rounded-full bg-secondary px-5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:bg-secondary/80 hover:shadow-[0_8px_30px_rgba(231,85,27,0.25)]"
              >
                Discuss Your Requirement
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </motion.div>
          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden lg:min-h-[390px]">
            {/* dotted background */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />

            {/* ORBIT */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute h-[320px] w-[320px] rounded-full border border-white/10 border-dashed"
            >
              {/* orbit dot */}
              <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-secondary shadow-[0_0_15px_#E7551B]" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute h-[220px] w-[220px] rounded-full border border-secondary/20"
            />

            {/* IMAGE CIRCLE */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              animate={{
                y: [0, -6, 0],
              }}
              className="relative z-10 h-[190px] w-[190px] overflow-hidden rounded-full border-[5px] border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:h-[280px] sm:w-[280px]"
            >
              <img
                src="/guar-protein.jpg"
                alt="Guar gum products from India"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#102944]/50 to-transparent" />
            </motion.div>

            {/* TOP LEFT BADGE */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute left-5 top-12 z-20 rounded-xl border border-white/10 bg-[#17335A]/90 px-3 py-2 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <Package size={14} className="text-secondary" />

                <div>
                  <p className="text-[8px] uppercase tracking-wider text-white/35">Product</p>

                  <p className="text-[10px] font-semibold text-white">Guar Gum</p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT BADGE */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute right-3 top-20 z-20 rounded-xl border border-white/10 bg-white px-3 py-2 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Globe2 size={14} className="text-secondary" />

                <div>
                  <p className="text-[8px] uppercase tracking-wider text-slate-400">Supply</p>

                  <p className="text-[10px] font-bold text-[#17335A]">India → Global</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* animated bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-secondary to-transparent"
        />
      </motion.div>
    </section>
  );
}
