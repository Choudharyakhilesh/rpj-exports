import { Commitment } from '@/components/rpj/sections/Commitment';
import { Intro } from '@/components/rpj/sections/Intro';
import { PageHero } from '@/components/rpj/sections/PageHero';
import { Process } from '@/components/rpj/sections/Process';
import { WhyUs } from '@/components/rpj/sections/WhyUs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'RPJ Exports is a Jaipur, Rajasthan-based export and sourcing company connecting quality Indian guar products with global markets.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Who we are"
        title="From India, to the world"
        body="An export and sourcing partner for Indian-origin guar — built on clear specifications, responsive communication and dependable coordination."
      />
      <Intro />
      <Process />
      <WhyUs />
      <Commitment />
    </>
  );
}
