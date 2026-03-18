export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-[#2D5A27]/5 blur-[80px]" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-[#FF8F00]/5 blur-[60px]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-4 tracking-tight animate-fade-in-up">
            聯絡我
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-6 pb-24">
        <div className="max-w-md mx-auto">
          <div className="card-premium p-10 text-center">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#2D5A27] to-[#4a8f43] flex items-center justify-center shadow-lg shadow-[#2D5A27]/20 animate-float">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-2 animate-fade-in-up delay-100">保持聯繫</h2>
            <p className="text-[#6b7280] mb-8 animate-fade-in-up delay-200">
              有任何問題或合作機會，歡迎聯繫
            </p>

            <a
              href="mailto:admin@ezai.today"
              className="inline-flex items-center gap-3 btn-primary text-base animate-fade-in-up delay-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              寄送郵件
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
