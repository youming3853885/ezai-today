import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import sharp from 'sharp';

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

/** 從原始 Markdown 找第一個 data URI 圖（不限大小，後續會用 sharp 壓縮）。 */
function extractFirstDataUri(content: string): string | null {
  const mdMatch = content.match(/!\[[^\]]*\]\((data:image\/[^\s)]+)\)/);
  if (mdMatch) return mdMatch[1];
  return null;
}

/**
 * 將 data URI 縮圖：resize 到 800×450 JPEG q=70，
 * 讓大截圖（可能 1MB+）壓成 ~60-100KB，
 * 避免 blog 列表頁面膨脹。
 * 若失敗則回傳原始 data URI。
 */
async function resizeDataUriToThumb(dataUri: string): Promise<string> {
  try {
    const comma = dataUri.indexOf(',');
    if (comma === -1) return dataUri;
    const b64 = dataUri.slice(comma + 1);
    const buffer = Buffer.from(b64, 'base64');
    const thumb = await sharp(buffer)
      .resize(800, 450, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 70 })
      .toBuffer();
    return `data:image/jpeg;base64,${thumb.toString('base64')}`;
  } catch {
    return dataUri;
  }
}

/**
 * 取得列表縮圖 src（async）。
 * 優先：內文 https 圖 → 內文 data URI（壓縮後）→ DEFAULT_IMAGE
 */
async function getThumbSrc(content: string): Promise<string> {
  const https = extractFirstHttpsImage(content);
  if (https) return https;

  const dataUri = extractFirstDataUri(content);
  if (dataUri) return resizeDataUriToThumb(dataUri);

  return DEFAULT_IMAGE;
}

/** 從已渲染 HTML 找第一個 <img> src（含 data URI），供 hero 大圖使用。 */
function extractFirstImageFromHtml(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md') && f !== '.gitkeep');

  const posts = await Promise.all(
    files.map(async (file) => {
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
        // 縮圖：build 時壓縮（https 直接用，data URI 用 sharp 縮小）
        thumbSrc: await getThumbSrc(content),
        featured: Boolean(data.featured),
      } satisfies Post;
    })
  );

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
    thumbSrc: await getThumbSrc(content),
    featured: Boolean(data.featured),
  };
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return ['全部', ...Array.from(cats)];
}
