import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/background.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/85 to-[#FAF9F6]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#E5E5E0] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A27]" />
            <span className="text-xs font-medium text-[#2D5A27] uppercase">AI · IoT · Robotics</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-5">
            <span className="block text-[#6b7280] mb-1">探索</span>
            <span className="text-gradient-subtle">智造教育</span>
            <span className="block text-[#6b7280] mt-1">未來可能</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#4B5563] mb-10 max-w-lg mx-auto">
            科技是解決問題的工具。從使用者蛻變為創造者，培養具備數位韌性的創新思維。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Button>
              <Link href="/courses">探索課程</Link>
            </Button>
            <Button variant="outline">
              <Link href="/about">了解更多</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-[#1a1a1a]">200+</div>
                <div className="text-[10px] text-[#6b7280]">演講場次</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-[#1a1a1a]">10+</div>
                <div className="text-[10px] text-[#6b7280]">年經驗</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-[#1a1a1a]">1000+</div>
                <div className="text-[10px] text-[#6b7280]">學生人數</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-[#F5F4F1]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center text-[#1a1a1a] mb-8">
            為什麼選擇我們？
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '系統化課程', desc: '從基礎到進階，循序漸進' },
              { title: '實作導向', desc: '每堂課都有實際專案' },
              { title: '社群支持', desc: '專屬 LINE 群組答疑' },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6 text-center">
                  <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-[#2D5A27]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#2D5A27]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#6b7280]">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-3">
            準備好開始了嗎？
          </h2>
          <p className="text-sm text-[#6b7280] mb-6">
            讓我們一起探索科技的無限可能
          </p>
          <Button>
            <Link href="/courses">立即開始</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
