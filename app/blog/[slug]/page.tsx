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

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#9CA3AF] mb-10 pb-6 border-b border-[#E5E5E0]">
          <span>陳又鳴 Eddie Chen</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} 閱讀</span>
        </div>

        {/* Content */}
        <article
          className="prose prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-[#1a1a1a]
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#374151] prose-p:leading-8 prose-p:my-4
            prose-a:text-[#2D5A27] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#1a1a1a]
            prose-ul:my-4 prose-li:text-[#374151] prose-li:leading-8
            prose-ol:my-4
            prose-blockquote:border-l-4 prose-blockquote:border-[#2D5A27]
            prose-blockquote:pl-4 prose-blockquote:text-[#6b7280] prose-blockquote:italic
            prose-code:bg-[#F3F4F6] prose-code:px-1.5 prose-code:py-0.5
            prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:bg-[#1e1e1e] prose-pre:text-white prose-pre:rounded-xl
            prose-hr:border-[#E5E5E0]
          "
          dangerouslySetInnerHTML={{ __html: post.contentHtml ?? '' }}
        />

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#E5E5E0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[#2D5A27] text-sm font-medium hover:underline"
          >
            ← 回到所有文章
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-[#6b7280] hover:text-[#2D5A27] transition-colors"
          >
            有問題或想交流？歡迎聯繫我 →
          </Link>
        </div>
      </div>
    </main>
  );
}
