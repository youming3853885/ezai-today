import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/background.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/80 via-[#FAF9F6]/70 to-[#FAF9F6]" />
        </div>

        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-[#A5D6A7]/15 blur-[80px] animate-float" />
          <div className="absolute top-[20%] right-[10%] w-40 h-40 rounded-full bg-[#FF8F00]/8 blur-[60px] animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[20%] left-[15%] w-48 h-48 rounded-full bg-[#2D5A27]/8 blur-[70px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#2D5A27]/20 mb-12 shadow-lg shadow-[#2D5A27]/5 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse" />
            <span className="text-xs font-semibold text-[#2D5A27] tracking-[0.25em] uppercase">AI · IoT · Robotics</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a] mb-6 animate-fade-in-up delay-100">
            <span className="block text-[#6b7280] mb-1">探索</span>
            <span className="text-gradient-subtle">智造教育</span>
            <span className="block text-[#6b7280] mt-1">未來可能</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#4B5563] mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            科技是解決問題的工具。從使用者蛻變為創造者，培養具備數位韌性的創新思維。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up delay-300">
            <Link href="/courses" className="btn-primary text-base px-8 py-4">
              探索課程
            </Link>
            <Link href="/about" className="btn-secondary text-base px-8 py-4">
              了解更多
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto animate-fade-in-up delay-400">
            <div className="text-center p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">200+</div>
              <div className="text-xs text-[#6b7280] tracking-wider">演講場次</div>
            </div>
            <div className="text-center p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">10+</div>
              <div className="text-xs text-[#6b7280] tracking-wider">年經驗</div>
            </div>
            <div className="text-center p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">1000+</div>
              <div className="text-xs text-[#6b7280] tracking-wider">學生人數</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <div className="w-8 h-12 rounded-full border-2 border-[#2D5A27]/30 flex items-start justify-center p-2 bg-white/50 backdrop-blur-sm">
            <div className="w-1.5 h-3 rounded-full bg-[#2D5A27] animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#F5F4F1]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2D5A27]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FF8F00]/5 blur-[80px]" />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
              為什麼選擇我們？
            </h2>
            <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
              結合理論與實作，讓學習成為一段充滿驚喜的旅程
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', title: '系統化課程', desc: '從基礎到進階，循序漸進的學習路徑' },
              { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: '實作導向', desc: '每堂課都有實際專案，學以致用' },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title: '社群支持', desc: '專屬 LINE 群組，隨時答疑解惑' },
            ].map((item, index) => (
              <div
                key={item.title}
                className="group relative p-8 rounded-2xl bg-white border border-[#E5E5E0] shadow-lg hover:shadow-xl hover:border-[#2D5A27]/20 transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D5A27] to-[#4a8f43] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">{item.title}</h3>
                <p className="text-[#6b7280]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#2D5A27]/10 blur-[120px]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
            準備好開始了嗎？
          </h2>
          <p className="text-lg text-[#6b7280] mb-10 max-w-xl mx-auto">
            讓我們一起探索科技的無限可能，成為未來的創新者
          </p>
          <Link href="/courses" className="btn-primary text-lg px-10 py-5 inline-block">
            立即開始學習
          </Link>
        </div>
      </section>
    </>
  );
}
