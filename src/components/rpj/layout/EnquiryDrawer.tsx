'use client';

import { COMPANY } from '@/lib/rpj/catalog';
import { useUiStore } from '@/lib/rpj/ui-store';
import { useStickyDrawerStore } from '@/store/useStickyDrawerStore';
import { motion } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { useEffect } from 'react';
import { EnquiryForm } from '../ui/EnquiryForm';
import { Modal } from '../ui/Modal';

const EASE = [0.16, 1, 0.3, 1] as const;

export function EnquiryDrawer() {
  const { isOpen, closeDrawer } = useStickyDrawerStore();
  const products = useUiStore((s) => s.enquiryProducts);
  const setProducts = useUiStore((s) => s.setEnquiryProducts);

  useEffect(() => {
    if (!isOpen) setProducts([]);
  }, [isOpen, setProducts]);

  return (
    <Modal open={isOpen} onClose={closeDrawer}>
      <motion.aside
        key="enquiry-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-[520px] flex-col bg-white shadow-2xl"
      >
        <div className="grain relative overflow-hidden bg-ink px-7 pb-8 pt-7 text-cream">
          <div className="flex items-start justify-between">
            <p className="eyebrow text-gold-bright">Request a quote</p>
            <button
              onClick={closeDrawer}
              data-autofocus
              className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition-colors hover:bg-cream hover:text-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <h2 id="enquiry-title" className="mt-4 font-display text-4xl leading-tight">
            Tell us what you need.
          </h2>
          <p className="mt-2 text-sm text-cream/60">
            Share grade, mesh, viscosity, quantity and destination — we coordinate the rest.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-cream/70">
            {COMPANY.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, '')}`}
                className="flex items-center gap-1.5 hover:text-gold-bright"
              >
                <Phone className="h-3 w-3" /> {p}
              </a>
            ))}
          </div>
        </div>
        <div data-lenis-prevent className="flex-1 overflow-y-auto px-7 py-7">
          <EnquiryForm formId="drawer-enquiry-form" initialProducts={products} />
        </div>
      </motion.aside>
    </Modal>
  );
}
