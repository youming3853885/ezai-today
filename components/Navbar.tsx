'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: '首頁', href: '/' },
  { name: '關於', href: '/about' },
  { name: '部落格', href: '/blog' },
  { name: '課程', href: '/courses' },
  { name: '作品集', href: '/portfolio' },
  { name: '聯絡', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-[#2D5A27]/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo with animation */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D5A27] to-[#4a8f43] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-[#2D5A27]/20">
              <span className="text-white font-bold text-sm">E</span>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[#1a1a1a] font-semibold text-sm tracking-wide group-hover:text-[#2D5A27] transition-colors">
              Ezai.today
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-[#2D5A27] bg-[#2D5A27]/10'
                    : 'text-[#4B5563] hover:text-[#2D5A27] hover:bg-[#2D5A27]/5'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {item.name}
                {/* Active indicator */}
                {pathname === item.href && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#2D5A27]" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/courses"
              className="btn-primary text-sm relative overflow-hidden group"
            >
              <span className="relative z-10">開始學習</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-3 rounded-xl text-[#4B5563] hover:text-[#2D5A27] hover:bg-[#2D5A27]/5 transition-all duration-300"
          >
            <div className="relative w-5 h-5">
              <span className={`absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-2 w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-[#E5E5E0] bg-white/98 backdrop-blur-xl">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-[#2D5A27] bg-[#2D5A27]/10'
                    : 'text-[#4B5563] hover:text-[#2D5A27] hover:bg-[#2D5A27]/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/courses"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center btn-primary text-sm"
              >
                開始學習
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
