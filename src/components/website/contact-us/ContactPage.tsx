'use client';

import { TextField } from '@/components/ui/form/input';
import PhoneInputBase from '@/components/ui/form/phoneInput';
import { TextAreaField } from '@/components/ui/form/textarea';
import LoadingButton from '@/components/ui/loading-button';
import { ContactFormSchema } from '@/schema/contact-form';
import { useHomeStore } from '@/store/home-store';
import { useInquiryManagementStore } from '@/store/inquiry-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, Mail, MapPin, MessageSquare, Phone, User } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

type SettingKey = 'contact_number' | 'opening_hours' | 'office_address' | 'office_mail_address';

type SettingMap = Partial<Record<SettingKey, string>>;

type ContactFormData = z.infer<typeof ContactFormSchema>;

const ContactPage = () => {
  const { apiCreateInquiry, createInquiryLoading } = useInquiryManagementStore();
  const { homePageData } = useHomeStore();

  const settingData: SettingMap | undefined = homePageData?.setting?.reduce((acc, item) => {
    acc[item.key as SettingKey] = item.value;
    return acc;
  }, {} as SettingMap);

  const {
    control,
    handleSubmit,
    formState: {},
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    const [countryCode, phoneNumber] = data?.mobile.split('-');

    const formdata = {
      ...data,
      mobile: phoneNumber,
      country_code: countryCode,
    };
    const res = await apiCreateInquiry(formdata);
    console.log('resres', res);

    if (res && res.status === 'SUCCESS') {
      reset({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        message: '',
      });
      setValue('mobile', '', {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });

      toast.success(res.message || 'Inquiry submitted successfully');
    } else {
      toast.error(res?.message || 'Something went wrong');
    }
  };

  const mapUrl = homePageData?.map?.embed_url;

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: settingData?.office_mail_address,
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: `+91 ${settingData?.contact_number}`,
    },
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: settingData?.office_address,
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: settingData?.opening_hours,
    },
  ];

  return (
    <div className="min-h-screen  pb-20 bg-white text-black mx-auto max-w-[1400px] px-4">
      {/* HERO */}
      <section className="relative overflow-hidden  py-5 mb-10 ">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-6 text-secondary" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-6 text-primary">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed">
            {` We're here to assist you. Reach out and our team will get back to you promptly.`}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* INFO CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="bg-neutral-900 border border-neutral-300 rounded-2xl p-6 shadow-sm hover:shadow-xl  transition-all"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary mb-4">
                <info.icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="text-lg font-bold mb-1">{info.title}</h3>

              <p className="text-primary font-medium">{info.details}</p>
            </div>
          ))}
        </div>

        {/* FORM + MAP */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div>
            <div className="bg-neutral-900 border border-neutral-300 rounded-2xl p-4 shadow-lg">
              <h2 className="text-3xl font-bold mb-2 tracking-wide">Send a Message</h2>
              <p className="text-gray-400 mb-8">
                Fill out the form and our team will reach out soon.
              </p>

              <form
                id="contact-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-full mx-auto"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <TextField
                        name="first_name"
                        control={control}
                        placeholder=""
                        textColor="text-black"
                        labelBgColor="bg-white"
                        label={'First Name'}
                        startIcon={<User className="w-4 h-4 text-gray-800" />}
                      />
                    </div>
                    <div>
                      <TextField
                        name="last_name"
                        control={control}
                        placeholder=""
                        textColor="text-black"
                        labelBgColor="bg-white"
                        label={'Last Name'}
                        startIcon={<User className="w-4 h-4 text-gray-800" />}
                      />
                    </div>
                  </div>

                  <div>
                    <TextField
                      name="email"
                      control={control}
                      placeholder=""
                      type="email"
                      textColor="text-black"
                      labelBgColor="bg-white"
                      label={'Email'}
                      startIcon={<Mail className="w-4 h-4 text-gray-800" />}
                    />
                  </div>

                  <div>
                    <div>
                      <PhoneInputBase
                        name="mobile"
                        control={control}
                        label=""
                        textColor="text-black"
                        labelTextColor="text-white"
                        // borderColor="border-gray-300"
                        errorColor="text-red-400 "
                      />
                    </div>
                  </div>

                  <div>
                    <TextAreaField
                      name="message"
                      control={control}
                      label="Message"
                      textColor="text-black"
                      labelBgColor="bg-white"
                      labelTextColor="text-black"
                    />
                  </div>

                  <div className="text-center pt-2 sm:pt-4">
                    <LoadingButton
                      type="submit"
                      isLoading={createInquiryLoading}
                      form="contact-form"
                      className="bg-primary cursor-pointer"
                    >
                      Submit
                    </LoadingButton>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* MAP + FAQ */}
          <div className="space-y-8">
            {/* MAP */}
            <div className="bg-neutral-900 border border-neutral-300 rounded-2xl shadow-xl overflow-hidden h-[489px]">
              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Map not available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
      </div>
    </div>
  );
};

export default ContactPage;
