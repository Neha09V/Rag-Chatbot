export default function Home() {
  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold tracking-tight">
          🤖 RAG Chatbot
        </h1>

        <p className="mt-6 text-xl text-muted-foreground">
          Chat with your documents using AI-powered Retrieval
          Augmented Generation.
        </p>

        <div className="flex gap-4 justify-center mt-10">
          <a
            href="/chat"
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground"
          >
            Start Chatting
          </a>

          <a
            href="/upload"
            className="px-6 py-3 rounded-xl border"
          >
            Upload Documents
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-6xl w-full">
        <div className="border rounded-xl p-6">
          <h3 className="font-semibold">📄 PDF Upload</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Upload documents to build your knowledge base.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-semibold">🔍 Vector Search</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Retrieve relevant chunks using semantic search.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-semibold">⚡ Groq LLM</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Generate fast and accurate responses.
          </p>
        </div>
      </div>
    </main>
  );
}