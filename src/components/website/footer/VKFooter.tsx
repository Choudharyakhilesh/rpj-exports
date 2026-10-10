'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  LucideIcon,
} from 'lucide-react';

import { useHomeStore, ISettings } from '@/store/home-store';

const SOCIAL_ICON_MAP: Record<string, LucideIcon> = {
  facebook_url: Facebook,
  instagram_url: Instagram,
  twitter_url: Twitter,
  youtube_url: Youtube,
  linkedln_url: Linkedin,
};

export function VKFooter() {
  const { homePageData } = useHomeStore();

  /* -----------------------------
     GET SETTING BY KEY
  -------------------------------- */
  const getSetting = (key: string, defaultValue = ''): string => {
    const setting = homePageData?.setting?.find((item: ISettings) => item.key === key);
    return setting?.value || defaultValue;
  };

  /* -----------------------------
     FILTER ONLY VALID SOCIAL LINKS
  -------------------------------- */
  const socialLinks =
    homePageData?.setting?.filter(
      (item: ISettings) => SOCIAL_ICON_MAP[item.key] && item.value && item.value.trim() !== ''
    ) || [];

  return (
    <footer className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4">
        {/* MAIN CONTENT */}
        <div className="bg-[#FDFBF7] rounded-2xl md:rounded-[3rem] p-4 md:p-8 border border-stone-100 shadow-sm relative overflow-hidden">
          {/* BACKGROUND LETTER */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <span className="text-9xl font-serif font-bold text-stone-900">V</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
            {/* BRAND */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold tracking-wide text-[#17335a]">RPJ</span>
                <span className="text-xl font-semibold tracking-wide text-[#e7551b]">Exports</span>
              </div>

              <p className="text-stone-500 text-sm leading-relaxed font-light">
                Trusted sourcing and export support for businesses seeking dependable product supply,
                documentation assistance and smooth shipment coordination.
              </p>

              {/* SOCIAL ICONS (NOW WORKING) */}
              <div className="flex space-x-4 pt-2">
                {socialLinks.map((item) => {
                  const Icon = SOCIAL_ICON_MAP[item.key];

                  return (
                    <Link
                      key={item.key}
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-100 text-stone-600 hover:bg-[#C29043] hover:text-white transition-all duration-300 shadow-sm"
                    >
                      <Icon size={16} strokeWidth={1.5} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C29043]" />
                <h3 className="text-stone-900 font-bold text-sm uppercase tracking-[0.2em]">
                  Explore
                </h3>
              </div>

              <ul className="space-y-4">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'All Products', href: '/all-products' },
                  { label: 'Blogs', href: '/blogs' },
                  { label: 'About Us', href: '/about-us' },
                  { label: 'Contact Us', href: '/contact-us' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-stone-500 font-normal hover:text-[#C29043] transition-colors text-sm  flex items-center group"
                    >
                      <p className="w-0  group-hover:w-4 transition-all duration-300 h-[1px] bg-[#C29043] mr-0 group-hover:mr-2" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* PRIVACY POLICY */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C29043]" />
                <h3 className="text-stone-900 font-bold text-sm uppercase tracking-[0.2em]">
                  Privacy Policy
                </h3>
              </div>

              <ul className="space-y-4">
                {[{ label: 'Privacy Policy', href: '/privacy-policy' }].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-stone-500 font-normal hover:text-[#C29043] transition-colors text-sm  flex items-center group"
                    >
                      <p className="w-0  group-hover:w-4 transition-all duration-300 h-[1px] bg-[#C29043] mr-0 group-hover:mr-2" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C29043]" />
                <h3 className="text-stone-900 font-bold text-sm uppercase tracking-[0.2em]">
                  Contact
                </h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <Phone size={14} className="mt-1 text-[#C29043]" />
                  <span className="text-sm text-stone-600 font-medium">
                    {getSetting('contact_number', '+91 7427873957')}
                  </span>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail size={14} className="mt-1 text-[#C29043]" />
                  <span className="text-sm text-stone-600 font-medium break-all">
                    {getSetting('office_mail_address', 'info@rpjexports.com')}
                  </span>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin size={14} className="mt-1 text-[#C29043]" />
                  <span className="text-sm text-stone-600 leading-relaxed font-medium line-clamp-2">
                    {getSetting('office_address', 'Jaipur, Rajasthan')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="w-full bg-[#C29043] py-5 rounded-t-[2.5rem] text-center mt-6">
          <p className="text-white text-[11px] uppercase tracking-[0.3em] font-bold">
            © {new Date().getFullYear()} RPJ EXPORTS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
