export async function GET() {
  const articles = await Article.find(); // or fetch from API
  const urls = articles.map(a => `<url><loc>https://yourdomain.com/article/${a.slug}</loc></url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
