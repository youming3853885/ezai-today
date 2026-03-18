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
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-2">
            陳又鳴 <span className="text-[#6b7280] font-normal">Eddie Chen</span>
          </h1>
          <p className="text-sm text-[#6b7280]">智造教育實驗室創辦人</p>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-center mb-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#E5E5E0]">
                    <Image src="/eddie.png" alt="Eddie Chen" fill className="object-cover" />
                  </div>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#E5E5E0]">
                    <Image src="/cute_man.png" alt="卡通角色" fill className="object-cover" />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                  熱愛科技教育，透過整合 AI 應用，物聯網與智慧機器人課程，
                  激發學生探索未來的熱情，在實踐中養成具備數位韌性的創新思考者。
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {credentials.map((cred) => (
                    <div key={cred.label} className="p-3 rounded-lg bg-[#F5F4F1]">
                      <div className="text-lg font-bold text-[#1a1a1a]">{cred.value}</div>
                      <div className="text-[10px] text-[#2D5A27]">{cred.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-center text-[#1a1a1a] mb-6">專業領域</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: '人工智慧', description: '從基礎到進階，掌握 AI 核心技術與應用場景。' },
              { title: '物聯網', description: '結合硬體與軟體，打造智慧互聯的 IoT 解決方案。' },
              { title: '創意專題', description: '用科技實現想法，完成獨一無二的創意專題作品。' },
            ].map((topic) => (
              <Card key={topic.title}>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2">{topic.title}</h3>
                  <p className="text-xs text-[#6b7280]">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
