import Image from 'next/image';

export const metadata = {
  title: '關於 | Ezai.today',
  description: '了解 Eddie Chen 的背景與教學理念',
};

const credentials = [
  { label: '經驗', value: '10+ 年', desc: 'AI / IoT / 機器人教學' },
  { label: '演講', value: '200+ 場', desc: '校內增能研習' },
  { label: '協會', value: '理事', desc: '國際跨域科學探究與教育協會' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2D5A27]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FF8F00]/5 blur-[80px]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2D5A27]/10 border border-[#2D5A27]/20 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse" />
            <span className="text-xs font-semibold text-[#2D5A27] tracking-[0.15em] uppercase">Founder</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-4 tracking-tight animate-fade-in-up delay-100">
            陳又鳴 <span className="text-[#6b7280] font-medium">Eddie Chen</span>
          </h1>
          <p className="text-lg text-[#6b7280] animate-fade-in-up delay-200">
            智造教育實驗室創辦人
          </p>
        </div>
      </section>

      {/* Profile */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="card-premium p-8 md:p-12">
            {/* Photo */}
            <div className="flex justify-center mb-10 animate-fade-in-up delay-200">
              <div className="relative">
                <div className="flex gap-6">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/eddie.png"
                      alt="Eddie Chen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/cute_man.png"
                      alt="卡通角色"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center animate-fade-in-up delay-300">
              <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">關於我</h2>
              <p className="text-[#6b7280] leading-relaxed mb-8 max-w-2xl mx-auto">
                熱愛科技教育，透過整合 AI 應用，物聯網與智慧機器人課程，
                激發學生探索未來的熱情，在實踐中養成具備數位韌性的創新思考者，
                讓下一代從技術使用者蛻變為技術創造者。
              </p>

              {/* Credentials */}
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                {credentials.map((cred, index) => (
                  <div key={cred.label} className="p-4 rounded-2xl bg-[#F5F4F1] hover:bg-[#2D5A27]/5 transition-colors duration-300">
                    <div className="text-2xl font-bold text-[#1a1a1a] mb-1">{cred.value}</div>
                    <div className="text-xs text-[#2D5A27] font-medium">{cred.label}</div>
                    <div className="text-xs text-[#9CA3AF]">{cred.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">
              專業領域
            </h2>
            <p className="text-[#6b7280] max-w-lg mx-auto">
              科技不應只是課本上的知識，而是實踐創意與解決問題的工具
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                title: '人工智慧',
                description: '從基礎到進階，掌握 AI 核心技術與應用場景，打造智慧解決方案。'
              },
              {
                icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
                title: '物聯網',
                description: '結合硬體與軟體，打造智慧互聯的 IoT 解決方案，連接未來世界。'
              },
              {
                icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
                title: '創意專題',
                description: '用科技實現想法，完成獨一無二的創意專題作品，發揮無限可能。'
              },
            ].map((topic, index) => (
              <div
                key={topic.title}
                className="group p-8 rounded-2xl bg-white border border-[#E5E5E0] shadow-lg hover:shadow-xl hover:border-[#2D5A27]/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2D5A27] to-[#4a8f43] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={topic.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3 group-hover:text-[#2D5A27] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-[#6b7280] leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
