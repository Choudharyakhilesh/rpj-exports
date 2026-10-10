'use client';

import { CATEGORIES, PRODUCTS, type Product, type ProductCategory } from '@/lib/rpj/catalog';
import { useUiStore } from '@/lib/rpj/ui-store';
import { useStickyDrawerStore } from '@/store/useStickyDrawerStore';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { SectionHeading } from './SectionHeading';

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductShowcase({ id = 'products' }: { id?: string }) {
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const visible = PRODUCTS.filter((p) => filter === 'all' || p.category === filter);
  const open = PRODUCTS.find((p) => p.id === openId) ?? null;

  // Deep links like /products#guar-korma open that product's spec sheet.
  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.slice(1);
      if (PRODUCTS.some((p) => p.id === hash)) setOpenId(hash);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  return (
    <section id={id} className="relative bg-white py-8 md:py-10">
      <div className="shell">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our products"
            title="Guar in every form your process needs."
            body="Seven guar products in different forms and grades, coordinated according to customer requirements."
          />
          <LayoutGroup id="product-filter">
            <div
              role="tablist"
              aria-label="Filter products"
              className="hide-scrollbar -mx-1 flex shrink-0 gap-1 overflow-x-auto rounded-full border border-border bg-cream p-1"
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  className={`relative isolate whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    filter === c.id ? 'text-cream' : 'text-ink/65 hover:text-ink'
                  }`}
                >
                  {filter === c.id && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-navy"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  {c.label}
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                featured={filter === 'all' && i === 0}
                index={i}
                onOpen={() => setOpenId(p.id)}
              />
            ))}
            <CustomSpecCard key="custom" />
          </AnimatePresence>
        </motion.div>
      </div>

      <ProductDialog product={open} onClose={() => setOpenId(null)} />
    </section>
  );
}

function ProductCard({
  product,
  featured,
  index,
  onOpen,
}: {
  product: Product;
  featured: boolean;
  index: number;
  onOpen: () => void;
}) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(227,194,127,0.22), transparent 60%)`;

  return (
    <motion.article
      id={product.id}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.08 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 7);
        rx.set((0.5 - py) * 7);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={`group relative flex scroll-mt-28 flex-col overflow-hidden rounded-[28px] border border-border bg-paper ${
        featured ? 'lg:col-span-2 lg:flex-row' : ''
      }`}
    >
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <button
        onClick={onOpen}
        className="absolute inset-0 z-20"
        aria-label={`View ${product.name} specifications`}
      />
      <div
        className={`relative overflow-hidden bg-cream ${
          featured ? 'aspect-[4/3] lg:aspect-auto lg:w-[52%]' : 'aspect-[4/3]'
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
        />
        <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1 font-mono text-xs text-navy">
          {product.index}
        </span>
      </div>
      <div
        className={`flex flex-1 flex-col p-6 md:p-7 ${featured ? 'lg:justify-center lg:p-12' : ''}`}
      >
        <p className="eyebrow text-[10px] text-gold-deep">{product.grade}</p>
        <h3
          className={`mt-3 font-display leading-tight text-ink ${
            featured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-[28px]'
          }`}
        >
          {product.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-ink">{product.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {product.applications.map((a) => (
            <span
              key={a}
              className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] text-ink/70"
            >
              {a}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-7">
          <span className="text-sm font-semibold text-navy">View specifications</span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 text-navy transition-all duration-500 group-hover:rotate-90 group-hover:border-navy group-hover:bg-navy group-hover:text-cream">
            <Plus className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function CustomSpecCard() {
  const openDrawer = useStickyDrawerStore((s) => s.openDrawer);
  return (
    <motion.button
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onClick={openDrawer}
      className="grain group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[28px] bg-navy p-7 text-left text-cream"
    >
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/25 blur-3xl transition-transform duration-700 group-hover:scale-125"
      />
      <p className="eyebrow relative text-gold-bright">Custom requirement</p>
      <div className="relative">
        <p className="font-display text-3xl leading-tight">
          Need a specific mesh, viscosity or packing?
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-bright">
          Share your specification
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </motion.button>
  );
}

function ProductDialog({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const openDrawer = useStickyDrawerStore((s) => s.openDrawer);
  const setProducts = useUiStore((s) => s.setEnquiryProducts);

  return (
    <Modal open={!!product} onClose={onClose} overlayClassName="bg-ink/75">
      {product && (
        <motion.div
          key={`dialog-${product.id}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-dialog-title"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-x-3 bottom-3 top-16 z-[90] mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[28px] bg-paper shadow-2xl md:inset-x-6 md:top-[7vh] md:bottom-auto md:max-h-[86vh] md:flex-row"
        >
          <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-cream md:aspect-auto md:w-[42%]">
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1 font-mono text-xs text-navy">
              {product.index} / 07
            </span>
          </div>
          <div data-lenis-prevent className="flex-1 overflow-y-auto p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-gold-deep">{product.grade}</p>
                <h2
                  id="product-dialog-title"
                  className="mt-3 font-display text-4xl leading-tight text-ink"
                >
                  {product.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                data-autofocus
                aria-label="Close"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-stone-ink">{product.summary}</p>

            <p className="eyebrow mt-8 text-stone-ink">Indicative specification</p>
            <dl className="mt-3 divide-y divide-border border-y border-border">
              {product.specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.04, duration: 0.6, ease: EASE }}
                  className="flex items-baseline justify-between gap-6 py-3"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-stone-ink">
                    {s.label}
                  </dt>
                  <dd className="text-right text-sm font-semibold text-ink">{s.value}</dd>
                </motion.div>
              ))}
            </dl>

            <p className="eyebrow mt-8 text-stone-ink">Applications</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.applications.map((a) => (
                <span key={a} className="rounded-full bg-cream px-3 py-1.5 text-xs text-ink">
                  {a}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                setProducts([product.id]);
                onClose();
                // Let the dialog start its exit before the drawer slides in.
                window.setTimeout(openDrawer, 250);
              }}
              className="group mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-navy py-4 text-sm font-semibold text-cream transition-colors hover:bg-ink"
            >
              Request a quote for {product.name}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>
            <p className="mt-4 text-center text-[11px] text-stone-ink">
              Final specifications are confirmed per agreed requirement and applicable COA.
            </p>
          </div>
        </motion.div>
      )}
    </Modal>
  );
}
