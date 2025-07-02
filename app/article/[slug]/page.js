// app/article/[slug]/page.js

import mongoose from 'mongoose';
import Article from '@/models/Article';
import connectDB from '@/lib/connectDB';

export default async function ArticlePage({ params }) {
    const { slug } = params;

  try {
    await connectDB();

    const article = await Article.findOne({ slug });

    if (!article) {
      return <div className="p-4 text-red-500">❌ Article not found</div>;
    }

    return (
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 mb-2">📝 Meta: {article.meta}</p>
        <article className="prose prose-lg" dangerouslySetInnerHTML={{ __html: article.content }} />
      </main>
    );
  } catch (err) {
    console.error('❌ ArticlePage error:', err);
    return <div className="p-4 text-red-500">⚠️ Failed to load article</div>;
  }
}
