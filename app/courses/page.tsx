import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: '課程 | Ezai.today',
  description: 'AI、IoT、機器人程式設計線上課程',
};

const courses = [
  {
    id: 'ai-python-fundamentals',
    title: 'AI Python 程式設計入門',
    description: '從零開始學習 Python 程式語言，為 AI 學習打下堅實基礎。',
    level: '初學者',
    duration: '12 小時',
    lessons: 24,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80',
  },
  {
    id: 'iot-esp32',
    title: '物聯網 IoT 實作課程',
    description: '使用 ESP32 開發板，打造專屬的智慧 IoT 系統。',
    level: '中階',
    duration: '16 小時',
    lessons: 32,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
  },
  {
    id: 'ai-machine-learning',
    title: '機器學習 ML 實戰',
    description: '理論與實作並重，打造你的第一個 ML 模型。',
    level: '進階',
    duration: '20 小時',
    lessons: 40,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80',
  },
  {
    id: 'robotics-arduino',
    title: '機器人設計與實作',
    description: '從機構設計到程式控制，完整掌握機器人技術。',
    level: '中階',
    duration: '18 小時',
    lessons: 36,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80',
  },
];

const features = [
  { title: '終身學習', description: '一次購買，永久存取' },
  { title: '實作導向', description: '每堂課都有實作專案' },
  { title: '線上答疑', description: '課程專屬 LINE 群組' },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-2">線上課程</h1>
          <p className="text-sm text-[#6b7280]">系統化學習，成為科技創新者</p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-3">
            {courses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="block group">
                <Card className="p-4 flex gap-4 hover:border-[#2D5A27]/30 transition-colors">
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-[#1a1a1a] truncate">{course.title}</h3>
                      <Badge variant="secondary" className="text-[#FF8F00] bg-[#FF8F00]/10">即將上線</Badge>
                    </div>
                    <p className="text-xs text-[#6b7280] line-clamp-1 mb-2">{course.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-[#9CA3AF]">
                      <Badge variant="outline">{course.level}</Badge>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-2">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-4 text-center">
                  <h3 className="text-xs font-semibold text-[#1a1a1a] mb-0.5">{feature.title}</h3>
                  <p className="text-[10px] text-[#9CA3AF]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
