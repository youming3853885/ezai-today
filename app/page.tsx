'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Bell, Mail, MapPin, Globe, Clock,
  TrendingUp, Sun, Users, Send,
} from 'lucide-react';

/* ─── Inline SVG quote mark ─── */
const QuoteIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
    <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.654 1.346-3 3-3h1V8h-1zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.654 1.346-3 3-3h1V8h-1z" />
  </svg>
);

/* ─── Reusable section label ─── */
const SectionLabel = ({ num, text }: { num: string; text: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', color: 'var(--vermillion)' }}>
      {num}
    </span>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-secondary)' }}>
      {text}
    </span>
  </div>
);

/* ─── Course card data ─── */
const courses = [
  { tag: '人工智慧', level: '初學者', title: 'AI Python 程式設計入門', desc: '從零開始學習 Python，建立扎實基礎後進入 AI 應用領域，包含基礎語法到機器學習實作。', hours: '12', img: 'https://picsum.photos/id/0/800/600' },
  { tag: '物聯網', level: '中階', title: '物聯網 IoT 實作課程', desc: '使用 ESP32 開發板，從感測器到雲端，打造完整的智慧 IoT 解決方案。', hours: '16', img: 'https://picsum.photos/id/96/600/400' },
  { tag: '機器學習', level: '進階', title: '機器學習 ML 實戰', desc: '理論與實作並重，從資料處理到模型部署，打造你的第一個完整 ML 專案。', hours: '20', img: 'https://picsum.photos/id/26/600/400' },
  { tag: '機器人', level: '中階', title: '機器人設計與實作', desc: '從機構設計到程式控制，完整掌握機器人技術的核心概念與實際應用。', hours: '18', img: 'https://picsum.photos/id/3/600/400' },
];

/* ─── Blog posts data（靜態備用資料） ─── */
const STATIC_POSTS = [
  { slug: '', cat: '物聯網', title: 'ESP32 + MQTT：打造你的第一個智慧家庭監控系統', date: '2025.02.15' },
  { slug: '', cat: '教育思考', title: '為什麼「失敗」是智造教育中最重要的課程設計元素？', date: '2025.01.28' },
  { slug: '', cat: '機器學習', title: '五個讓高中生也能理解的機器學習概念（附實作範例）', date: '2025.01.10' },
  { slug: '', cat: '演講心得', title: '100場演講後，我對科技教育推廣的重新思考', date: '2024.12.20' },
];

/* ─── Speaking events data ─── */
const talks = [
  { event: '主題演講', title: 'AIoT 教育創新論壇：從課堂到產業的實踐路徑', date: '2025.03 · 台北', img: 'https://picsum.photos/id/1060/600/450' },
  { event: '工作坊', title: '中學教師 AI 素養工作坊：實作導向的課程設計工具', date: '2025.02 · 台中', img: 'https://picsum.photos/id/1074/600/450' },
  { event: '企業培訓', title: '製造業的 AIoT 轉型：從感測器到智慧決策', date: '2025.01 · 新竹', img: 'https://picsum.photos/id/137/600/450' },
  { event: '政府活動', title: '數位台灣：K12 學生的 AI 創造力培育策略', date: '2024.12 · 台北', img: 'https://picsum.photos/id/20/600/450' },
  { event: '大學演講', title: '智慧教育的未來圖景：當 AI 遇見創客精神', date: '2024.11 · 台南', img: 'https://picsum.photos/id/42/600/450' },
  { event: '國際研討會', title: "Taiwan's AIoT Education Model: Building Digital Resilience", date: '2024.10 · 國際場', img: 'https://picsum.photos/id/145/600/450' },
];

/* ─── Testimonials data ─── */
const testimonials = [
  { text: '上完陳老師的 IoT 課，我從「能看懂程式碼」進步到「能設計自己的感測系統」。他的教學方式讓複雜概念變得直觀易懂。', name: '林○○', role: '高中資訊科教師', avatar: 'https://picsum.photos/id/64/100/100' },
  { text: 'Eddie 的演講是我聽過最接地氣的 AI 教育分享。不只有理論，更有真實課堂案例，對我規劃校內 AI 課程幫助極大。', name: '張○○', role: '國中科技領域主任', avatar: 'https://picsum.photos/id/91/100/100' },
  { text: '企業內訓後，我們團隊對 AIoT 的理解從概念提升到落地應用。陳老師能把技術語言轉譯成商業場景，非常難得。', name: '王○○', role: '製造業數位轉型主管', avatar: 'https://picsum.photos/id/65/100/100' },
];

/* ─── Ticker skills ─── */
const skills = ['人工智慧 AI', '物聯網 IoT', '機器學習 ML', '智慧機器人', 'Python 程式設計', 'ESP32 開發', 'Arduino', '教育創新', '數位韌性', '創意專題'];

interface DynamicPost { slug: string; cat: string; title: string; date: string; }

export default function Home() {
  const [formState, setFormState] = useState<'idle' | 'success' | 'error'>('idle');
  const [posts, setPosts] = useState<DynamicPost[]>(STATIC_POSTS);
  const [featuredPost, setFeaturedPost] = useState<{ slug: string; title: string; description: string; category: string; date: string; image: string; readTime: string } | null>(null);

  useEffect(() => {
    // 動態載入最新文章
    fetch('/api/recent-posts?limit=5')
      .then((r) => r.json())
      .then((data: Array<{ slug: string; title: string; date: string; category: string; description: string; readTime: string; image: string }>) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const [first, ...rest] = data;
        setFeaturedPost({
          slug: first.slug,
          title: first.title,
          description: first.description,
          category: first.category,
          date: first.date,
          image: first.image,
          readTime: first.readTime,
        });
        setPosts(rest.map((p) => ({ slug: p.slug, cat: p.category, title: p.title, date: p.date })));
      })
      .catch(() => { /* 靜態備用資料維持不變 */ });
  }, []);

  useEffect(() => {
    /* ── Reveal on scroll ── */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    /* ── Counter animation ── */
    let statsRan = false;
    function countUp(id: string, target: number, duration: number) {
      const el = document.getElementById(id);
      if (!el) return;
      let start: number | undefined;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    const statsTrigger = document.querySelector('.stats-trigger');
    const statsObs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsRan) {
          statsRan = true;
          countUp('stat1', 200, 1400);
          countUp('stat2', 10, 800);
          countUp('stat3', 1000, 1600);
        }
      },
      { threshold: 0.4 }
    );
    if (statsTrigger) statsObs.observe(statsTrigger);

    /* ── Skill bars ── */
    const barsEl = document.querySelector('.skill-bars-trigger');
    const barsObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>('.skill-fill').forEach((fill) => {
              const w = fill.dataset.w;
              if (w) fill.style.transform = `scaleX(${w})`;
              fill.classList.add('run');
            });
            barsObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (barsEl) barsObs.observe(barsEl);

    /* ── Hero entrance ── */
    function heroFadeIn(id: string, delay: number) {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.cssText = `opacity:0;transform:translateY(28px);transition:opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms,transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (el) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
        })
      );
    }
    heroFadeIn('hero-text', 80);
    heroFadeIn('hero-visual', 220);

    return () => {
      revealObs.disconnect();
      statsObs.disconnect();
      barsObs.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim();
    if (!name || !email) { setFormState('error'); return; }
    setFormState('success');
    setTimeout(() => setFormState('idle'), 4000);
  };

  /* ─── Shared styles ─── */
  const S = {
    serif:   { fontFamily: 'var(--font-serif), Georgia, serif' } as React.CSSProperties,
    mono:    { fontFamily: 'var(--font-mono), monospace' } as React.CSSProperties,
    ink2:    { color: 'var(--ink-secondary)' } as React.CSSProperties,
    inkM:    { color: 'var(--ink-muted)' } as React.CSSProperties,
    verm:    { color: 'var(--vermillion)' } as React.CSSProperties,
    canvas:  { background: 'var(--canvas)' } as React.CSSProperties,
    s1:      { background: 'var(--surface-1)' } as React.CSSProperties,
    s2:      { background: 'var(--surface-2)' } as React.CSSProperties,
    bd:      { borderColor: 'var(--border-default)' } as React.CSSProperties,
    bs:      { borderColor: 'var(--border-subtle)' } as React.CSSProperties,
    be:      { borderColor: 'var(--border-emphasis)' } as React.CSSProperties,
  };

  return (
    <>
      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        style={S.canvas}
      >
        {/* Ando geometric grid */}
        <div className="hero-grid-bg" aria-hidden="true" />

        {/* Vermillion light shaft */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ right: '18%', width: '1px', background: 'linear-gradient(to bottom,transparent,var(--vermillion) 25%,var(--vermillion) 75%,transparent)', opacity: 0.12 }}
        />
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ right: 'calc(18% - 60px)', width: '60px', background: 'linear-gradient(to right,transparent,var(--vermillion-glow),transparent)' }}
        />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-8 py-20 grid gap-20 items-center"
          style={{ gridTemplateColumns: '1fr 460px' } as React.CSSProperties}
        >
          {/* Text */}
          <div id="hero-text">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 36, height: 1, background: 'var(--vermillion)', flexShrink: 0 }} />
              <span style={{ ...S.mono, fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-secondary)' }}>
                智造教育實驗室 · 創辦人
              </span>
            </div>

            {/* Name */}
            <h1
              className="mb-6"
              style={{ ...S.serif, fontSize: 'clamp(3.5rem,10vw,8.5rem)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.03em' }}
            >
              <span
                className="block mb-3"
                style={{ ...S.mono, fontSize: '0.32em', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-secondary)' }}
              >
                EDDIE CHEN
              </span>
              陳<span style={S.verm}>又</span>鳴
            </h1>

            {/* Role */}
            <div className="flex items-center gap-3 mb-8" style={{ ...S.mono, fontSize: '0.875rem', color: 'var(--ink-secondary)', letterSpacing: '0.05em' }}>
              <div style={{ width: 5, height: 5, background: 'var(--vermillion)', flexShrink: 0 }} />
              <span>AI &nbsp;·&nbsp; IoT &nbsp;·&nbsp; Robotics &nbsp;·&nbsp; 智造教育</span>
            </div>

            {/* Description */}
            <p className="mb-12" style={{ fontSize: '1.125rem', lineHeight: 1.85, maxWidth: 500, color: 'var(--ink-secondary)' }}>
              科技是解決問題的工具。透過整合人工智慧、物聯網與智慧機器人，培養具備數位韌性的創新思考者——讓每個學習者從使用者蛻變為創造者。
            </p>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="#courses"
                className="inline-flex items-center gap-2 transition-colors duration-150"
                style={{ height: 48, padding: '0 32px', background: 'var(--vermillion)', color: '#fff', fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '0.02em' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#BC3629')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--vermillion)')}
              >
                探索課程 <ArrowRight size={16} />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center gap-2 border transition-all duration-150"
                style={{ height: 48, padding: '0 32px', borderColor: 'var(--border-emphasis)', color: 'var(--ink-secondary)', fontSize: '0.9375rem', fontWeight: 500 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--ink-primary)'; e.currentTarget.style.color = 'var(--ink-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-emphasis)'; e.currentTarget.style.color = 'var(--ink-secondary)'; }}
              >
                了解更多
              </Link>
            </div>
          </div>

          {/* Visual — hidden on small screens */}
          <div id="hero-visual" className="relative hidden xl:block">
            <div
              className="relative"
              style={{ aspectRatio: '4/5' }}
            >
              {/* Corner brackets */}
              <div aria-hidden="true" className="absolute pointer-events-none" style={{ top: -10, right: -10, width: 72, height: 72, borderTop: '2px solid var(--vermillion)', borderRight: '2px solid var(--vermillion)', zIndex: 2 }} />
              <div aria-hidden="true" className="absolute pointer-events-none" style={{ bottom: -10, left: -10, width: 72, height: 72, borderBottom: '2px solid var(--border-emphasis)', borderLeft: '2px solid var(--border-emphasis)', zIndex: 2 }} />

              <Image
                src="/eddie.png"
                alt="陳又鳴 Eddie Chen"
                fill
                className="object-cover"
                style={{ filter: 'grayscale(10%) contrast(1.05)' }}
                priority
              />

              {/* Fade */}
              <div className="absolute bottom-0 left-0 right-0" style={{ height: '45%', background: 'linear-gradient(to top,var(--canvas),transparent)' }} />

              {/* Badge */}
              <div
                className="absolute"
                style={{ bottom: 32, left: -32, ...S.s2, border: '1px solid var(--border-default)', padding: '16px 20px' }}
              >
                <div style={{ ...S.mono, fontSize: '2.25rem', fontWeight: 600, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  200<span style={S.verm}>+</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-secondary)', marginTop: 4 }}>場演講</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" aria-hidden="true">
          <span style={{ ...S.mono, fontSize: '0.625rem', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'var(--ink-muted)' }}>scroll</span>
          <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom,var(--border-emphasis),transparent)', animation: 'scroll-pulse 1.8s ease-in-out infinite' }} />
        </div>

        {/* Mobile responsive grid fix */}
        <style>{`
          @media (max-width:1279px){#hero-text{grid-column:1/-1}}
          @media (max-width:767px){.hero-inner-grid{padding:48px 20px !important}}
        `}</style>
      </section>

      {/* ═══════════════════════════════
          STATS BAR
      ═══════════════════════════════ */}
      <div
        className="stats-trigger border-t border-b"
        style={{ ...S.s1, borderColor: 'var(--border-default)' }}
        aria-label="關鍵數據"
      >
        <div
          className="grid max-w-[1280px] mx-auto"
          style={{ gridTemplateColumns: 'repeat(3,1fr)' }}
        >
          {[
            { id: 'stat1', label: '演講場次，涵蓋校園、企業、政府機關' },
            { id: 'stat2', label: '年豐富教學與科技實務經驗' },
            { id: 'stat3', label: '學員受益，持續成長中' },
          ].map((s, i) => (
            <div
              key={s.id}
              className={`reveal${i > 0 ? ` reveal-d${i}` : ''} px-8 py-8`}
              style={{ borderRight: i < 2 ? '1px solid var(--border-default)' : 'none' }}
            >
              <div style={{ ...S.mono, fontSize: 'clamp(2.5rem,4vw,3.75rem)', fontWeight: 600, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                <span id={s.id}>0</span><span style={S.verm}>+</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════
          SKILLS TICKER
      ═══════════════════════════════ */}
      <div className="py-4 overflow-hidden border-b" style={{ borderColor: 'var(--border-subtle)' }} aria-hidden="true">
        <div className="ticker-track">
          {[...skills, ...skills].map((s, i) => (
            <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap" style={{ ...S.mono, fontSize: '0.75rem', letterSpacing: '0.06em', color: 'var(--ink-muted)', textTransform: 'uppercase' as const }}>
              <span style={{ width: 3, height: 3, background: 'var(--vermillion)', flexShrink: 0, display: 'inline-block' }} />
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════
          ABOUT
      ═══════════════════════════════ */}
      <section id="about" className="py-32" style={S.s1} aria-labelledby="about-title">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid gap-20 items-start" style={{ gridTemplateColumns: '1fr 1fr' } as React.CSSProperties}>

            {/* Left — text */}
            <div>
              <SectionLabel num="01" text="關於我" />
              <h2
                className="reveal mb-6"
                id="about-title"
                style={{ ...S.serif, fontSize: 'clamp(2rem,3.5vw,2.875rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                從創造者視角<br />重塑科技教育
              </h2>
              <p className="reveal reveal-d1 mb-6" style={{ fontSize: '1.0625rem', lineHeight: 1.9, color: 'var(--ink-secondary)' }}>
                我是陳又鳴（Eddie Chen），智造教育實驗室創辦人。擁有超過十年的科技教育實踐經驗，深信每個學習者都有能力成為科技的創造者，而非僅僅是使用者。
              </p>
              <p className="reveal reveal-d2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.9, color: 'var(--ink-secondary)' }}>
                我的教學整合人工智慧、物聯網（IoT）與智慧機器人三大核心領域，透過實作導向的課程設計，幫助學生在動手做中建立深刻理解，培養解決真實問題的能力。
              </p>
              <div className="reveal reveal-d3 mb-10 pl-6" style={{ borderLeft: '2px solid var(--vermillion)' }}>
                <p style={{ ...S.serif, fontSize: '1.25rem', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--ink-primary)' }}>
                  "科技是解決問題的工具。讓學習者從使用者蛻變為創造者，才是教育的真正價值。"
                </p>
              </div>

              {/* Skill bars */}
              <div className="reveal reveal-d4 skill-bars-trigger flex flex-col gap-5">
                {[
                  { label: '人工智慧 AI', pct: '95%', w: '0.95' },
                  { label: '物聯網 IoT',  pct: '90%', w: '0.90' },
                  { label: '智慧機器人',  pct: '85%', w: '0.85' },
                  { label: '教育設計',    pct: '93%', w: '0.93' },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between mb-2">
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{bar.label}</span>
                      <span style={{ ...S.mono, fontSize: '0.8125rem', color: 'var(--ink-secondary)' }}>{bar.pct}</span>
                    </div>
                    <div style={{ height: 2, background: 'var(--surface-4)' }}>
                      <div className="skill-fill" data-w={bar.w} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — photos + expertise */}
            <div>
              <div className="reveal grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' } as React.CSSProperties}>
                <div className="img-zoom col-span-2" style={{ aspectRatio: '16/9' }}>
                  <img src="https://picsum.photos/id/180/800/450" alt="陳又鳴老師教學實況" />
                </div>
                <div className="img-zoom" style={{ aspectRatio: '1' }}>
                  <img src="https://picsum.photos/id/160/400/400" alt="IoT 實作場景" />
                </div>
                <div className="img-zoom" style={{ aspectRatio: '1' }}>
                  <img src="https://picsum.photos/id/119/400/400" alt="機器人設計場景" />
                </div>
              </div>

              {[
                { Icon: Sun,   name: '系統化課程設計', desc: '從基礎到進階循序漸進，每課都有真實專案驗收，建立完整知識體系。' },
                { Icon: Users, name: '企業與校園雙軌', desc: '橫跨教育與產業，為K12至企業研習提供客製化科技教育方案。' },
                { Icon: TrendingUp, name: '數位韌性培育', desc: '不只教技術，更培養面對未知挑戰的思考框架與解決問題的心態。' },
              ].map(({ Icon, name, desc }, i) => (
                <div
                  key={name}
                  className={`reveal reveal-d${i + 1} flex items-start gap-4 p-5 mt-3 border transition-colors duration-150`}
                  style={{ ...S.s2, borderColor: 'var(--border-subtle)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-emphasis)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: 38, height: 38, background: 'var(--vermillion-dim)', border: '1px solid var(--vermillion-border)', color: 'var(--vermillion)' }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: 4 }}>{name}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive grid fix */}
        <style>{`@media(max-width:1023px){#about .grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ═══════════════════════════════
          COURSES
      ═══════════════════════════════ */}
      <section id="courses" className="py-32" style={S.canvas} aria-labelledby="courses-title">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-between items-end flex-wrap gap-5 mb-16">
            <div>
              <SectionLabel num="02" text="線上課程" />
              <h2 className="reveal" id="courses-title" style={{ ...S.serif, fontSize: 'clamp(2rem,3.5vw,2.875rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                系統學習，<br />成為科技創造者
              </h2>
            </div>
            <p className="reveal reveal-d1" style={{ fontSize: '1.0625rem', color: 'var(--ink-secondary)', lineHeight: 1.8, maxWidth: 360 }}>
              從零到專案，每門課程都有完整實作路徑。一次購買，永久存取。
            </p>
          </div>

          {/* Featured course */}
          <article
            className="reveal flex border mb-5 transition-all duration-300 group"
            style={{ ...S.s1, borderColor: 'var(--border-default)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-emphasis)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="img-zoom flex-shrink-0" style={{ width: '45%' }}>
              <img src={courses[0].img} alt={courses[0].title} />
            </div>
            <div className="flex flex-col p-6 flex-1">
              <div className="flex gap-2 flex-wrap mb-4">
                <span style={{ ...S.mono, fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '3px 8px', color: 'var(--vermillion)', background: 'var(--vermillion-dim)', border: '1px solid var(--vermillion-border)' }}>{courses[0].tag}</span>
                <span style={{ ...S.mono, fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '3px 8px', color: 'var(--ink-secondary)', background: 'var(--surface-3)', border: '1px solid var(--border-subtle)' }}>{courses[0].level}</span>
              </div>
              <h3 style={{ ...S.serif, fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>{courses[0].title}</h3>
              <p className="flex-1 mb-5" style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', lineHeight: 1.75 }}>{courses[0].desc}</p>
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <span className="flex items-center gap-2" style={{ ...S.mono, fontSize: '0.75rem', color: 'var(--ink-secondary)' }}>
                  <Clock size={13} /> {courses[0].hours} 小時課程
                </span>
                <span className="flex items-center gap-2" style={{ ...S.mono, fontSize: '0.6875rem', color: 'var(--ink-secondary)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#E09930', display: 'inline-block' }} />即將上線
                </span>
              </div>
            </div>
          </article>

          {/* 3-col grid */}
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(3,1fr)' } as React.CSSProperties}>
            {courses.slice(1).map((c, i) => (
              <article
                key={c.title}
                className={`reveal reveal-d${i + 1} flex flex-col border transition-all duration-300`}
                style={{ ...S.s1, borderColor: 'var(--border-default)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-emphasis)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div className="img-zoom" style={{ aspectRatio: '16/9' }}>
                  <img src={c.img} alt={c.title} />
                </div>
                <div className="flex flex-col p-6 flex-1">
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span style={{ ...S.mono, fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '3px 8px', color: 'var(--vermillion)', background: 'var(--vermillion-dim)', border: '1px solid var(--vermillion-border)' }}>{c.tag}</span>
                    <span style={{ ...S.mono, fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '3px 8px', color: 'var(--ink-secondary)', background: 'var(--surface-3)', border: '1px solid var(--border-subtle)' }}>{c.level}</span>
                  </div>
                  <h3 style={{ ...S.serif, fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>{c.title}</h3>
                  <p className="flex-1 mb-5" style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', lineHeight: 1.7 }}>{c.desc}</p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <span className="flex items-center gap-2" style={{ ...S.mono, fontSize: '0.75rem', color: 'var(--ink-secondary)' }}>
                      <Clock size={13} /> {c.hours} 小時
                    </span>
                    <span className="flex items-center gap-2" style={{ ...S.mono, fontSize: '0.6875rem', color: 'var(--ink-secondary)' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#E09930', display: 'inline-block' }} />即將上線
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border transition-all duration-150"
              style={{ height: 48, padding: '0 32px', borderColor: 'var(--border-emphasis)', color: 'var(--ink-secondary)', fontSize: '0.9375rem', fontWeight: 500 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--ink-primary)'; e.currentTarget.style.color = 'var(--ink-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-emphasis)'; e.currentTarget.style.color = 'var(--ink-secondary)'; }}
            >
              取得課程開課通知 <Bell size={15} />
            </Link>
          </div>
        </div>

        <style>{`@media(max-width:767px){#courses .grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ═══════════════════════════════
          BLOG
      ═══════════════════════════════ */}
      <section id="blog" className="py-32" style={S.s1} aria-labelledby="blog-title">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-between items-end flex-wrap gap-5 mb-10">
            <div>
              <SectionLabel num="03" text="最新文章" />
              <h2 className="reveal" id="blog-title" style={{ ...S.serif, fontSize: 'clamp(2rem,3.5vw,2.875rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                思考 · 實踐 · 分享
              </h2>
            </div>
            <Link href="/blog" className="reveal inline-flex items-center gap-2 border transition-all duration-150 h-9 px-5" style={{ borderColor: 'var(--border-emphasis)', color: 'var(--ink-secondary)', fontSize: '0.8125rem', fontWeight: 500 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--ink-primary)'; e.currentTarget.style.color = 'var(--ink-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-emphasis)'; e.currentTarget.style.color = 'var(--ink-secondary)'; }}
            >
              所有文章
            </Link>
          </div>

          <div className="grid gap-5" style={{ gridTemplateColumns: '3fr 2fr' } as React.CSSProperties}>
            {/* Featured */}
            {featuredPost ? (
              <Link href={`/blog/${featuredPost.slug}`} className="reveal flex flex-col border transition-colors duration-150 cursor-pointer group no-underline" style={{ ...S.canvas, borderColor: 'var(--border-default)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-emphasis)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              >
                <div className="img-zoom" style={{ aspectRatio: '16/9' }}>
                  <img src={featuredPost.image} alt={featuredPost.title} />
                </div>
                <div className="flex flex-col flex-1 p-8">
                  <div style={{ ...S.mono, fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--vermillion)', marginBottom: 12 }}>{featuredPost.category}</div>
                  <h3 className="mb-4 group-hover:text-[var(--vermillion)] transition-colors duration-150" style={{ ...S.serif, fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>
                    {featuredPost.title}
                  </h3>
                  <p className="flex-1 mb-6" style={{ fontSize: '0.9375rem', color: 'var(--ink-secondary)', lineHeight: 1.75 }}>
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center gap-3" style={{ ...S.mono, fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                    <span>陳又鳴</span><span style={{ color: 'var(--border-emphasis)' }}>·</span>
                    <span>{featuredPost.date}</span><span style={{ color: 'var(--border-emphasis)' }}>·</span>
                    <span>{featuredPost.readTime} read</span>
                  </div>
                </div>
              </Link>
            ) : (
              <article
                className="reveal flex flex-col border transition-colors duration-150"
                style={{ ...S.canvas, borderColor: 'var(--border-default)' }}
              >
                <div className="img-zoom" style={{ aspectRatio: '16/9' }}>
                  <img src="https://picsum.photos/id/48/800/450" alt="AI 教育" />
                </div>
                <div className="flex flex-col flex-1 p-8">
                  <div style={{ ...S.mono, fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--vermillion)', marginBottom: 12 }}>AI 教育</div>
                  <h3 className="mb-4" style={{ ...S.serif, fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>
                    2025年台灣AI教育現況：從工具使用到創造者培育的關鍵轉變
                  </h3>
                  <p className="flex-1 mb-6" style={{ fontSize: '0.9375rem', color: 'var(--ink-secondary)', lineHeight: 1.75 }}>
                    當 ChatGPT 讓每個人都能使用 AI，教育的意義究竟是什麼？
                  </p>
                </div>
              </article>
            )}

            {/* List */}
            <div className="flex flex-col gap-3">
              {posts.map((p, i) => (
                p.slug ? (
                  <Link key={p.title} href={`/blog/${p.slug}`}
                    className={`reveal reveal-d${i + 1} flex flex-col gap-2 border p-5 transition-colors duration-150 cursor-pointer group no-underline`}
                    style={{ ...S.canvas, borderColor: 'var(--border-default)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-emphasis)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
                  >
                    <div style={{ ...S.mono, fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--ink-muted)' }}>{p.cat}</div>
                    <h4 className="group-hover:text-[var(--vermillion)] transition-colors duration-150" style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.4 }}>{p.title}</h4>
                    <div style={{ ...S.mono, fontSize: '0.6875rem', color: 'var(--ink-muted)' }}>{p.date}</div>
                  </Link>
                ) : (
                  <article
                    key={p.title}
                    className={`reveal reveal-d${i + 1} flex flex-col gap-2 border p-5 transition-colors duration-150 cursor-pointer group`}
                    style={{ ...S.canvas, borderColor: 'var(--border-default)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-emphasis)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
                  >
                    <div style={{ ...S.mono, fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--ink-muted)' }}>{p.cat}</div>
                    <h4 className="group-hover:text-[var(--vermillion)] transition-colors duration-150" style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.4 }}>{p.title}</h4>
                    <div style={{ ...S.mono, fontSize: '0.6875rem', color: 'var(--ink-muted)' }}>{p.date}</div>
                  </article>
                )
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Link href="#contact" className="inline-flex items-center gap-2 border transition-all duration-150 h-12 px-8" style={{ borderColor: 'var(--border-emphasis)', color: 'var(--ink-secondary)', fontSize: '0.9375rem', fontWeight: 500 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--ink-primary)'; e.currentTarget.style.color = 'var(--ink-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-emphasis)'; e.currentTarget.style.color = 'var(--ink-secondary)'; }}
            >
              訂閱電子報 <Mail size={15} />
            </Link>
          </div>
        </div>

        <style>{`@media(max-width:899px){#blog .grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ═══════════════════════════════
          SPEAKING
      ═══════════════════════════════ */}
      <section id="speaking" className="py-32" style={S.canvas} aria-labelledby="speaking-title">
        <div className="max-w-[1280px] mx-auto px-8">
          <SectionLabel num="04" text="演講 · 作品集" />
          <h2 className="reveal mb-4" id="speaking-title" style={{ ...S.serif, fontSize: 'clamp(2rem,3.5vw,2.875rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            站上舞台，<br />傳遞知識能量
          </h2>
          <p className="reveal reveal-d1 mb-10" style={{ fontSize: '1.0625rem', color: 'var(--ink-secondary)', lineHeight: 1.8, maxWidth: 560 }}>
            從校園到企業、從政府機關到國際研討會，200+ 場演講經驗，持續推動台灣科技教育前行。
          </p>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3,1fr)' } as React.CSSProperties}>
            {talks.map((t, i) => (
              <article
                key={t.title}
                className={`reveal${i % 3 !== 0 ? ` reveal-d${(i % 3)}` : ''} border overflow-hidden transition-colors duration-300 cursor-pointer group`}
                style={{ ...S.s1, borderColor: 'var(--border-default)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-emphasis)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              >
                <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={t.img}
                    alt={t.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:[filter:grayscale(0%)]"
                    style={{ filter: 'grayscale(35%)' }}
                  />
                </div>
                <div className="p-5">
                  <div style={{ ...S.mono, fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--vermillion)', marginBottom: 8 }}>{t.event}</div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.45, marginBottom: 8 }}>{t.title}</h3>
                  <div style={{ ...S.mono, fontSize: '0.6875rem', color: 'var(--ink-muted)' }}>{t.date}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="#contact" className="inline-flex items-center gap-2 transition-colors duration-150" style={{ height: 48, padding: '0 32px', background: 'var(--vermillion)', color: '#fff', fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '0.02em' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#BC3629')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--vermillion)')}
            >
              邀請演講 <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <style>{`@media(max-width:899px){#speaking .grid{grid-template-columns:repeat(2,1fr)!important}} @media(max-width:580px){#speaking .grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ═══════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════ */}
      <section className="py-32" style={S.s1} aria-labelledby="testimonials-title">
        <div className="max-w-[1280px] mx-auto px-8">
          <SectionLabel num="05" text="學員迴響" />
          <h2 className="reveal mb-10" id="testimonials-title" style={{ ...S.serif, fontSize: 'clamp(2rem,3.5vw,2.875rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            他們說的話
          </h2>

          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(3,1fr)' } as React.CSSProperties}>
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`reveal${i > 0 ? ` reveal-d${i}` : ''} flex flex-col gap-5 p-8 border`}
                style={{ ...S.canvas, borderColor: 'var(--border-default)' }}
              >
                <div style={{ color: 'var(--vermillion)', opacity: 0.45 }}><QuoteIcon /></div>
                <p style={{ ...S.serif, fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.75, color: 'var(--ink-secondary)', flex: 1 }}>{t.text}</p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: 40, height: 40 }}>
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--ink-secondary)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`@media(max-width:899px){.testimonials-grid{grid-template-columns:1fr 1fr!important}} @media(max-width:580px){.testimonials-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ═══════════════════════════════
          CONTACT / CTA
      ═══════════════════════════════ */}
      <section id="contact" className="py-32 relative overflow-hidden" style={S.canvas} aria-labelledby="contact-title">
        {/* Ambient glow */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 0% 50%,var(--vermillion-glow),transparent),radial-gradient(ellipse 40% 80% at 100% 30%,rgba(212,64,48,0.03),transparent)' }} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-8 grid gap-16 items-start" style={{ gridTemplateColumns: '1fr 380px' } as React.CSSProperties}>
          {/* Left */}
          <div>
            <SectionLabel num="06" text="聯絡合作" />
            <h2
              className="reveal mb-6"
              id="contact-title"
              style={{ ...S.serif, fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.025em' }}
            >
              一起推動<br /><em style={{ fontStyle: 'italic', color: 'var(--vermillion)' }}>台灣科技教育</em>
            </h2>
            <p className="reveal reveal-d1 mb-8" style={{ fontSize: '1.0625rem', color: 'var(--ink-secondary)', lineHeight: 1.8 }}>
              無論是演講邀約、企業培訓、課程合作，或只是想交流科技教育的想法——歡迎與我聯繫。
            </p>
            <div className="reveal reveal-d2 flex flex-col gap-4">
              {[
                { Icon: Mail,    text: 'hello@ezai.today' },
                { Icon: MapPin,  text: '台灣 · 全台服務' },
                { Icon: Globe,   text: 'ezai.today', href: 'https://ezai.today' },
              ].map(({ Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3" style={{ fontSize: '0.9375rem', color: 'var(--ink-secondary)' }}>
                  <Icon size={16} style={{ color: 'var(--vermillion)', flexShrink: 0 }} />
                  {href ? <a href={href} style={{ textDecoration: 'underline', textDecorationColor: 'var(--border-emphasis)' }}>{text}</a> : <span>{text}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-d2 p-8 border" style={{ ...S.s1, borderColor: 'var(--border-default)' }}>
            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 24 }}>發送訊息</div>
            <form onSubmit={handleSubmit}>
              {[
                { id: 'name',    label: '姓名',   type: 'text',  placeholder: '您的姓名',               auto: 'name' },
                { id: 'email',   label: 'Email',  type: 'email', placeholder: 'your@email.com',         auto: 'email' },
                { id: 'subject', label: '主旨',   type: 'text',  placeholder: '演講邀約 / 課程合作 / 其他', auto: 'off' },
              ].map((f) => (
                <div key={f.id} className="flex flex-col gap-2 mb-4">
                  <label htmlFor={f.id} style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink-secondary)' }}>{f.label}</label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    autoComplete={f.auto}
                    placeholder={f.placeholder}
                    className="outline-none transition-colors duration-150"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border-default)', color: 'var(--ink-primary)', fontFamily: 'inherit', fontSize: '0.9375rem', padding: '10px 16px', width: '100%', minHeight: 44 }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--vermillion)'; e.target.style.background = 'var(--surface-3)'; }}
                    onBlur={(e)  => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.background = 'var(--surface-2)'; }}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="message" style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink-secondary)' }}>訊息內容</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="請簡述您的合作構想或問題……"
                  rows={4}
                  className="outline-none transition-colors duration-150 resize-y"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border-default)', color: 'var(--ink-primary)', fontFamily: 'inherit', fontSize: '0.9375rem', padding: '10px 16px', width: '100%', minHeight: 96 }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--vermillion)'; e.target.style.background = 'var(--surface-3)'; }}
                  onBlur={(e)  => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.background = 'var(--surface-2)'; }}
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 transition-colors duration-150 mt-4"
                style={{ height: 48, background: formState === 'success' ? '#2A7D4F' : 'var(--vermillion)', color: '#fff', fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '0.02em', border: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => { if (formState !== 'success') e.currentTarget.style.background = '#BC3629'; }}
                onMouseLeave={(e) => { if (formState !== 'success') e.currentTarget.style.background = 'var(--vermillion)'; }}
              >
                {formState === 'success' ? '訊息已送出！感謝您的聯繫' : formState === 'error' ? '請填寫姓名與 Email' : <><Send size={15} /> 送出訊息</>}
              </button>
            </form>
          </div>
        </div>

        <style>{`@media(max-width:1023px){#contact .grid{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  );
}
