import Section from "../models/section.js";

// Get all sections
export const getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get section by ID
export const getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new section
export const createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    const savedSection = await section.save();
    res.status(201).json(savedSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update section
export const updateSection = async (req, res) => {
  try {
    const updatedSection = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSection) return res.status(404).json({ message: "Section not found" });
    res.json(updatedSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete section
export const deleteSection = async (req, res) => {
  try {
    const deletedSection = await Section.findByIdAndDelete(req.params.id);
    if (!deletedSection) return res.status(404).json({ message: "Section not found" });
    res.json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// controllers/sectionControllers.js



// Keyword categories for better relevance
const keywordMap = {
  murder: ["murder", "kill", "homicide"],
  rape: ["rape", "sexual assault", "molest", "outrage modesty"],
  theft: ["steal", "stolen", "theft", "rob", "burglary"],
  fraud: ["cheat", "fraud", "scam", "dishonest"],
  violence: ["attack", "assault", "injury", "beat", "hurt"],
  cyber: ["hacking", "cyber", "phishing", "identity theft"],
  dowry: ["dowry", "cruelty", "harassment", "domestic"],
};


import { cosineSimilarity } from "../utils/embedding.js";

export const askAI = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query?.trim()) return res.status(400).json({ message: "Query is required" });

    // Embed query
    const queryVec = await embedText(query);

    // Load all sections with embeddings
    const sections = await Section.find({ embedding: { $exists: true, $ne: [] } }).lean();

    // Compute similarity
    const results = sections.map(s => ({
      section: s,
      score: cosineSimilarity(queryVec, s.embedding),
    }));

    results.sort((a, b) => b.score - a.score);

    const matchedSections = results.slice(0, 3).map(r => r.section);

    res.json({ query, matchedSections });
  } catch (err) {
    console.error("askAI error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const searchSections = async (req, res) => {
  try {
    const query = req.query.q;
    const results = await Section.find({
      $or: [
        { sectionNumber: { $regex: query, $options: "i" } },
        { sectionName: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { lawType: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    }).limit(10);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get section by sectionNumber
export const getSectionByNumber = async (req, res) => {
  try {
    const section = await Section.findOne({ sectionNumber: req.params.number });
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
