import Link from 'next/link';

const footerLinks = [
  { name: '關於', href: '/about' },
  { name: '部落格', href: '/blog' },
  { name: '課程', href: '/courses' },
  { name: '作品集', href: '/portfolio' },
  { name: '聯絡', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#F5F4F1] border-t border-[#E5E5E0]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2D5A27] flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-sm font-medium text-[#1a1a1a]">Ezai.today</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-4">
            {footerLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs text-[#6b7280] hover:text-[#2D5A27] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#9CA3AF]">
            © {new Date().getFullYear()} Ezai.today
          </p>
        </div>
      </div>
    </footer>
  );
}
