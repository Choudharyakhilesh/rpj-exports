import { Applications } from '@/components/rpj/sections/Applications';
import { PageHero } from '@/components/rpj/sections/PageHero';
import { ProductShowcase } from '@/components/rpj/sections/ProductShowcase';
import { SpecExplorer } from '@/components/rpj/sections/SpecExplorer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Guar seeds, guar splits, food grade guar gum (200 mesh, 3,500–6,500 CPS), industrial grade guar gum (100/200/300 mesh), guar dust, guar churi and guar korma — with indicative technical specifications.',
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumb="Products"
        eyebrow="Product catalogue"
        title="Guar products"
        body="Seeds, splits, guar gum and feed by-products — coordinated according to grade, mesh, viscosity and packaging requirements."
      />
      <ProductShowcase id="catalogue" />
      <SpecExplorer />
      <Applications />
    </>
  );
}
