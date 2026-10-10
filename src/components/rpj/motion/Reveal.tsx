'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number };

export function Reveal({ delay = 0, y = 36, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
