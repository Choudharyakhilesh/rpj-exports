'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  Globe2,
  Layers,
  Leaf,
  MoveRight,
  Scissors,
  Sparkles,
  Tag,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function AllServicesSection() {
  // PDF Data: Label Types [cite: 26, 29, 32, 35, 38, 41]
  const labelTypes = [
    {
      title: 'Brand Labels',
      desc: 'Brand labels are the core essence of your brand personality. Therefore, Vastra makes sure that every brand label reflects the class, quality, and values that a brand tends to convey to its target audience.',
      icon: <Tag className="w-5 h-5" />,
    },
    {
      title: 'Size Labels',
      desc: 'Sizing is essential for every brand. And the size chart may vary region to region and brand to brand. Whether numeric or alpha sizing, Vastra provides 100% custom-sized labels for clothing businesses. ',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      title: 'Care Labels',
      desc: 'Care instructions ensure the longevity and durability of every piece of apparel. Vastra creates care labels as per your specifications and chosen fabric material in your desired language.',
      icon: <Scissors className="w-5 h-5" />,
    },
    {
      title: 'Hang Tags',
      desc: 'The hang tags can enhance the aesthetics of a brand. Therefore, Vastra makes sure that every brand gets a beautiful hang tag that communicates the brand story with additional information. ',
      icon: <MoveRight className="w-5 h-5" />,
    },
    {
      title: 'Embroidered & Heat-Pressed Labeling',
      desc: 'We understand that a premium brand looks for durability and elite finishing. Therefore, we also provide embroidered logos and heat-pressed labeling for leading brands. ',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: 'Packaging Labels & Accessories',
      desc: 'The packaging of a brand may also require varying types of labeling, such as barcode stickers, box labels, carton labels, SKU labels, and more. Vastra manufactures such labels with eco-friendly adhesive. ',
      icon: <Leaf className="w-5 h-5" />,
    },
  ];

  function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
      {
        question: 'Can You Design Labels for Us If We Have No Idea?',
        answer:
          'Yes. Vastra is one of the highly experienced women’s clothing manufacturers in India. If you do not have any prior ideation, our design team can create a private label from scratch that perfectly suits your brand image and target audience.',
      },
      {
        question: 'Can We Get Fully Customised Labeling?',
        answer:
          'Absolutely. Vastra specialises in providing fully customised labeling solutions. If you already have a concept or design in mind, our team will deliver a 100% replica that matches your brand’s vision and expectations.',
      },
      {
        question: 'Do You Practice International Labeling and Compliance Standards?',
        answer:
          'Yes, definitely. Every label manufactured by Vastra complies with domestic and international regulations, including wash care instructions, fabric composition, country of origin, and export compliance norms.',
      },
      {
        question: 'Can We Use Our Own Label Suppliers?',
        answer:
          'Yes. If your brand already works with another label supplier but wants design or manufacturing services from Vastra, we fully support that. Our clients are free to choose which services they want from us and which from others — convenience always comes first.',
      },
    ];

    return (
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? 'border-primary/30 shadow-sm' : 'border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-6 p-6 text-left  cursor-pointer"
                aria-expanded={isOpen}
              >
                <h4 className="font-semibold text-slate-900">{faq.question}</h4>

                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <span className="text-xl leading-none">+</span>
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // PDF Data: Materials [cite: 48, 51, 55, 59, 63, 68]
  const materials = [
    {
      name: 'Woven Labels',
      features: ['Durable', 'Comfortable', 'Premium Finish'],
    },
    {
      name: 'Printed Labels',
      features: ['Cost-Effective', 'Aesthetic', 'Lightweight'],
    },
    {
      name: 'Satin Labels',
      features: ['Comfort', 'Luxury', 'Elite Finish'],
    },
    {
      name: 'Damask Labels',
      features: ['Detailing', 'High Definition', 'Woven Design'],
    },
    {
      name: 'Heat Transfer Labels',
      features: ['Tag-Free', 'Maximum Comfort', 'Light on Skin'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className=" font-sans text-slate-900">
      {/* --- Hero Section --- */}
      <section className="relative py-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial="hidden" whileInView="visible" variants={containerVariants}>
              <motion.span
                variants={itemVariants}
                className="text-primary font-semibold tracking-widest uppercase text-xs mb-4 block"
              >
                Vastra Private Labeling
              </motion.span>
              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-5xl font-light leading-tight mb-6"
              >
                Private Labeling Services <br />
                <span className="font-serif italic text-primary">By Vastra</span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed"
              >
                Helping global clothing brands establish hassle-free operations with leading
                manufacturing in India.
              </motion.p>
              <motion.button variants={itemVariants}>
                <Button
                  variant="default"
                  onClick={() => {
                    const msg = encodeURIComponent(
                      'Hello Vastra Team, I would like to explore your collections.'
                    );
                    window.open(`https://wa.me/917427873957?text=${msg}`, '_blank');
                  }}
                  className=""
                >
                  Enquire for Private Labeling <MoveRight className="w-4 h-4" />
                </Button>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src="/GettyImages.jpg" alt="Vastra Labeling" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Vastra Philosophy Section --- */}
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-3">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants}>
              <span className="text-primary uppercase tracking-widest text-xs font-semibold mb-4 block">
                Our Perspective
              </span>

              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
                How Vastra Sees Your <br />
                <span className="font-serif italic text-primary">Private Labeling</span>
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Your label is not just a piece of cloth; rather, it is your brand identity. A
                private label is how your customers perceive and identify you.
              </p>

              <p className="text-slate-600 leading-relaxed mb-6">
                Vastra makes sure that you get a special identity that resonates strongly with your
                target audience through its carefully crafted private labeling services.
              </p>

              <p className="text-slate-600 leading-relaxed">
                From extra-special brand labels to tailored care labels, Vastra provides everything
                under one roof—ensuring your brand evolves into a strong and premium personality.
              </p>
            </motion.div>

            {/* Right Highlight Card */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-10 shadow-sm"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Tag className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Brand Identity First</h4>
                    <p className="text-sm text-slate-600">
                      Labels designed to reflect your brand’s values, story, and personality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Premium Aesthetics</h4>
                    <p className="text-sm text-slate-600">
                      Clean finishes, premium materials, and detailing that elevates perception.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">All-in-One Solution</h4>
                    <p className="text-sm text-slate-600">
                      From brand labels to care labels—we handle it all seamlessly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- USPs Section --- [cite: 72, 74, 85] */}
      {/* --- USP Philosophy Section --- */}
      <section className="py-5 bg-white ">
        <div className="max-w-7xl mx-auto px-3">
          {/* Heading */}
          <div className="text-center mb-5">
            <h2 className="text-3xl md:text-3xl font-light mb-5">
              We Make Sure That Every Label Manufactured With Us Has
            </h2>
            <p className="text-slate-500 text-sm max-w-4xl mx-auto leading-relaxed">
              We’re responsible apparel manufacturers. We believe that brand labeling must be a
              feeling, an emotion, and most importantly a comfort zone for both the brand and the
              wearer. Hence, every private label designed and manufactured with us necessarily
              carries these essential USPs.
            </p>
          </div>

          {/* USP Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
            {/* Comfortable to Wear */}
            <motion.div
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <div className="mb-5 flex justify-center">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle2 className="text-green-600 w-6 h-6" />
                </div>
              </div>
              <h4 className="font-semibold mb-3">Comfortable to Wear</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We design every label with utmost care and duly test it against the skin to ensure
                it never feels itchy or uncomfortable for the wearer.
              </p>
            </motion.div>

            {/* Premium Finish */}
            <motion.div
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <div className="mb-5 flex justify-center">
                <div className="p-4 bg-amber-100 rounded-full">
                  <Award className="text-amber-600 w-6 h-6" />
                </div>
              </div>
              <h4 className="font-semibold mb-3">Premium Finish</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our labeling team ensures accurate cuts, trims, and attachments that reflect your
                brand’s emotion, story, and premium quality.
              </p>
            </motion.div>

            {/* Aesthetic Design */}
            <motion.div
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <div className="mb-5 flex justify-center">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Sparkles className="text-blue-600 w-6 h-6" />
                </div>
              </div>
              <h4 className="font-semibold mb-3">Aesthetic Design</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We let your private label speak your brand story through a unique, aesthetic design
                that builds recall and brand loyalty.
              </p>
            </motion.div>

            {/* Eco-Friendly Material */}
            <motion.div
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <div className="mb-5 flex justify-center">
                <div className="p-4 bg-emerald-100 rounded-full">
                  <Leaf className="text-emerald-600 w-6 h-6" />
                </div>
              </div>
              <h4 className="font-semibold mb-3">Eco-Friendly Material</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We use organic, biodegradable materials and avoid synthetic dyes, ensuring your
                labels are safe for both the wearer and the environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Services Grid --- [cite: 26, 48] */}
      <section className="py-5 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-3 text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-light mb-4">What Kind of Labels Can We Make?</h2>
          <p className="text-slate-500 text-md">
            From brand identity to tailored care instructions, we provide it all.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {labelTypes.map((label, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-secondary/30 text-primary rounded-xl flex items-center justify-center mb-6">
                {label.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{label.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{label.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Legacy Section --- [cite: 90, 92] */}
      <section className="py-5 bg-slate-900 text-white rounded-[40px] mx-6 my-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10">
          <Globe2 className="w-96 h-96 -mr-20 -mt-20" />
        </div>
        <div className="max-w-7xl mx-auto px-3 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light mb-6">Still Wondering Why Choose Us?</h2>

              <p className="text-slate-400 mb-10 max-w-xl">
                Choosing Vastra as your trusted clothing manufacturers in India brings multiple
                advantages to your business. Here’s why brands continue to choose Vastra over
                others.
              </p>

              <div className="space-y-8">
                {/* 3 Decades */}
                <div className="flex gap-5 items-start">
                  <div className="text-primary text-4xl font-serif leading-none">30+</div>
                  <div>
                    <h4 className="font-bold mb-1">3 Decades of Legacy</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Vastra is a well-established women’s clothing manufacturing house in India
                      with over three decades of experience, bringing deep industry knowledge and
                      trust to every brand we work with.
                    </p>
                  </div>
                </div>

                {/* Globally Trusted */}
                <div className="flex gap-5 items-start">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Globally Trusted</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Trusted worldwide as affordable yet aesthetic garment manufacturers, Vastra
                      serves small to large clothing brands across multiple international markets.
                    </p>
                  </div>
                </div>

                {/* All-in-One Solution */}
                <div className="flex gap-5 items-start">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">All-in-One Place Solution</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      From design, manufacturing, and sampling to labeling, packaging, and
                      embellishment materials — we manage every requirement under one roof.
                    </p>
                  </div>
                </div>

                {/* Design to Ship */}
                <div className="flex gap-5 items-start">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <MoveRight className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Design to Ship Services</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Vastra offers complete services from apparel design to final shipment. As a
                      global manufacturer and exporter, we seamlessly serve brands across the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-medium mb-6">What Labeling Material Can We Offer?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {materials.map((m, i) => (
                  <div key={i} className="bg-white/10 p-4 rounded-xl">
                    <span className="text-primary block font-semibold text-xs mb-2">{m.name}</span>
                    <ul className="text-[10px] space-y-1 text-slate-300">
                      {m.features.map((f, j) => (
                        <li key={j}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQs Section --- */}
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-3">
          {/* Heading */}
          {/* <div className="text-center mb-5">
            <h2 className="text-3xl md:text-3xl font-light mb-5">
              FAQs – Do You Have Any of These Queries?
            </h2>
            <p className="text-slate-500 max-w-3xl mx-auto leading-relaxed">
              We’ve answered some of the most common questions brands ask us before starting their
              private labeling journey with Vastra.
            </p>
          </div> */}

          {/* FAQ Items */}
          <section className="py-5 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              {/* Heading */}
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-3xl font-light mb-5">
                  FAQs – Do You Have Any of These Queries?
                </h2>

                <p className="text-slate-500 max-w-3xl mx-auto leading-relaxed">
                  We’ve answered some of the most common questions brands ask us before starting
                  their private labeling journey with Vastra.
                </p>
              </div>

              {/* FAQ Accordion */}
              <FAQAccordion />
            </div>
          </section>
        </div>
      </section>

      {/* --- Footer Call to Action --- [cite: 117, 118] */}
      {/* <section className="py-5 text-center">
        <h2 className="text-4xl font-serif italic mb-6">Start Your Clothing Brand Today</h2>
        <p className="text-slate-500 mb-10 max-w-2xl mx-auto">
          Connect with Vastra Exports and Launch the Clothing Brand of Your Dreams Effortlessly.
          We, at Vastra, Take Care of All Your Needs, From Pin to Needle.
        </p>
        <button className="bg-primary text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-xl">
          Contact Us Now
        </button>
      </section> */}
    </div>
  );
}
