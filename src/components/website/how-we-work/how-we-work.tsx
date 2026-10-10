'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ClipboardList, FlaskConical, Globe2, Search } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Requirement',
    description:
      'Share your required guar product, grade, mesh size, viscosity, quantity, application and destination.',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Sourcing & Specification',
    description:
      'We match your requirement with suitable Indian supply partners and verify product specifications, quality and availability.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Quality & Commercials',
    description:
      'We align quality expectations, pricing, quantity, packaging and payment terms before confirming the order.',
    icon: FlaskConical,
  },
  {
    number: '04',
    title: 'Order & Export',
    description:
      'Once confirmed, we coordinate packaging, documentation, shipment and export follow-up until dispatch.',
    icon: Globe2,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FC] py-10">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft navy glow */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-52 top-20 h-[480px] w-[480px] rounded-full bg-[#17335A]/[0.035] blur-[130px]"
        />

        {/* soft orange glow */}
        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-52 bottom-0 h-[450px] w-[450px] rounded-full bg-[#E7551B]/[0.025] blur-[130px]"
        />

        {/* subtle dots */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(23,51,90,0.25) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: 'easeOut',
              }}
              className="h-[2px] bg-secondary"
            />

            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-secondary sm:text-xs">
              How We Work
            </span>
          </div>

          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#172033] sm:text-5xl lg:text-[60px]">
            From India
            <span className="text-[#17335A]"> to the World.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#697586] sm:text-[15px]">
            We simplify the process of sourcing and supplying guar gum — from understanding your
            requirement to coordinating export and shipment.
          </p>
        </motion.div>

        {/* =====================================================
            MAIN
        ===================================================== */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* ===================================================
              IMAGE
          =================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative lg:sticky lg:top-10"
          >
            {/* =====================================================
      OUTER CARD
  ===================================================== */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* ===================================================
        INFINITE MOVING BORDER
    =================================================== */}
              <div className="absolute -inset-[1.5px] overflow-hidden rounded-[30px]">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_285deg,#17335A_315deg,#c8a15a_340deg,#c8a15a_350deg,transparent_360deg)]"
                />
              </div>

              {/* ===================================================
        SOFT OUTER GLOW
    =================================================== */}
              <motion.div
                animate={{
                  opacity: [0.15, 0.3, 0.15],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute -inset-5 rounded-[35px] bg-secondary/10 blur-[35px]"
              />

              {/* ===================================================
        ACTUAL CARD
    =================================================== */}
              <div className="relative overflow-hidden rounded-[28px] bg-[#E9EEF4] shadow-[0_25px_70px_rgba(23,51,90,0.12)]">
                {/* Image background glow */}
                <motion.div
                  animate={{
                    opacity: [0.12, 0.22, 0.12],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="pointer-events-none absolute -inset-10 rounded-full bg-secondary/10 blur-[80px]"
                />

                {/* =================================================
          IMAGE
      ================================================= */}
                <div className="relative aspect-[4/4.5] overflow-hidden">
                  <Image
                    src="/rpjwork2.png"
                    alt="RPJ Exports Guar Gum"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 500px"
                    className="object-contain p-5 transition-transform duration-1000 ease-out hover:scale-[1.035] sm:p-7"
                  />

                  <motion.div
                    initial={{ x: '-140%' }}
                    whileHover={{ x: '140%' }}
                    transition={{
                      duration: 0.9,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />

                  {/* Bottom soft gradient */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#102846]/25 to-transparent" />
                </div>

                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                  </span>

                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#17335A]">
                    Guar Gum Supply
                  </span>
                </motion.div>

                {/* Top right small badge */}
                <motion.div
                  animate={{
                    y: [0, 3, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute right-5 top-5 rounded-full border border-white/60 bg-[#17335A]/90 px-3 py-2 shadow-lg backdrop-blur-md"
                >
                  <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white">
                    India → Global
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* ===================================================
              PROCESS
          =================================================== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="relative"
          >
            {/* =================================================
                CLEAN TIMELINE
            ================================================= */}
            <div className="absolute bottom-10 left-[25px] top-10 hidden w-px sm:block">
              {/* static line */}
              <div className="absolute inset-0 bg-[#DCE3EA]" />

              {/* SINGLE travelling light */}
              <motion.div
                animate={{
                  top: ['-10%', '105%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 1,
                }}
                className="absolute left-1/2 h-20 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-[#c8a15a] to-transparent"
              />
            </div>

            {/* =================================================
                CARDS
            ================================================= */}
            <div className="space-y-3">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <motion.div key={step.number} className="group relative">
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* ================= NODE ================= */}
                      <div className="relative z-20 flex shrink-0 pt-4">
                        <motion.div
                          whileHover={{
                            scale: 1.08,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 20,
                          }}
                          className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#D8E1EA] bg-[#F7F9FC] shadow-sm transition-all duration-500 group-hover:border-secondary group-hover:bg-secondary group-hover:shadow-[0_10px_30px_rgba(23,51,90,0.18)]"
                        >
                          <Icon
                            size={18}
                            strokeWidth={1.7}
                            className="text-[#17335A] transition-colors duration-500 group-hover:text-white"
                          />

                          {/* static orange dot */}
                          <span className="absolute -right-[2px] -top-[2px] h-2.5 w-2.5 rounded-full border-2 border-[#F7F9FC] bg-secondary transition-transform duration-300 group-hover:scale-125" />
                        </motion.div>
                      </div>

                      {/* ================= CARD ================= */}
                      <motion.div
                        whileHover={{
                          y: -3,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: 'easeOut',
                        }}
                        className="relative min-w-0 flex-1"
                      >
                        {/* subtle hover border */}
                        <div className="absolute inset-0 rounded-[20px] border border-transparent transition-all duration-500 group-hover:border-secondary/25" />

                        <div className="relative overflow-hidden rounded-[20px] border border-[#E0E7EF] bg-white/60 px-4 py-4 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_18px_45px_rgba(23,51,90,0.08)] sm:px-4 sm:py-4">
                          {/* small hover accent */}
                          <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: '42%' }}
                            transition={{
                              duration: 0.45,
                              ease: 'easeOut',
                            }}
                            className="absolute left-0 top-0 h-[2px] bg-secondary"
                          />

                          {/* TOP META */}
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold tracking-[0.2em] text-secondary">
                              {step.number}
                            </span>

                            <span className="h-px w-5 bg-secondary/60" />
                          </div>

                          {/* TITLE */}
                          <div className="mt-1 flex items-center justify-between gap-4">
                            <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#172033] transition-colors duration-300 group-hover:text-[#17335A] sm:text-[21px]">
                              {step.title}
                            </h3>

                            <motion.div
                              whileHover={{
                                rotate: 45,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E1E6EC] transition-all duration-300 group-hover:border-[#c8a15a] group-hover:bg-[#c8a15a]"
                            >
                              <ArrowUpRight
                                size={14}
                                className="text-[#17335A] transition-colors duration-300 group-hover:text-white"
                              />
                            </motion.div>
                          </div>

                          {/* DESCRIPTION */}
                          <p className="mt-1.5 max-w-[620px] text-[12px] leading-5 text-[#788493] sm:text-[13px] sm:leading-5.5">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
