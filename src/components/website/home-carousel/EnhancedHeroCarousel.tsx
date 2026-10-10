'use client';

import Image from 'next/image';

export default function EnhancedHeroCarousel() {
  return (
    <div className="mx-2">
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[600px] rounded-4xl overflow-hidden">
        <div className="relative w-full h-full rounded-4xl overflow-hidden">
          {/* STATIC IMAGE */}
          <Image
            src="/banner-1.jpg"
            alt="Women's Apparel Manufacturer"
            fill
            priority
            className="object-cover brightness-[0.7]"
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 -translate-y-6">
            {/* TITLE */}
            {/* <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl text-gray-200 font-light mb-4"
            >
              <span className="text-primary">
                Women&apos;s Apparel Manufacturer | Private Label | OEM ODM
              </span>
            </motion.h1> */}

            {/* DESCRIPTION */}
            {/* <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl font-light"
            >
              We manufacture high-quality women&apos;s apparel for brands worldwide with private
              label, OEM, and ODM solutions.
            </motion.p> */}

            {/* BUTTON */}
            {/* <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="flex items-center px-6 py-3 text-white shadow-lg transition-all"
                >
                  <a href="tel:+917427873957">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Enquire Now
                  </a>
                </Button>
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
