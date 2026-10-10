'use client';

import { EnquiryDrawer } from '@/components/rpj/layout/EnquiryDrawer';
import { FloatingActions } from '@/components/rpj/layout/FloatingActions';
import Preloader from '@/components/rpj/layout/Preloader';
import { SiteFooter } from '@/components/rpj/layout/SiteFooter';
import { SiteHeader } from '@/components/rpj/layout/SiteHeader';
import SmoothScroll from '@/components/rpj/motion/SmoothScroll';
import { Toaster } from '@/components/ui/sonner';
import { useHomeStore } from '@/store/home-store';
import NextTopLoader from 'nextjs-toploader';
import { useEffect, type ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const getHomeData = useHomeStore((s) => s.getHomeData);

  useEffect(() => {
    getHomeData();
  }, [getHomeData]);

  return (
    <>
      <NextTopLoader showSpinner={false} color="#c8a15a" height={2} />
      <SmoothScroll />
      <Preloader />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <EnquiryDrawer />
      <FloatingActions />
      <Toaster richColors position="bottom-left" />
    </>
  );
}
