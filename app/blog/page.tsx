'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    slug: 'ai-basics-2024',
    title: 'AI 基礎入門：什麼是人工智慧？',
    excerpt: '從基礎概念出發，帶你了解人工智慧的發展歷程與核心技術。',
    category: '人工智慧',
    date: '2024-01-15',
    readTime: '5 分鐘',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    featured: true,
  },
  {
    slug: 'iot-home-automation',
    title: '物聯網實作：智慧家居系統',
    excerpt: '使用 ESP32 打造簡易的智慧家居控制系統。',
    category: '物聯網',
    date: '2024-01-10',
    readTime: '8 分鐘',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
  },
  {
    slug: 'python-for-beginners',
    title: 'Python 程式設計入門',
    excerpt: '最適合初學者的程式語言，讓你快速上手編寫程式。',
    category: '程式設計',
    date: '2024-01-05',
    readTime: '6 分鐘',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
  },
  {
    slug: 'arduino-robot-car',
    title: '自走車機器人製作教學',
    excerpt: '從零開始組裝並程式控制你的第一台機器人。',
    category: '機器人',
    date: '2023-12-28',
    readTime: '10 分鐘',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80',
  },
  {
    slug: 'machine-learning-intro',
    title: '機器學習入門：監督式學習',
    excerpt: '了解機器學習的基本概念與常見演算法。',
    category: '人工智慧',
    date: '2023-12-20',
    readTime: '7 分鐘',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  },
  {
    slug: 'stem-education',
    title: 'STEM 教育的重要性',
    excerpt: '為什麼現在的孩子需要學習 STEM？',
    category: '教育觀點',
    date: '2023-12-15',
    readTime: '4 分鐘',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  },
  {
    slug: 'claude-code-intro',
    title: 'Claude Code 實戰：用 AI 加速開發工作流',
    excerpt: '深入介紹 Anthropic 的 Claude Code 如何改變開發者日常工作流，從程式撰寫、除錯到架構設計，AI 助手能做到哪些事？',
    category: 'Claude Code',
    date: '2025-03-10',
    readTime: '6 分鐘',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    featured: false,
  },
  {
    slug: 'claude-code-prompting',
    title: 'Claude Code Prompt 技巧：讓 AI 寫出更好的程式碼',
    excerpt: '分享我在使用 Claude Code 開發課程平台時累積的 prompt 撰寫心法，幫助你獲得更精準、可維護的程式碼輸出。',
    category: 'Claude Code',
    date: '2025-02-20',
    readTime: '8 分鐘',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
  },
];

const categories = ['全部', '人工智慧', '物聯網', '程式設計', '機器人', '教育觀點', 'Claude Code'];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '全部' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter(p => p !== featuredPost);

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]">部落格</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Content - Posts */}
            <div className="flex-1">
              {/* Search Results */}
              {(searchQuery || selectedCategory !== '全部') && (
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-[#6b7280]">
                    找到 <span className="font-semibold text-[#2D5A27]">{filteredPosts.length}</span> 篇文章
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('全部'); }}
                    className="text-sm text-[#2D5A27] hover:underline"
                  >
                    清除篩選
                  </button>
                </div>
              )}

              {/* Featured Post */}
              {featuredPost && !searchQuery && selectedCategory === '全部' && (
                <Link href={`/blog/${featuredPost.slug}`} className="block group mb-10">
                  <article className="card-premium overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-medium mb-3">
                        {featuredPost.category}
                      </span>
                      <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 group-hover:text-[#2D5A27] transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-[#6b7280] mb-4 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                        <span>{featuredPost.date}</span>
                        <span>·</span>
                        <span>{featuredPost.readTime} 閱讀</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Other Posts Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {(searchQuery || selectedCategory !== '全部' ? filteredPosts : otherPosts).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <article className="card-premium overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-video">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-medium mb-2 w-fit">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2 group-hover:text-[#2D5A27] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[#6b7280] text-sm line-clamp-2 mb-3 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* No Results */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-16 card">
                  <p className="text-[#6b7280] mb-4">沒有找到符合的文章</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('全部'); }}
                    className="text-[#2D5A27] hover:underline"
                  >
                    回到全部文章
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Search Box */}
                <div className="card-premium p-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm">搜尋</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="搜尋文章..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 pr-10 rounded-xl bg-[#F5F4F1] border border-[#E5E5E0] text-[#1a1a1a] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2D5A27] transition-colors"
                    />
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Categories */}
                <div className="card-premium p-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm">分類</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => {
                      const count = cat === '全部'
                        ? blogPosts.length
                        : blogPosts.filter(p => p.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                            selectedCategory === cat
                              ? 'bg-[#2D5A27]/10 text-[#2D5A27]'
                              : 'text-[#6b7280] hover:bg-[#2D5A27]/5 hover:text-[#2D5A27]'
                          }`}
                        >
                          <span>{cat}</span>
                          <span className={`text-xs ${selectedCategory === cat ? 'text-[#2D5A27]' : 'text-[#9CA3AF]'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="card-premium p-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm">最新文章</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 4).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-[#1a1a1a] group-hover:text-[#2D5A27] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-[#9CA3AF] mt-1">{post.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
