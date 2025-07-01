// app/sitemap.xml/route.js

import { NextResponse } from 'next/server';
import Article from '@/models/Article';
import connectDB from '@/lib/mongodb';

export async function GET() {
  await connectDB();

  const articles = await Article.find();

  const urls = articles.map((article) => {
    return `
      <url>
        <loc>https://your-domain.com/article/${article.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('')}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
