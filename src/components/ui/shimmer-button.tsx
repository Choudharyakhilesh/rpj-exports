'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const shimmerButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-pink-500 to-peach-500 text-white hover:from-pink-600 hover:to-peach-600 shadow-lg hover:shadow-xl',
        primary:
          'bg-gradient-to-r from-sky-500 to-mint-500 text-white hover:from-sky-600 hover:to-mint-600 shadow-lg hover:shadow-xl',
        accent:
          'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl',
        outline:
          'border-2 border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-pink-300 hover:shadow-md',
        ghost: 'hover:bg-pink-50 hover:text-pink-700',
        premium:
          'bg-gradient-to-r from-pink-100 via-peach-100 to-pink-100 text-neutral-900 hover:from-pink-200 hover:via-peach-200 hover:to-pink-200 shadow-lg hover:shadow-xl',
        shimmer:
          'bg-gradient-to-r from-neutral-200 via-white to-neutral-200 text-neutral-900 hover:from-neutral-300 hover:via-white hover:to-neutral-300 shadow-lg hover:shadow-xl',
      },
      size: {
        default: 'h-12 px-6 py-2',
        sm: 'h-10 rounded-lg px-4 text-xs',
        lg: 'h-14 rounded-2xl px-8 text-base',
        xl: 'h-16 rounded-3xl px-12 text-lg',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof shimmerButtonVariants> {
  asChild?: boolean;
  shimmer?: boolean;
}

const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    { className, variant, size, shimmer = false, asChild: _asChild = false, children, ...props },
    ref
  ) => {
    return (
      <button
        className={`${shimmerButtonVariants({ variant, size, className })} ${
          shimmer ? 'animate-shimmer' : ''
        }`}
        ref={ref}
        style={{
          backgroundSize: shimmer ? '200% 100%' : undefined,
          animation: shimmer ? 'shimmer 2s infinite' : undefined,
        }}
        {...props}
      >
        {shimmer && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);
ShimmerButton.displayName = 'ShimmerButton';

export { ShimmerButton, shimmerButtonVariants };
