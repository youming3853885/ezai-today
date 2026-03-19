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
  /** 第一張圖（可能是 data URI），僅用於文章頁 hero */
  heroImage?: string;
  readTime: string;
  /** https:// 圖片 URL，供 og:image / 外部分享使用 */
  image: string;
  /** 列表縮圖：內文第一張圖（https 或 data URI），無圖才用藍色預設 */
  thumbSrc: string;
  featured?: boolean;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80';

function calcReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} 分鐘`;
}

/** 從原始 Markdown 找第一個 https:// 圖（og:image 用）。 */
function extractFirstHttpsImage(content: string): string | null {
  const mdMatch = content.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/);
  if (mdMatch) return mdMatch[1];
  const htmlMatch = content.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
  if (htmlMatch) return htmlMatch[1];
  return null;
}

/**
 * 從原始 Markdown 找第一個圖（https 優先，其次 data URI）。
 * data URI 限 ≤ 300,000 字元（≈225 KB）以避免頁面過大。
 * 供列表縮圖（thumbSrc）使用。
 */
function extractFirstImageForThumb(content: string): string | null {
  const https = extractFirstHttpsImage(content);
  if (https) return https;

  // data URI — 限大小，防止截圖導致頁面膨脹
  const dataMatch = content.match(/!\[[^\]]*\]\((data:image\/[^\s)]+)\)/);
  if (dataMatch && dataMatch[1].length <= 300000) return dataMatch[1];

  return null;
}

/** 從已渲染 HTML 找第一個 <img> src（含 data URI），供 hero 大圖使用。 */
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
      // og:image：https 優先 → front matter → 預設
      image: extractFirstHttpsImage(content) ?? (data.image ? String(data.image) : DEFAULT_IMAGE),
      // 縮圖：內文第一張圖（https 或 data URI）→ 無圖才用藍色預設
      thumbSrc: extractFirstImageForThumb(content) ?? DEFAULT_IMAGE,
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
    thumbSrc: extractFirstImageForThumb(content) ?? DEFAULT_IMAGE,
    featured: Boolean(data.featured),
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return ['全部', ...Array.from(cats)];
}
