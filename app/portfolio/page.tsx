import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="relative h-[30vh] min-h-[200px] flex items-center justify-center">
        <Image src="/background.png" alt="作品集" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl sm:text-3xl font-bold">作品集</h1>
          <p className="text-xs opacity-80 mt-1">探索我的專案與創作</p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#F5F4F1] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#2D5A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-[#1a1a1a] mb-2">敬請期待</h2>
              <p className="text-xs text-[#6b7280] mb-4">作品集即將上線</p>
              <div className="flex justify-center gap-2">
                <Badge>AI 專案</Badge>
                <Badge variant="secondary">IoT 應用</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
