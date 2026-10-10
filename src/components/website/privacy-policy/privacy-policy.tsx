'use client';

import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Eye,
  FileText,
  Globe,
  Share2,
  Info,
  ExternalLink,
  RefreshCcw,
} from 'lucide-react';
import { ISettings, useHomeStore } from '@/store/home-store';

export default function PrivacyPolicy() {
  const { homePageData } = useHomeStore();

  const getSetting = (key: string, defaultValue = ''): string => {
    const setting = homePageData?.setting?.find((item: ISettings) => item.key === key);
    return setting?.value || defaultValue;
  };

  const sections = [
    {
      title: '1. Information We Collect',
      icon: <FileText className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p>
            RPJ Exports respects your privacy and is committed to protecting your personal
            information shared with us. We collect users’ personal information only when the user
            voluntarily provides it to us through:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Inquiry Forms</li>
            <li>Phone Calls</li>
            <li>Emails</li>
            <li>Any other direct communication channels</li>
          </ul>
          <p className="font-medium pt-2">We may collect the following information:</p>
          <p className="text-stone-500">
            Full Name, Email Address, Phone Number, and National Location (derived from phone number
            or inquiry details).
          </p>
        </div>
      ),
    },
    {
      title: '2. How We Use Your Information',
      icon: <Eye className="w-5 h-5 text-primary" />,
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li>To respond to your inquiries and requests</li>
          <li>To communicate regarding products, services, or business opportunities</li>
          <li>To provide quotations, product details, and related information</li>
          <li>To improve our customer service and business operations</li>
          <li>For internal record-keeping</li>
          <li className="font-bold text-stone-800">
            We never sell, rent, or trade your personal information to third parties.
          </li>
        </ul>
      ),
    },
    {
      title: '3. Location Information',
      icon: <MapPin className="w-5 h-5 text-primary" />,
      content:
        'Your national location is identifiable from your phone number and inquiry details. This information is used only to understand your geographical market and to communicate with you appropriately.',
    },
    {
      title: '4. Data Protection and Security',
      icon: <Globe className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p>
            As our website and services are accessible globally, RPJ Exports aims to comply with
            widely recognized international data protection and privacy regulations, including but
            not limited to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
              <p className="font-bold text-stone-800 text-sm">GDPR (European Union)</p>
              <p className="text-xs text-stone-500">General Data Protection Regulation</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
              <p className="font-bold text-stone-800 text-sm">CCPA (California, USA)</p>
              <p className="text-xs text-stone-500">California Consumer Privacy Act</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
              <p className="font-bold text-stone-800 text-sm">UK GDPR</p>
              <p className="text-xs text-stone-500">Data Protection Act 2018</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
              <p className="font-bold text-stone-800 text-sm">IT Act, 2000 & Rules 2011</p>
              <p className="text-xs text-stone-500">Applicable to users in India</p>
            </div>
          </div>
          <p className="bg-primary/5 p-4 rounded-lg text-sm  text-stone-700">
            Under these regulations, users may have rights related to access, correction, deletion,
            or restriction of their personal data. We honor such requests in accordance with
            applicable laws.
          </p>
        </div>
      ),
    },
    {
      title: '5. Data Sharing',
      icon: <Share2 className="w-5 h-5 text-primary" />,
      content:
        'We do not share your personal information with third parties except when required by law or legal obligations, or to protect our legal rights and comply with regulatory requirements.',
    },
    {
      title: '6. Your Rights',
      icon: <Info className="w-5 h-5 text-primary" />,
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li>Request access to the personal information we hold about you</li>
          <li>Request correction of inaccurate or incomplete information</li>
          <li>Request deletion of your personal information, subject to legal requirements</li>
        </ul>
      ),
    },
    {
      title: '7. Third-Party Links',
      icon: <ExternalLink className="w-5 h-5 text-primary" />,
      content:
        'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of such external sites.',
    },
    {
      title: '8. Updates to This Privacy Policy',
      icon: <RefreshCcw className="w-5 h-5 text-primary" />,
      content:
        'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.',
    },
  ];

  return (
    <div className="bg-paper py-20 md:py-28">
      <div className="shell max-w-5xl">
        {/* Intro Text */}
        <div className="mb-6 p-6 bg-cream rounded-2xl border-l-4 border-gold text-stone-600">
          {` In this privacy policy, "we", "our", and "us" stand for RPJ Exports. “You”, “Your”,
          “Yours” stand for the website users. This policy explains how we collect, use, and protect
          your information.`}
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-border transition-colors duration-300 hover:border-gold/60"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-stone-50 rounded-lg">{section.icon}</div>
                <h2 className="font-display text-2xl text-ink">{section.title}</h2>
              </div>
              <div className="text-stone-600 leading-relaxed font-light">{section.content}</div>
            </div>
          ))}

          {/* 9. Final Contact Section */}
          <div className="grain relative overflow-hidden bg-ink text-cream p-10 rounded-3xl mt-6">
            <h2 className="font-display text-4xl mb-6">9. Contact Us</h2>
            <p className="mb-10 opacity-90 font-light text-lg">
              {`If you have any questions, concerns, or want to exercise your rights listed in section
              6, please contact us:`}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3 opacity-80 mb-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">Email</span>
                </div>
                <p className="text-lg font-medium">
                  {getSetting('office_mail_address', 'info@rpjexports.com')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 opacity-80 mb-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">Phone</span>
                </div>
                <p className="text-lg font-medium">
                  {'+91 95888 84725'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 opacity-80 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">Address (HQ)</span>
                </div>
                <p className="text-lg font-medium">
                  {getSetting('office_address', 'Jaipur, Rajasthan, India')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
