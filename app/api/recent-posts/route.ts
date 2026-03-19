import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '5', 10);
  const posts = (await getAllPosts()).slice(0, limit).map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    category: p.category,
    description: p.description,
    readTime: p.readTime,
    image: p.image,
  }));
  return NextResponse.json(posts);
}
