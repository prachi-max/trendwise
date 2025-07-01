import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import openai from '@/lib/openai';
import Article from '@/models/Article';

export async function POST(req) {
  const { topic } = await req.json(); // ✅ define `topic` before the try block

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  await connectDB();

  const prompt = `Write an SEO-optimized blog article about "${topic}". Include headings, meta description, and rich content.`;

  let content;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    content = res.choices[0].message.content;
  } catch (err) {
    console.warn("⚠️ OpenAI failed, using mock content.");
    content = `
# ${topic}

Mock article used due to API quota limits. Replace with real content when possible.
    `;
  }

  const slug = topic.toLowerCase().replace(/\s+/g, '-');

  const article = await Article.create({
    title: topic,
    slug,
    meta: topic,
    media: [],
    content,
  });

  return NextResponse.json(article);
}


export async function GET() {
  try {
    await connectDB();
    const articles = await Article.find().sort({ createdAt: -1 });
    return NextResponse.json(articles);
  } catch (err) {
    console.error('❌ GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

