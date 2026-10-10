'use client';

import { useHomeStore } from '@/store/home-store';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);

  const { getHomeData } = useHomeStore();

  useEffect(() => {
    getHomeData();
  }, [getHomeData]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 20);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact', href: '/contact-us' },
  ];

  return (
    <>
      {/* Header */}
      <header
      // className={`sticky top-0 z-40 transition-all duration-300 ${
      //   isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white "
      // }`}
      >
        <div className="premium-container">
          <div className="flex items-center h-16">
            <div className="w-[30%]">
              <Link href="/" className="flex items-center">
                <Image
                  src="/rpjlogo.jpeg"
                  alt="Vastra Logo"
                  width={500}
                  height={500}
                  className="w-[95px] h-[18%]"
                />
              </Link>
            </div>
            <div className="w-[70%]">
              <nav className="hidden md:flex items-center lg:space-x-8 space-x-4">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative font-playfair font-medium transition-colors
          ${isActive ? 'text-primary' : 'text-black hover:text-primary'}`}
                    >
                      {item.name}

                      {/* underline */}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300
            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Right Side Icons */}
              <div className="flex justify-end items-center space-x-4">
                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-black hover:text-[#D4C5A9]"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* DRAWER */}
          <div
            className={`absolute right-0 top-0 h-full w-[70%] max-w-sm bg-white
          transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          >
            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
              <span className="text-2xl font-playfair tracking-widest text-primary">VASTRA</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* DRAWER MENU */}
            <div className="p-3 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base transition ${
                      isActive ? 'bg-secondary text-primary' : 'text-black hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
