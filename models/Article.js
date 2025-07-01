// models/Article.js
import mongoose from "mongoose";

// Define the schema (structure) of your article
const ArticleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  meta: String,
  content: String,
  media: [String],  // Array of image/video URLs
}, { timestamps: true });

// Export the model (or reuse if already exists)
export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);
