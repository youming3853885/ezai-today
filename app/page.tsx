/**
 * ========================================
 * Saul Bass 設計風格套用
 * 靈感來源：影視片頭 / 動態敘事
 *
 * 轉譯要點：
 * - 幾何圓點作為視覺錨點
 * - 水平線條分割內容區塊
 * - 強烈對比與動態感
 * - 簡潔有力的排版
 * ========================================
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      {/* Hero Section - Bass 風格：幾何線條 + 動態遮罩 */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/background.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* 層次漸變遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/95 via-[#FAF9F6]/80 to-[#FAF9F6]" />
          {/* Bass 風格：水平裝飾線 */}
          <div className="absolute top-[45%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2D5A27]/30 to-transparent" />
          <div className="absolute top-[55%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a1a]/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-28">
          {/* Badge - Bass 風格：幾何徽章 */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 border border-[#E5E5E0] shadow-sm mb-10">
            <span className="w-2 h-2 rounded-full bg-[#2D5A27]" />
            <span className="text-xs font-medium text-[#1a1a1a] tracking-widest uppercase">AI · IoT · Robotics</span>
          </div>

          {/* Main Title - 加大加粗 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            <span className="block text-[#6b7280] font-normal text-2xl sm:text-3xl mb-3">探索</span>
            <span className="bg-gradient-to-r from-[#1a1a1a] to-[#2D5A27] bg-clip-text text-transparent">
              智造教育
            </span>
            <span className="block text-[#6b7280] font-normal text-2xl sm:text-3xl mt-3">未來可能</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#4B5563] mb-12 max-w-lg mx-auto leading-relaxed">
            科技是解決問題的工具。從使用者蛻變為創造者，培養具備數位韌性的創新思維。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="text-sm px-8 py-6 h-auto font-medium tracking-wide">
              <Link href="/courses">探索課程</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-sm px-8 py-6 h-auto font-medium tracking-wide border-[#1a1a1a]/20">
              <Link href="/about">了解更多</Link>
            </Button>
          </div>

          {/* Stats - Bass 風格：網格分隔線 */}
          <div className="grid grid-cols-3 gap-px bg-[#1a1a1a]/10 rounded-lg overflow-hidden max-w-md mx-auto">
            <div className="bg-white p-5 text-center hover:bg-[#FAF9F6] transition-colors duration-200">
              <div className="text-2xl font-bold text-[#1a1a1a]">200+</div>
              <div className="text-[10px] text-[#6b7280] mt-1 uppercase tracking-wider">演講場次</div>
            </div>
            <div className="bg-white p-5 text-center hover:bg-[#FAF9F6] transition-colors duration-200">
              <div className="text-2xl font-bold text-[#1a1a1a]">10+</div>
              <div className="text-[10px] text-[#6b7280] mt-1 uppercase tracking-wider">年經驗</div>
            </div>
            <div className="bg-white p-5 text-center hover:bg-[#FAF9F6] transition-colors duration-200">
              <div className="text-2xl font-bold text-[#1a1a1a]">1000+</div>
              <div className="text-[10px] text-[#6b7280] mt-1 uppercase tracking-wider">學生人數</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bass 風格：深色背景 + 幾何裝飾 */}
      <section className="py-20 px-6 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          {/* 標題 - 水平線裝飾 */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-[#2D5A27]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              為什麼選擇我們？
            </h2>
          </div>

          {/* 三欄網格 - Bass 風格卡片 */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '系統化課程', desc: '從基礎到進階循序漸進，建立完整知識架構' },
              { title: '實作導向', desc: '每堂課都有實際專案，理論與實踐並重' },
              { title: '社群支持', desc: '專屬 LINE 群組，即時答疑互動' },
            ].map((item) => (
              <Card key={item.title} className="bg-[#FAF9F6] border-none hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  {/* Bass 風格：圓點裝飾 */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A27]" />
                    <h3 className="text-sm font-semibold text-[#1a1a1a]">{item.title}</h3>
                  </div>
                  <p className="text-xs text-[#6b7280] leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bass 風格：簡潔有力 */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-2xl mx-auto text-center">
          {/* 水平線裝飾 */}
          <div className="w-16 h-px bg-[#1a1a1a]/20 mx-auto mb-8" />

          <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-4 tracking-tight">
            準備好開始了嗎？
          </h2>
          <p className="text-sm text-[#6b7280] mb-10">
            讓我們一起探索科技的無限可能
          </p>
          <Button size="lg" className="text-sm px-10 py-6 h-auto font-medium tracking-wide">
            <Link href="/courses">立即開始</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
