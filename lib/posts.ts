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
  /** 第一張圖（可能是 data URI），僅用於文章頁 hero，不用於縮圖 */
  heroImage?: string;
  readTime: string;
  /** 外部 https:// 圖片 URL，用於列表縮圖 / og:image */
  image: string;
  featured?: boolean;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80';

function calcReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} 分鐘`;
}

/**
 * 從 Markdown 原始內容中找第一個 https:// 圖片 URL（用於列表縮圖）。
 */
function extractFirstHttpsImage(content: string): string | null {
  const mdMatch = content.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/);
  if (mdMatch) return mdMatch[1];
  const htmlMatch = content.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
  if (htmlMatch) return htmlMatch[1];
  return null;
}

/**
 * 從已渲染的 HTML 中找第一個 <img> src（包含 data URI），
 * 用於文章頁 hero 大圖。
 */
function extractFirstImageFromHtml(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
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
      // 縮圖優先：內文 https 圖 → front matter → 預設藍色圖
      image: extractFirstHttpsImage(content) ?? (data.image ? String(data.image) : DEFAULT_IMAGE),
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

  // Hero 圖：內文第一張圖（包含 data URI）→ front matter → 縮圖同款
  const heroImage = extractFirstImageFromHtml(contentHtml) ?? undefined;
  const thumbImage = extractFirstHttpsImage(content) ?? (data.image ? String(data.image) : DEFAULT_IMAGE);

  return {
    slug,
    title: String(data.title ?? '未命名'),
    date: data.date ? String(data.date).slice(0, 10) : '',
    category: String(data.category ?? '其他'),
    description: String(data.description ?? ''),
    content,
    contentHtml,
    heroImage,
    readTime: data.readTime ? String(data.readTime) : calcReadTime(content),
    image: thumbImage,
    featured: Boolean(data.featured),
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return ['全部', ...Array.from(cats)];
}
