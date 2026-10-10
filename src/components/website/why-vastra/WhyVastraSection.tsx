'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, FileCheck2, Globe2, PackageCheck, Search, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const principles = [
  {
    number: '01',
    title: 'Specification First',
    short: 'Requirements',
    image: '/specification.png',
    proof: 'Clear specs before every quote',
    description:
      'Every enquiry starts with understanding the exact requirement — grade, mesh size, viscosity, quantity, application and destination.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Reliable Sourcing',
    short: 'Sourcing',
    image: '/sourcing.png',
    proof: 'Right product from the right source',
    description:
      'We coordinate with suitable supply partners to identify availability and align the supply with the specific requirement.',
    icon: Globe2,
  },
  {
    number: '03',
    title: 'Quality Focus',
    short: 'Quality',
    image: '/quality.png',
    proof: 'Quality checks that protect your order',
    description:
      'Product specifications and quality expectations are reviewed before commercial confirmation so requirements stay clear.',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Clear Commercials',
    short: 'Commercials',
    image: '/Commercials.png',
    proof: 'Transparent pricing and terms',
    description:
      'Pricing, quantity, packaging, payment terms and shipment requirements are discussed clearly before moving forward.',
    icon: FileCheck2,
  },
  {
    number: '05',
    title: 'Export Coordination',
    short: 'Export',
    image: '/export.png',
    proof: 'Documentation to delivery support',
    description:
      'We support packaging, documentation and shipment coordination to help move orders from India towards their destination.',
    icon: PackageCheck,
  },
  {
    number: '06',
    title: 'Long-Term Approach',
    short: 'Partnership',
    image: '/whyimage.jpg',
    proof: 'A dependable partner beyond one order',
    description:
      'Our focus is not simply on completing an order. We aim to build straightforward, dependable working relationships with buyers.',
    icon: CheckCircle2,
  },
];

export function WhyRPJSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = principles[activeIndex];

  return (
    <section className="relative overflow-hidden bg-[#FAFBFC] py-12 sm:py-16">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[15%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#17335A]/[0.025] blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#E7551B]/[0.035] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(23,51,90,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(23,51,90,0.045) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10 bg-secondary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-secondary sm:text-xs">
              Why RPJ Exports
            </span>
          </div>

          <div className="mt-4">
            <h2 className="max-w-4xl text-[36px] font-medium leading-[1.1] tracking-[-0.04em] text-[#172033] sm:text-[48px] lg:text-[44px]">
              A better export experience starts with <span className="text-secondary">trust.</span>
            </h2>
          </div>
        </motion.div>

        {/* CENTRAL EXPERIENCE */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* LEFT — FIXED IMAGE FRAME (NO CROP) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              key={active.image}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group relative flex h-[380px] w-full max-w-[480px] items-center justify-center overflow-hidden rounded-2xl bg-[#0F223D] p-3 shadow-lg sm:h-[420px]"
            >
              {/* Image using contain mode so whole card/spec is visible without cropping */}
              <div className="relative h-full w-full">
                <Image
                  src={active.image}
                  alt={`${active.title} at RPJ Exports`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Overlay Badge at Bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#091527]/95 via-[#0F223D]/70 to-transparent p-5 backdrop-blur-[2px]">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
                      Why buyers choose RPJ
                    </p>
                    <p className="mt-1 max-w-xs text-base font-medium leading-snug text-white sm:text-lg">
                      {active.proof}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                    <active.icon className="h-5 w-5 text-secondary" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — ACTIVE PRINCIPLE (PROPORTIONAL TEXT) */}
          <motion.div
            key={active.number}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-secondary">
                0{activeIndex + 1} / 06
              </span>
              <span className="h-px w-10 bg-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9AA4AF]">
                RPJ Principle
              </span>
            </div>

            {/* Title (Scaled down to prevent vertical blowup) */}
            <h3 className="mt-4 text-[38px] font-medium leading-[1.05] tracking-[-0.04em] text-[#17335A] sm:text-[48px] lg:text-[52px]">
              {active.title}
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5F6975] sm:text-[15px]">
              {active.description}
            </p>

            {/* Progress Bar */}
            <div className="mt-7 h-px w-full bg-[#E1E6EB]">
              <motion.div
                key={activeIndex}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6 }}
                className="h-full bg-secondary"
              />
            </div>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="rounded-full border border-[#DDE3E9] bg-white px-3.5 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#697586]">
                  {active.short}
                </span>
              </div>
              <div className="rounded-full border border-[#DDE3E9] bg-white px-3.5 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#697586]">
                  Guar Gum Supply
                </span>
              </div>
              <div className="rounded-full border border-[#DDE3E9] bg-white px-3.5 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#697586]">
                  India → Global
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM PRINCIPLE NAVIGATION */}
        <div className="mt-12 overflow-hidden border-y border-[#DDE3E9]">
          <div className="flex flex-col lg:flex-row">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={principle.number}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ y: -2 }}
                  className={`group relative flex flex-1 flex-col justify-between border-b border-[#E5E9ED] p-4 text-left transition-all duration-300 last:border-b-0 lg:min-h-[110px] lg:border-b-0 lg:border-r lg:p-5 lg:last:border-r-0 ${
                    isActive
                      ? 'bg-[#17335A] text-white'
                      : 'bg-transparent text-[#17335A] hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-[26px] font-light tracking-[-0.05em] transition-colors ${
                        isActive ? 'text-white/30' : 'text-[#DCE2E8] group-hover:text-secondary'
                      }`}
                    >
                      {principle.number}
                    </span>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? 'border-white/20 bg-white/10'
                          : 'border-[#DDE3E9] bg-white group-hover:border-secondary'
                      }`}
                    >
                      <Icon
                        size={14}
                        strokeWidth={1.5}
                        className={
                          isActive ? 'text-secondary' : 'text-[#17335A] group-hover:text-secondary'
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4
                      className={`text-sm font-semibold tracking-[-0.01em] transition-colors sm:text-base ${
                        isActive ? 'text-white' : 'text-[#17335A]'
                      }`}
                    >
                      {principle.title}
                    </h4>
                  </div>

                  <motion.div
                    animate={{
                      scaleX: isActive ? 1 : 0,
                    }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-secondary"
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
