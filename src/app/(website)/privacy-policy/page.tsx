import { PageHero } from '@/components/rpj/sections/PageHero';
import PrivacyPolicy from '@/components/website/privacy-policy/privacy-policy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How RPJ Exports collects, uses and protects your information.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumb="Privacy" eyebrow="Legal" title="Privacy policy." />
      <PrivacyPolicy />
    </>
  );
}
