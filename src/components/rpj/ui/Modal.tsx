'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { setScrollLocked } from '../motion/SmoothScroll';

/**
 * Portal + AnimatePresence modal shell. The panel passed as `children` must be a
 * motion element with its own `exit`, and carry role="dialog".
 */
export function Modal({
  open,
  onClose,
  children,
  overlayClassName = 'bg-ink/65',
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKey);
    const focusTimer = window.setTimeout(() => {
      container.current?.querySelector<HTMLElement>('[data-autofocus], button, a, input')?.focus();
    }, 60);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
      setScrollLocked(false);
      previous?.focus?.();
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div ref={container}>
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className={`fixed inset-0 z-[80] ${overlayClassName}`}
          />
        )}
        {open && children}
      </AnimatePresence>
    </div>,
    document.body
  );
}
