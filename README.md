# 🤖 RAG Chatbot – AI-Powered Document Intelligence System

## 📌 Overview

The **RAG Chatbot** is a full-stack AI system that allows users to:

- 📄 Upload PDF documents
- 💬 Ask questions from uploaded files
- 🧠 Get AI-powered answers using RAG (Retrieval-Augmented Generation)
- 🌐 Fetch real-time information using web search
- ⚡ Get fast streaming responses like ChatGPT

It combines **LLMs + Vector Database + Embeddings + Modern UI** to build an intelligent document assistant.



---

## 🌐 Deployment

Deployed using **Render** 🚀

Visit the live project here:  "https://rag-chatbot-a3py.onrender.com/"

- Auto deploy from GitHub
- Environment variables managed via Render dashboard
- MongoDB Atlas used for database

---

## ✨ Features

### 📄 PDF Upload & Processing
- Upload PDF files via UI
- Extract text using `pdf-parse`
- Split documents into chunks
- Convert chunks into embeddings
- Store data in PostgreSQL (Neon + pgvector)

---

### 🧠 RAG (Retrieval-Augmented Generation)
- Converts user query into embeddings
- Finds most relevant document chunks
- Sends context to LLM
- Generates accurate answers from documents

---

### 🔍 Semantic Search
- Vector similarity search using cosine distance
- Fast retrieval from database
- Context-aware responses

---

### 🌐 Web Search Integration
- Uses Tavily API for live internet search
- Activates when document data is not available
- Handles:
  - News
  - Current events
  - Sports updates
  - Latest facts

---

### 💬 AI Chat Interface
- ChatGPT-style UI
- Streaming responses
- Message history support
- Clean and responsive design

---

### 📤 Upload System
- Simple file upload UI
- File size validation (10MB limit)
- Instant processing feedback

---

### 🔐 Authentication
- Clerk authentication system
- Secure login/logout
- User session handling

---

## 🏗️ Architecture

User → Chat UI → API Route →  
→ (Web Search OR Vector DB OR LLM) →  
→ Embedding Search → Context → LLM → Response

---

## ⚙️ Tech Stack

**Frontend**
- Next.js (App Router)
- React.js
- Tailwind CSS

**Backend**
- Next.js API Routes
- Server Actions

**AI / ML**
- Groq LLaMA 3.1
- Google Gemini Embeddings
- AI SDK

**Database**
- PostgreSQL (Neon)
- pgvector extension

**Tools**
- pdf-parse
- tavily
- drizzle-orm
- zod

---
## 📁 Project Structure
src/
├── app/
│ ├── api/
│ │ ├── chat/
│ │ ├── test-search/
│ ├── chat/
│ ├── upload/
│
├── lib/
│ ├── db-config.ts
│ ├── db-schema.ts
│ ├── search.ts
│ ├── embeddings.ts
│ ├── web-search.ts
│ ├── chunking.ts
│
├── components/
│ ├── ai-elements/
│ ├── ui/



---

## 🔄 Workflow

### Step 1: Upload PDF
- PDF uploaded from UI
- Text extracted
- Split into chunks
- Embeddings generated
- Stored in database

---

### Step 2: Ask Question
- Query converted to embedding
- Similar chunks retrieved
- Context sent to LLM

---

### Step 3: AI Response
- LLM generates answer
- Streaming response sent to UI

---

## 🚀 Highlights

- ⚡ Real-time AI chat system
- 🧠 Full RAG pipeline
- 📄 PDF-based knowledge assistant
- 🌐 Web search fallback
- 🔍 Vector database search
- 💬 Streaming responses

---

## 📈 Future Improvements

- Multi-PDF selection
- Chat history storage
- User-based document isolation
- Admin dashboard
- Source highlighting in answers

---
## 📈 Application Screenshorts

<p align="center">
 
<img src="https://github.com/user-attachments/assets/ddc59090-0114-41c3-b19f-765fb1d4cc33"  width="48%"  />
<img  src="https://github.com/user-attachments/assets/3a2b8dba-0080-44f0-afe2-be4fecf9a66b"  width="48%"  />


<img  src="https://github.com/user-attachments/assets/3eda2cf2-1dbb-4c92-b8fb-c316fa958f18" width="48%"  />

<img src="https://github.com/user-attachments/assets/3f4e2b37-37e6-4277-bed1-d2965c040cb3" width="48%"  />

<img src="https://github.com/user-attachments/assets/30d5b4dd-331d-4415-860d-19c6afed682e" width="48%"  />

<img src="https://github.com/user-attachments/assets/99eeb427-16bf-4f5a-b4d0-5b140a0102ad"  width ="50%" />
</p>





