import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDir = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  content: string;
  contentHtml?: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80';

function calcReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} 分鐘`;
}

/**
 * 從 Markdown 內容中提取第一張圖片的 URL。
 * 支援標準 Markdown 語法 ![alt](url) 以及 HTML <img src="url"> 標籤。
 */
function extractFirstImage(content: string): string | null {
  // 標準 Markdown 圖片：![任意文字](https://...)
  const mdMatch = content.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/);
  if (mdMatch) return mdMatch[1];

  // HTML img 標籤：<img src="https://...">
  const htmlMatch = content.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
  if (htmlMatch) return htmlMatch[1];

  return null;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md') && f !== '.gitkeep');

  const posts: Post[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ''),
      title: String(data.title ?? '未命名'),
      date: data.date ? String(data.date).slice(0, 10) : '',
      category: String(data.category ?? '其他'),
      description: String(data.description ?? ''),
      content,
      readTime: data.readTime ? String(data.readTime) : calcReadTime(content),
      image: data.image
        ? String(data.image)
        : (extractFirstImage(content) ?? DEFAULT_IMAGE),
      featured: Boolean(data.featured),
    };
  });

  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filepath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);

  const contentHtml = await marked(content, { async: false }) as string;

  return {
    slug,
    title: String(data.title ?? '未命名'),
    date: data.date ? String(data.date).slice(0, 10) : '',
    category: String(data.category ?? '其他'),
    description: String(data.description ?? ''),
    content,
    contentHtml,
    readTime: data.readTime ? String(data.readTime) : calcReadTime(content),
    image: data.image
      ? String(data.image)
      : (extractFirstImage(content) ?? DEFAULT_IMAGE),
    featured: Boolean(data.featured),
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return ['全部', ...Array.from(cats)];
}
