import Link from 'next/link';

const footerLinks = [
  { name: '關於', href: '/about' },
  { name: '部落格', href: '/blog' },
  { name: '課程', href: '/courses' },
  { name: '作品集', href: '/portfolio' },
  { name: '聯絡', href: '/contact' },
];

const socialLinks = [
  { name: 'Email', href: 'mailto:admin@ezai.today', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F5F4F1]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#2D5A27]/5 blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-[#FF8F00]/5 blur-[60px]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D5A27] to-[#4a8f43] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-[#1a1a1a] font-semibold text-sm tracking-wide group-hover:text-[#2D5A27] transition-colors">
                Ezai.today
              </span>
            </Link>
            <p className="text-[#6b7280] text-sm leading-relaxed max-w-md mb-6">
              透過整合 AI 應用、物聯網與智慧機器人課程，
              激發學生探索未來的熱情，在實踐中養成具備數位韌性的創新思考者。
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E0] flex items-center justify-center text-[#6b7280] hover:text-[#2D5A27] hover:border-[#2D5A27]/30 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#1a1a1a] font-semibold mb-6 text-sm">快速連結</h4>
            <ul className="space-y-3">
              {footerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#6b7280] hover:text-[#2D5A27] transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[#2D5A27] mr-0 group-hover:mr-2 group-hover:w-3 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#E5E5E0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#9CA3AF] text-xs">
            © {new Date().getFullYear()} Ezai.today. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#9CA3AF] text-xs">
              Made with passion for education
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
