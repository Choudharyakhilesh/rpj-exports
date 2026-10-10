import { Hero } from '@/components/rpj/hero/Hero';
import { Applications } from '@/components/rpj/sections/Applications';
import { Commitment } from '@/components/rpj/sections/Commitment';
import { Faq } from '@/components/rpj/sections/Faq';
import { Intro } from '@/components/rpj/sections/Intro';
import { Marquee } from '@/components/rpj/sections/Marquee';
import { Process } from '@/components/rpj/sections/Process';
import { ProductShowcase } from '@/components/rpj/sections/ProductShowcase';
import { WhyUs } from '@/components/rpj/sections/WhyUs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RPJ Exports — Guar Seeds, Splits, Guar Gum & Feed By-Products from India',
  keywords: [
    'guar gum exporter India',
    'guar gum supplier',
    'food grade guar gum',
    'industrial grade guar gum',
    'guar splits',
    'guar seeds',
    'guar korma',
    'guar churi',
    'guar dust',
    'RPJ Exports',
    'Jaipur Rajasthan guar',
  ],
};

export default function Page() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <ProductShowcase />
      <Applications />
      <Process />
      <WhyUs />
      <Commitment />
      <Faq />
    </>
  );
}
