'use client';

import Link from 'next/link';

const colLinks = {
  快速連結: [
    { name: '關於我',   href: '#about' },
    { name: '線上課程', href: '#courses' },
    { name: '最新文章', href: '#blog' },
    { name: '演講作品', href: '#speaking' },
    { name: '聯絡合作', href: '#contact' },
  ],
  課程分類: [
    { name: 'AI 人工智慧',    href: '#courses' },
    { name: '物聯網 IoT',    href: '#courses' },
    { name: '機器學習 ML',   href: '#courses' },
    { name: '智慧機器人',    href: '#courses' },
    { name: 'Python 程式設計', href: '#courses' },
  ],
  服務項目: [
    { name: '演講邀約', href: '#contact' },
    { name: '企業培訓', href: '#contact' },
    { name: '學校研習', href: '#contact' },
    { name: '課程合作', href: '#contact' },
    { name: '顧問諮詢', href: '#contact' },
  ],
};

const socialLinks = [
  { label: 'YouTube', href: '#', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> },
  { label: 'LinkedIn', href: '#', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: 'Facebook', href: '#', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label: 'Instagram', href: '#', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: 'var(--surface-1)', borderColor: 'var(--border-default)' }}
    >
      <div className="max-w-[1280px] mx-auto px-8">

        {/* Main grid */}
        <div
          className="grid gap-12 py-16"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' } as React.CSSProperties}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 28, height: 28, background: 'var(--vermillion)' }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
                  <rect x="1" y="1" width="6" height="6" />
                  <rect x="9" y="1" width="6" height="6" />
                  <rect x="5" y="9" width="6" height="6" />
                </svg>
              </div>
              <span
                style={{ fontFamily: 'var(--font-mono),monospace', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--ink-primary)' }}
              >
                EDDIE CHEN
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', lineHeight: 1.7, marginTop: 16, maxWidth: 260 }}>
              智造教育實驗室 — 讓每個學習者從使用者蛻變為科技創造者。
            </p>

            {/* Social */}
            <div className="flex gap-2 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center border transition-all duration-150"
                  style={{ width: 34, height: 34, borderColor: 'var(--border-default)', color: 'var(--ink-secondary)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--ink-primary)'; e.currentTarget.style.color = 'var(--ink-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--ink-secondary)'; }}
                >
                  <svg className="w-[15px] h-[15px]">{s.svg}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(colLinks).map(([heading, links]) => (
            <div key={heading}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-primary)', marginBottom: 20 }}>
                {heading}
              </div>
              <div className="flex flex-col gap-3">
                {links.map((l) => (
                  <a
                    key={l.name}
                    href={l.href}
                    style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', transition: 'color 150ms' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-secondary)')}
                  >
                    {l.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between flex-wrap gap-4 py-5"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <span style={{ fontFamily: 'var(--font-mono),monospace', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
            © {new Date().getFullYear()} Eddie Chen · 智造教育實驗室 · ezai.today
          </span>
          <span style={{ fontFamily: 'var(--font-mono),monospace', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
            以熱情與程式碼構建
          </span>
        </div>
      </div>

      <style>{`@media(max-width:1023px){footer .grid{grid-template-columns:1fr 1fr!important}} @media(max-width:580px){footer .grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
