/**
 * ========================================
 * Saul Bass 設計風格套用
 * 靈感來源：影視片頭 / 動態敘事
 *
 * 轉譯要點：
 * - 幾何圓點作為視覺錨點
 * - 水平線條分割內容區塊
 * - 圓形頭像幾何邊框
 * - 卡片動態效果
 * ========================================
 */

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

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
      {/* Header - Bass 風格：水平線裝飾 */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* 水平線裝飾 */}
          <div className="w-16 h-px bg-[#2D5A27] mx-auto mb-8" />

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 tracking-tight">
            陳又鳴 <span className="text-[#6b7280] font-normal">Eddie Chen</span>
          </h1>
          <p className="text-xs text-[#6b7280] uppercase tracking-widest">智造教育實驗室創辦人</p>
        </div>
      </section>

      {/* Profile Card - Bass 風格：幾何裝飾 */}
      <section className="px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 sm:p-8">
              {/* 頭像區域 - Bass 風格 */}
              <div className="flex justify-center mb-8">
                <div className="flex gap-4">
                  {/* 頭像 1 - 幾何邊框 */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#2D5A27]/20 rounded-full transform translate-y-1 group-hover:translate-y-2 transition-transform duration-300" />
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#1a1a1a]">
                      <Image
                        src="/eddie.png"
                        alt="Eddie Chen"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* 頭像 2 */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#2D5A27]/20 rounded-full transform translate-y-1 group-hover:translate-y-2 transition-transform duration-300" />
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#1a1a1a]">
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

              {/* 簡介文字 */}
              <div className="text-center mb-8">
                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  熱愛科技教育，透過整合 AI 應用，物聯網與智慧機器人課程，
                  激發學生探索未來的熱情，在實踐中養成具備數位韌性的創新思考者。
                </p>

                {/* 經歷數據 - Bass 風格：網格分隔 */}
                <div className="grid grid-cols-3 gap-px bg-[#1a1a1a]/10 rounded-lg overflow-hidden">
                  {credentials.map((cred) => (
                    <div key={cred.label} className="bg-[#F5F4F1] p-4 text-center hover:bg-[#2D5A27]/5 transition-colors duration-300">
                      <div className="text-lg font-bold text-[#1a1a1a]">{cred.value}</div>
                      <div className="text-[10px] text-[#2D5A27] uppercase tracking-wider mt-1">{cred.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 專業領域 - Bass 風格 */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* 標題 - 水平線裝飾 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#2D5A27]" />
            <h2 className="text-base font-bold text-[#1a1a1a]">專業領域</h2>
          </div>

          {/* 三欄網格 */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: '人工智慧', description: '從基礎到進階，掌握 AI 核心技術與應用場景。' },
              { title: '物聯網', description: '結合硬體與軟體，打造智慧互聯的 IoT 解決方案。' },
              { title: '創意專題', description: '用科技實現想法，完成獨一無二的創意專題作品。' },
            ].map((topic) => (
              <Card key={topic.title} className="border-none shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  {/* Bass 風格：圓點裝飾 */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A27]" />
                    <h3 className="text-sm font-semibold text-[#1a1a1a]">{topic.title}</h3>
                  </div>
                  <p className="text-xs text-[#6b7280] leading-relaxed">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
