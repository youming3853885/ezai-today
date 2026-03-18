import Link from 'next/link';
import Image from 'next/image';

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
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: '終身學習', description: '一次購買，永久存取' },
  { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', title: '實作導向', description: '每堂課都有實作專案' },
  { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', title: '線上答疑', description: '課程專屬 LINE 群組' },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2D5A27]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FF8F00]/5 blur-[80px]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2D5A27]/10 border border-[#2D5A27]/20 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse" />
            <span className="text-xs font-semibold text-[#2D5A27] tracking-[0.15em] uppercase">Courses</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-4 tracking-tight animate-fade-in-up delay-100">
            線上課程
          </h1>
          <p className="text-lg text-[#6b7280] animate-fade-in-up delay-200">
            系統化學習，成為科技創新者
          </p>
        </div>
      </section>

      {/* Course List */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {courses.map((course, index) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group block"
              >
                <article className="card-premium p-5 flex flex-col sm:flex-row gap-5 hover:border-[#2D5A27]/30">
                  {/* Image */}
                  <div className="relative w-full sm:w-40 h-32 rounded-xl overflow-hidden flex-shrink-0 img-hover-zoom">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h2 className="text-lg font-semibold text-[#1a1a1a] group-hover:text-[#2D5A27] transition-colors">
                        {course.title}
                      </h2>
                      <span className="text-[#FF8F00] font-semibold">即將上線</span>
                    </div>
                    <p className="text-[#6b7280] text-sm mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                      <span className="px-2 py-1 rounded-md bg-[#F5F4F1]">{course.level}</span>
                      <span>{course.duration}</span>
                      <span>{course.lessons} 堂課</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center p-6 rounded-2xl bg-white border border-[#E5E5E0] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#2D5A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-[#1a1a1a] font-semibold mb-1">{feature.title}</h3>
                <p className="text-[#9CA3AF] text-xs">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
