import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: '文章不存在' };
  return {
    title: `${post.title} | Eddie Chen`,
    description: post.description,
    openGraph: { images: [post.image] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // heroImage 優先（可能是 data URI 或 https），fallback 到縮圖 URL
  const heroSrc = post.heroImage ?? post.image;
  const isDataUri = heroSrc.startsWith('data:');

  return (
    <main className="min-h-screen" style={{ background: '#FAF9F6', color: '#1a1a1a' }}>
      {/* Hero image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
        {isDataUri ? (
          /* base64 data URI：用一般 <img>，Next.js Image 不接受 */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroSrc}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image src={heroSrc} alt={post.title} fill className="object-cover" priority />
        )}

        {/* 頂部漸層：讓固定導覽列文字保持可讀 */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: '35%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
        />
        {/* 底部漸層：讓標題文字清晰 */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '65%', background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm mb-10 pb-6 border-b" style={{ color: '#6b7280', borderColor: '#E5E5E0' }}>
          <span>陳又鳴 Eddie Chen</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} 閱讀</span>
        </div>

        {/* Content */}
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml ?? '' }}
        />

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: '#E5E5E0' }}>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-medium hover:underline"
            style={{ color: '#2D5A27' }}
          >
            ← 回到所有文章
          </Link>
          <Link
            href="/#contact"
            className="text-sm transition-colors blog-footer-link"
          >
            有問題或想交流？歡迎聯繫我 →
          </Link>
        </div>
      </div>
    </main>
  );
}
