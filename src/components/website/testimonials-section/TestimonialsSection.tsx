'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ArrowUpRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Daniel Cooper',
    role: 'Food Ingredients Buyer',
    country: 'Europe',
    text: 'RPJ Exports understood our grade, mesh and viscosity requirements clearly and kept the sourcing process simple.',
  },
  {
    name: 'Ahmed Rahman',
    role: 'Import Manager',
    country: 'Middle East',
    text: 'Clear communication from quotation to packaging and shipment coordination made the process easy to manage.',
  },
  {
    name: 'Maria Santos',
    role: 'Industrial Distributor',
    country: 'South America',
    text: 'The requirement was understood properly and the sourcing discussion stayed focused on the product we needed.',
  },
  {
    name: 'Oliver Bennett',
    role: 'Procurement Lead',
    country: 'United Kingdom',
    text: 'What stood out was the attention to specification, quantity and commercial details before moving ahead.',
  },
  {
    name: 'Sofia Williams',
    role: 'Global Sourcing Manager',
    country: 'North America',
    text: 'RPJ Exports keeps international sourcing discussions straightforward, clear and easy to follow.',
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [paused]);

  const current = testimonials[active];

  const previous = testimonials[(active - 1 + testimonials.length) % testimonials.length];

  const next = testimonials[(active + 1) % testimonials.length];

  return (
    <section
      className="relative overflow-hidden bg-[#F7F9FB] py-16 sm:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background glow */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E7551B]/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-secondary" />

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17335A]">
              Buyer Feedback
            </span>

            <span className="h-px w-8 bg-[#E7551B]" />
          </div>

          <h2 className="text-3xl font-medium tracking-[-0.05em] text-[#17335A] sm:text-4xl">
            What buyers value about
            <span className="text-secondary"> RPJ.</span>
          </h2>
        </motion.div>

        {/* =====================================================
            TESTIMONIAL STAGE
        ===================================================== */}

        <div className="relative mx-auto flex h-[330px] max-w-5xl items-center justify-center">
          {/* LEFT FLOATING CARD */}

          <motion.div
            animate={{
              x: [-10, -25, -10],
              y: [0, 8, 0],
              rotate: [-4, -6, -4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-0 hidden w-[230px] rounded-2xl border border-[#17335A]/10 bg-white/70 p-5 shadow-[0_20px_50px_rgba(23,51,90,0.08)] backdrop-blur-md lg:block"
          >
            <Quote size={20} className="mb-4 text-[#E7551B]/40" />

            <p className="line-clamp-3 text-xs leading-5 text-[#697586]">“{previous.text}”</p>

            <div className="mt-4">
              <p className="text-xs font-bold text-[#17335A]">{previous.name}</p>

              <p className="mt-1 text-[9px] text-[#9AA4AF]">{previous.role}</p>
            </div>
          </motion.div>

          {/* RIGHT FLOATING CARD */}

          <motion.div
            animate={{
              x: [10, 25, 10],
              y: [0, -8, 0],
              rotate: [4, 6, 4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute right-0 hidden w-[230px] rounded-2xl border border-[#17335A]/10 bg-white/70 p-5 shadow-[0_20px_50px_rgba(23,51,90,0.08)] backdrop-blur-md lg:block"
          >
            <div className="mb-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={11} className="fill-[#E7551B] text-[#E7551B]" />
              ))}
            </div>

            <p className="line-clamp-3 text-xs leading-5 text-[#697586]">“{next.text}”</p>

            <div className="mt-4">
              <p className="text-xs font-bold text-[#17335A]">{next.name}</p>

              <p className="mt-1 text-[9px] text-[#9AA4AF]">{next.country}</p>
            </div>
          </motion.div>

          {/* =====================================================
              MAIN CARD
          ===================================================== */}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: -10,
              }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 w-full max-w-2xl rounded-[26px] border border-white bg-white p-7 shadow-[0_25px_70px_rgba(23,51,90,0.12)] sm:p-9"
            >
              {/* Top */}

              <div className="flex items-start justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={13} className="fill-[#E7551B] text-[#E7551B]" />
                  ))}
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#17335A]">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </div>

              {/* Quote */}

              <div className="mt-6 flex gap-4">
                <Quote size={32} strokeWidth={1} className="shrink-0 text-[#E7551B]" />

                <p className="text-base font-medium leading-7 tracking-[-0.015em] text-[#17335A] sm:text-lg">
                  {current.text}
                </p>
              </div>

              {/* Author */}

              <div className="mt-7 flex items-center justify-between border-t border-[#E7EBEF] pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17335A] text-xs font-bold text-white">
                    {current.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#17335A]">{current.name}</p>

                    <p className="mt-0.5 text-[9px] text-[#8D97A4]">{current.role}</p>
                  </div>
                </div>

                <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-[#A0A9B4] sm:block">
                  {current.country}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =====================================================
            DOT NAVIGATION
        ===================================================== */}

        <div className="mt-3 flex items-center justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              aria-label={`Show testimonial ${index + 1}`}
              className="group p-1"
            >
              <motion.span
                animate={{
                  width: index === active ? 28 : 7,
                  opacity: index === active ? 1 : 0.3,
                }}
                className="block h-1.5 rounded-full bg-[#17335A] transition-all cursor-pointer"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
