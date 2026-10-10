import { ContactSection } from '@/components/rpj/sections/ContactSection';
import { Faq } from '@/components/rpj/sections/Faq';
import { PageHero } from '@/components/rpj/sections/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Request a quote for guar seeds, splits, guar gum or feed by-products. RPJ Exports, Jaipur, Rajasthan, India.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact"
        title="Let's talk guar"
        body="Share your grade, mesh, viscosity, quantity and destination — we'll coordinate the right supply."
      />
      <ContactSection showMap />
      <Faq />
    </>
  );
}
