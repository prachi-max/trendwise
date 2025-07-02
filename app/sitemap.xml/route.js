

import Article from '@/models/Article';
import connectDB from '@/lib/connectDB';    // ✅ Also adjust path if needed

export async function GET() {
  await connectDB(); // ✅ Ensure DB is connected

  const articles = await Article.find({}, 'slug updatedAt'); // ✅ Safe to use now

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${articles
    .map((a) => {
      return `<url>
  <loc>https://trendwise.vercel.app/article/${a.slug}</loc>
  <lastmod>${a.updatedAt.toISOString()}</lastmod>
</url>`;
    })
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
