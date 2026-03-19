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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'bg-white/95 border-b border-[#E5E5E0]' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2D5A27] flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-sm font-medium text-[#1a1a1a]">Ezai.today</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                  pathname === item.href
                    ? 'text-[#2D5A27] bg-[#2D5A27]/10'
                    : 'text-[#6b7280] hover:text-[#2D5A27]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/courses" className="btn-primary text-xs px-4 py-2">
              開始學習
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            <div className="w-5 h-4 relative">
              <span className={`absolute left-0 w-full h-0.5 bg-[#4B5563] ${isOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 w-full h-0.5 bg-[#4B5563] ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 w-full h-0.5 bg-[#4B5563] ${isOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#E5E5E0] bg-white">
          <div className="px-6 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-3 text-xs font-medium rounded-lg ${
                  pathname === item.href
                    ? 'text-[#2D5A27] bg-[#2D5A27]/10'
                    : 'text-[#6b7280]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
