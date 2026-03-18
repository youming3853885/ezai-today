import Image from 'next/image';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
        <Image
          src="/background.png"
          alt="作品集"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">作品集</h1>
          <p className="text-lg opacity-90 animate-fade-in-up delay-100">探索我的專案與創作</p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="card-premium p-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#F5F4F1] flex items-center justify-center">
              <svg className="w-10 h-10 text-[#2D5A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">敬請期待</h2>
            <p className="text-[#6b7280] mb-6">
              作品集即將上線，包含各種 AI 應用與專案作品
            </p>
            <div className="flex justify-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-sm">AI 專案</span>
              <span className="px-3 py-1 rounded-full bg-[#FF8F00]/10 text-[#FF8F00] text-sm">IoT 應用</span>
              <span className="px-3 py-1 rounded-full bg-[#A5D6A7] text-[#2D5A27] text-sm">機器人</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
