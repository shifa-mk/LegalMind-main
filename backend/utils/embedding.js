import { pipeline } from "@xenova/transformers";

// Initialize the embedding model globally for reuse
// This model outputs a 768-dimensional vector
let embedder = null;

// The size of the vector produced by the model
export const EMBEDDING_DIMENSIONS = 384;

// Function to ensure the model is loaded (call this once on server startup)
export const loadEmbedder = async () => {
  if (!embedder) {
    console.log("Loading embedding model...");
    // Use the same model as your ingestion script
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("Embedding model loaded.");
  }
  return embedder;
};

// Generate a high-quality 768-dimensional vector for text
export const embedQuery = async (text) => {
  const model = await loadEmbedder();
  
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return Array(EMBEDDING_DIMENSIONS).fill(0); // Return a zero vector for empty query
  }

  try {
    const output = await model(text, { pooling: "mean", normalize: true });
    // The output data is a Float32Array; convert it to a standard JavaScript Array
    return Array.from(output.data); 
  } catch (error) {
    console.error("Error generating query embedding:", error);
    return Array(EMBEDDING_DIMENSIONS).fill(0); // Fallback to zero vector on error
  }
};

// Cosine similarity (kept for utility, but usually handled by the DB for search)
export const cosineSimilarity = (a, b) => {
    // Ensure both are arrays and have the same dimensions for a valid comparison
    if (!a || !b || a.length !== b.length) return 0;

    const dot = a.reduce((sum, v, i) => sum + v * (b[i] || 0), 0);
    const normA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
    const normB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));

    // Since the model already normalizes the vectors to unit length (norm=1),
    // the dot product IS the cosine similarity. We include the full formula
    // for robustness against non-normalized inputs.
    return normA && normB ? dot / (normA * normB) : dot; // dot is already the similarity if norms are 1
};

// You can remove the old 16-D embedText function entirely.