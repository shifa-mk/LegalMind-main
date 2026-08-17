# LegalMind ⚖️

AI-powered legal search and assistance platform designed to help users identify relevant legal sections from complaint descriptions using semantic search and embeddings.

## 🚀 Live Demo

https://legalmind-frontend.onrender.com

## 💻 GitHub Repository

https://github.com/shifa-mk/legal

## 📌 Overview

LegalMind combines semantic retrieval, vector search, and structured legal data to help retrieve relevant legal sections based on a user's complaint.

The system processes a complaint, generates an embedding, searches the legal knowledge base using MongoDB Atlas Vector Search, and returns relevant legal sections with confidence scores.

## ✨ Key Features

- 🔎 Semantic legal-section search
- 🤖 AI-powered complaint analysis
- 🧠 OpenAI embeddings
- 📊 MongoDB Atlas Vector Search
- 📍 GPS-based regional crime insights
- 📈 Confidence scoring
- 📝 Audit logging
- 📄 FIR generation
- 🔐 User authentication
- 🌐 Deployed full-stack application

## 🏗️ Architecture

User Complaint
       ↓
React Frontend
       ↓
Node.js / Express API
       ↓
Embedding Generation
       ↓
MongoDB Atlas Vector Search
       ↓
Relevant Legal Sections
       ↓
Confidence Score + Legal Information
       ↓
FIR Generation / Audit Logging

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- REST APIs

### AI / Search
- OpenAI Embeddings
- MongoDB Atlas Vector Search
- Semantic Search

### Deployment
- Render
- MongoDB Atlas

## 🔍 How It Works

1. User enters a complaint or legal query.
2. The backend processes the input.
3. An embedding is generated for the query.
4. MongoDB Atlas Vector Search retrieves semantically similar legal sections.
5. Relevant sections are returned with confidence scores.
6. Additional information such as punishment, investigation steps, and related sections can be displayed.
7. The system supports audit logging and FIR generation.

## 📊 Evaluation

The retrieval system was tested using different complaint scenarios, including ambiguous and low-confidence queries.

The legal dataset and embedding configuration were iteratively refined based on the relevance of retrieved sections.

## 📁 Project Structure

```text
LegalMind/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── ...
│
└── README.md
