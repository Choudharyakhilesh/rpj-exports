import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "Summer Tops", href: "/categories/tops" },
        { name: "Summer Dresses", href: "/categories/dresses" },
        { name: "Beachwear", href: "/categories/beachwear" },
        { name: "Resort Wear", href: "/categories/resort" },
        { name: "Accessories", href: "/categories/accessories" },
        { name: "New Arrivals", href: "/collections/new" },
        { name: "Sale", href: "/sale" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact-us" },
        { name: "Shipping & Returns", href: "/shipping" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "Track Order", href: "/track-order" },
        { name: "FAQ", href: "/faq" },
        { name: "Gift Cards", href: "/gift-cards" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Story", href: "/about-us" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Affiliates", href: "/affiliates" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Accessibility", href: "/accessibility" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    // { icon: Pinterest, href: "#", label: "Pinterest" },
  ];

  const paymentMethods = ["VISA", "MASTERCARD", "PAYPAL", "APPLE PAY", "GOOGLE PAY"];

  return (
    <footer className="bg-black text-white border-t border-white/10">
      {/* Newsletter */}
      <section className="py-14 border-b border-white/10">
        <div className="premium-container text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-serif tracking-wide mb-4">Join the RPJ Exports Circle</h3>
          <p className="text-gray-400 mb-6 text-sm">
            Business updates, sourcing opportunities and export-ready product support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg bg-neutral-900 text-white border border-white/10 focus:outline-none focus:border-white/40"
            />
            <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-neutral-200 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="premium-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="text-3xl font-serif tracking-wider text-white">RPJ Exports</div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Trusted sourcing and export support for businesses seeking dependable product supply,
              documentation assistance and smooth shipment coordination.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-neutral-900 border border-white/10 rounded-full flex items-center justify-center hover:border-white transition"
                >
                  <social.icon className="w-5 h-5 text-gray-300" />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@rpjexports.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> India
              </p>
            </div>
          </div>

          {/* Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-lg tracking-wide mb-6 text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Row */}
        <div className="border-t border-white/10 pt-10 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Free Shipping", subtitle: "On orders above ₹2000" },
            { title: "Easy Returns", subtitle: "Hassle-free 7-day returns" },
            { title: "Secure Checkout", subtitle: "Encrypted payment process" },
            { title: "24/7 Support", subtitle: "We are here for you" },
          ].map((item) => (
            <div key={item.title} className="text-left">
              <h5 className="text-white font-medium">{item.title}</h5>
              <p className="text-gray-400 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/10 pt-10 pb-8 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h5 className="text-white font-medium mb-2">We Accept</h5>
            <div className="flex space-x-3">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="px-4 py-2 bg-neutral-900 text-gray-300 border border-white/10 rounded text-xs"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <p className="text-gray-500 text-sm text-center sm:text-right mt-6 sm:mt-0">
            © {currentYear} RPJ Exports. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
