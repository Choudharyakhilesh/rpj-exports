'use client';

import { TextField } from '@/components/ui/form/input';
import PhoneInputBase from '@/components/ui/form/phoneInput';
import { TextAreaField } from '@/components/ui/form/textarea';
import { PRODUCTS } from '@/lib/rpj/catalog';
import { ContactFormSchema } from '@/schema/contact-form';
import { useInquiryManagementStore } from '@/store/inquiry-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Loader2, Mail, Package, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const EnquirySchema = ContactFormSchema.extend({
  products: z.array(z.string()),
  quantity: z.string().max(120, { message: 'Keep this under 120 characters' }).optional(),
});

type EnquiryData = z.infer<typeof EnquirySchema>;

const EMPTY: EnquiryData = {
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  message: '',
  products: [],
  quantity: '',
};

/** The backend only stores the base contact fields, so product + quantity go into the message. */
function composeMessage({ products, quantity, message }: EnquiryData) {
  const names = PRODUCTS.filter((p) => products.includes(p.id)).map((p) => p.name);
  return [
    names.length ? `Products of interest: ${names.join(', ')}` : '',
    quantity ? `Quantity / destination: ${quantity}` : '',
    message ?? '',
  ]
    .filter(Boolean)
    .join('\n\n');
}

const NO_PRODUCTS: string[] = [];

export function EnquiryForm({
  initialProducts = NO_PRODUCTS,
  onSuccess,
  formId = 'enquiry-form',
}: {
  initialProducts?: string[];
  onSuccess?: () => void;
  formId?: string;
}) {
  const { apiCreateInquiry, createInquiryLoading } = useInquiryManagementStore();
  const [sent, setSent] = useState(false);
  const { control, handleSubmit, reset, setValue } = useForm<EnquiryData>({
    resolver: zodResolver(EnquirySchema),
    defaultValues: { ...EMPTY, products: initialProducts },
  });

  const initialKey = initialProducts.join(',');
  useEffect(() => {
    setValue('products', initialKey ? initialKey.split(',') : []);
  }, [initialKey, setValue]);

  const onSubmit: SubmitHandler<EnquiryData> = async (data) => {
    const [countryCode, phoneNumber] = data.mobile.split('-');
    const res = await apiCreateInquiry({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      mobile: phoneNumber,
      country_code: countryCode,
      message: composeMessage(data),
    });

    if (res?.status === 'SUCCESS') {
      reset(EMPTY);
      setSent(true);
      toast.success(res.message || 'Enquiry submitted successfully');
      onSuccess?.();
    } else {
      toast.error(res?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center py-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
            className="grid h-20 w-20 place-items-center rounded-full bg-navy text-gold-bright"
          >
            <Check className="h-9 w-9" strokeWidth={2.5} />
          </motion.div>
          <h3 className="mt-6 font-display text-3xl text-ink">Enquiry received</h3>
          <p className="mt-3 max-w-sm text-sm text-stone-ink">
            Thank you. Our team will review your requirement and get back to you shortly.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-8 text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          id={formId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div>
            <p className="eyebrow mb-3 text-stone-ink">Products of interest</p>
            <Controller
              control={control}
              name="products"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {PRODUCTS.map((p) => {
                    const on = field.value.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        aria-pressed={on}
                        onClick={() =>
                          field.onChange(
                            on ? field.value.filter((v) => v !== p.id) : [...field.value, p.id]
                          )
                        }
                        className={`relative rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                          on
                            ? 'border-navy bg-navy text-cream'
                            : 'border-border bg-white text-ink/70 hover:border-navy/40'
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              name="first_name"
              control={control}
              label="First name"
              labelBgColor="bg-white"
              startIcon={<User className="h-4 w-4 text-stone-ink" />}
            />
            <TextField
              name="last_name"
              control={control}
              label="Last name"
              labelBgColor="bg-white"
              startIcon={<User className="h-4 w-4 text-stone-ink" />}
            />
          </div>
          <TextField
            name="email"
            control={control}
            type="email"
            label="Business email"
            labelBgColor="bg-white"
            startIcon={<Mail className="h-4 w-4 text-stone-ink" />}
          />
          <PhoneInputBase name="mobile" control={control} label="" errorColor="text-red-500" />
          <TextField
            name="quantity"
            control={control}
            label="Quantity & destination port"
            labelBgColor="bg-white"
            startIcon={<Package className="h-4 w-4 text-stone-ink" />}
          />
          <TextAreaField
            name="message"
            control={control}
            label="Specification, mesh, viscosity, packaging…"
            textColor="text-black"
            labelBgColor="bg-white"
            labelTextColor="text-black"
          />

          <button
            type="submit"
            disabled={createInquiryLoading}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-navy py-4 text-sm font-semibold text-cream transition-colors disabled:opacity-70"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            <span className="relative flex items-center gap-3">
              {createInquiryLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
              {createInquiryLoading ? 'Sending…' : 'Send enquiry'}
            </span>
          </button>
          <p className="text-center text-[11px] text-stone-ink/80">
            Final specifications, packaging and quality parameters are confirmed as per agreed
            requirements.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
