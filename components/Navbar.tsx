'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: '關於',   href: '#about' },
  { name: '課程',   href: '#courses' },
  { name: '文章',   href: '#blog' },
  { name: '演講',   href: '#speaking' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] h-16 flex items-center border-b transition-all duration-300"
      style={{
        background:   scrolled ? 'rgba(9,9,9,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderColor:  scrolled ? 'rgba(237,234,228,0.09)' : 'transparent',
      }}
    >
      <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={close}>
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: 30, height: 30, background: 'var(--vermillion)' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
              <rect x="1" y="1" width="6" height="6" />
              <rect x="9" y="1" width="6" height="6" />
              <rect x="5" y="9" width="6" height="6" />
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--ink-primary)' }}>
            EDDIE CHEN
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink-secondary)', transition: 'color 150ms' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-secondary)')}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            className="flex items-center border transition-all duration-150"
            style={{ height: 36, padding: '0 20px', borderColor: 'var(--border-emphasis)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink-primary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink-primary)'; e.currentTarget.style.color = 'var(--canvas)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-primary)'; }}
          >
            聯絡我
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center"
          style={{ width: 44, height: 44, color: 'var(--ink-secondary)' }}
          onClick={() => setOpen(!open)}
          aria-label={open ? '關閉選單' : '開啟選單'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 bottom-0 fixed flex flex-col gap-6 px-8 pt-10"
          style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border-default)', zIndex: 199, minHeight: '100vh' }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--ink-primary)' }}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            className="flex items-center border"
            style={{ height: 48, padding: '0 24px', borderColor: 'var(--border-emphasis)', fontSize: '1rem', fontWeight: 600, color: 'var(--ink-primary)', display: 'inline-flex', alignSelf: 'flex-start' }}
          >
            聯絡我
          </a>
        </div>
      )}
    </nav>
  );
}
