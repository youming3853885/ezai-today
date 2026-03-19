'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';

/** 縮圖元件：https 用 Next.js Image（優化），data URI 用原生 img（Next.js 不支援）。 */
function ThumbImg({
  src,
  alt,
  className = 'object-cover',
  extraClass = '',
}: {
  src: string;
  alt: string;
  className?: string;
  extraClass?: string;
}) {
  if (src.startsWith('data:')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full ${className} ${extraClass}`}
        style={{ objectFit: 'cover' }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`${className} ${extraClass}`}
    />
  );
}

interface Props {
  posts: Post[];
  categories: string[];
}

export default function BlogList({ posts, categories }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === '全部' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const isFiltered = searchQuery || selectedCategory !== '全部';
  const featuredPost = !isFiltered
    ? (posts.find((p) => p.featured) ?? posts[0])
    : undefined;
  const listPosts = !isFiltered
    ? filteredPosts.filter((p) => p !== featuredPost)
    : filteredPosts;

  return (
    <section className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left - Posts */}
          <div className="flex-1">
            {isFiltered && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[#6b7280]">
                  找到{' '}
                  <span className="font-semibold text-[#2D5A27]">
                    {filteredPosts.length}
                  </span>{' '}
                  篇文章
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('全部');
                  }}
                  className="text-sm text-[#2D5A27] hover:underline"
                >
                  清除篩選
                </button>
              </div>
            )}

            {/* Featured Post */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="block group mb-10"
              >
                <article className="card-premium overflow-hidden">
                  <div className="relative aspect-video">
                    <ThumbImg
                      src={featuredPost.thumbSrc}
                      alt={featuredPost.title}
                      extraClass="group-hover:scale-105 transition-transform duration-500"
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
                      {featuredPost.description}
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

            {/* Posts Grid */}
            {listPosts.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {listPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <article className="card-premium overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-video">
                        <ThumbImg
                          src={post.thumbSrc}
                          alt={post.title}
                          extraClass="group-hover:scale-105 transition-transform duration-500"
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
                          {post.description}
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
            )}

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 card">
                <p className="text-[#6b7280] mb-4">沒有找到符合的文章</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('全部');
                  }}
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
              {/* Search */}
              <div className="card-premium p-6">
                <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm">
                  搜尋
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜尋文章..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-[#F5F4F1] border border-[#E5E5E0] text-[#1a1a1a] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2D5A27] transition-colors"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div className="card-premium p-6">
                <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm">
                  分類
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const count =
                      cat === '全部'
                        ? posts.length
                        : posts.filter((p) => p.category === cat).length;
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
                        <span
                          className={`text-xs ${selectedCategory === cat ? 'text-[#2D5A27]' : 'text-[#9CA3AF]'}`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="card-premium p-6">
                <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm">
                  最新文章
                </h3>
                <div className="space-y-4">
                  {posts.slice(0, 4).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <ThumbImg src={post.thumbSrc} alt={post.title} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-[#1a1a1a] group-hover:text-[#2D5A27] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-[#9CA3AF] mt-1">
                          {post.date}
                        </p>
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
  );
}
