export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-2">聯絡我</h1>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-sm mx-auto">
          <div className="card-premium p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#2D5A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-[#1a1a1a] mb-1">保持聯繫</h2>
            <p className="text-xs text-[#6b7280] mb-6">有任何問題或合作機會，歡迎聯繫</p>
            <a href="mailto:admin@ezai.today" className="btn-primary text-sm">
              寄送郵件
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
