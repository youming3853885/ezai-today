import { getAllPosts, getAllCategories } from '@/lib/posts';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: '部落格 | Eddie Chen',
  description: '陳又鳴 Eddie Chen 的 AI 教育、物聯網、機器學習與教育思考文章',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]">部落格</h1>
          <p className="mt-2 text-[#6b7280]">共 {posts.length} 篇文章</p>
        </div>
      </section>

      <BlogList posts={posts} categories={categories} />
    </main>
  );
}
