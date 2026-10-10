'use client';

import { COMPANY } from '@/lib/rpj/catalog';
import { useSettings } from '@/lib/rpj/use-settings';
import { Clock, Mail, Phone, type LucideIcon } from 'lucide-react';
import { Reveal } from '../motion/Reveal';
import { EnquiryForm } from '../ui/EnquiryForm';
import { SectionHeading } from './SectionHeading';

export function ContactSection({}: { showMap?: boolean }) {
  const { email, hours } = useSettings();

  const details: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
    ...COMPANY.phones.map((p) => ({
      icon: Phone,
      label: 'Call',
      value: p,
      href: `tel:${p.replace(/\s/g, '')}`,
    })),
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    // { icon: MapPin, label: 'Office', value: address },
    ...(hours ? [{ icon: Clock, label: 'Hours', value: hours }] : []),
  ];

  return (
    <section id="contact" className="relative bg-cream py-8 md:py-10">
      <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title="Share your requirement. We'll coordinate the rest."
            body="Tell us the product, grade, mesh, viscosity, quantity and destination. We respond with the right next step."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {details.map((d, i) => {
              const Inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-gold-bright">
                    <d.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block text-[10px] text-stone-ink">{d.label}</span>
                    <span className="mt-1 block break-words font-medium text-ink">{d.value}</span>
                  </span>
                </>
              );
              return (
                <Reveal key={`${d.label}-${i}`} delay={i * 0.05}>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-paper p-4 transition-colors hover:border-navy/40"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-paper p-4">
                      {Inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
          {/* {showMap && mapEmbed && (
            <Reveal className="mt-6 h-72 overflow-hidden rounded-[24px] border border-border">
              <iframe
                src={mapEmbed}
                title="RPJ Exports location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          )} */}
        </div>

        <Reveal className="rounded-[28px] border border-border bg-white p-6 shadow-[0_40px_80px_-40px_rgba(10,26,47,0.25)] md:p-10">
          <p className="eyebrow text-gold-deep">Enquiry form</p>
          <h3 className="mb-8 mt-3 font-display text-3xl text-ink">Request a quote</h3>
          <EnquiryForm formId="contact-enquiry-form" />
        </Reveal>
      </div>
    </section>
  );
}
