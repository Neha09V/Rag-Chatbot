export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background px-6">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-200px] left-[-100px] h-[350px] w-[350px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute right-[-100px] top-[40%] h-[350px] w-[350px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* Hero */}
        <section className="flex flex-col items-center pt-16 text-center sm:pt-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-sm shadow-sm backdrop-blur">
            <span>✨</span>
            <span className="text-muted-foreground">
              Intelligent Document AI
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Your documents.
            <br />
            <span className="bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
              Smarter conversations.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Ask questions, explore your documents, and get intelligent
            answers powered by Retrieval-Augmented Generation.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <a
              href="/chat"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start Chatting
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="/upload"
              className="inline-flex items-center justify-center gap-2 rounded-xl border bg-background/70 px-7 py-3.5 font-medium shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted"
            >
              📄 Upload Documents
            </a>

          </div>

        </section>


        {/* Feature Cards */}
        <section className="mt-14">

          <div className="grid gap-4 md:grid-cols-3">

            {/* Document Intelligence */}
            <div className="group rounded-xl border bg-background/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-lg transition-transform duration-300 group-hover:scale-110">
                📄
              </div>

              <h3 className="text-base font-semibold">
                Document Intelligence
              </h3>

              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                Turn PDFs into a searchable knowledge base for
                intelligent conversations.
              </p>

              <div className="mt-3 text-[10px] font-medium text-muted-foreground">
                PDF → Text → Chunks → Embeddings
              </div>

            </div>


            {/* Semantic Search */}
            <div className="group rounded-xl border bg-background/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-lg transition-transform duration-300 group-hover:scale-110">
                🔎
              </div>

              <h3 className="text-base font-semibold">
                Semantic Search
              </h3>

              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                Find relevant information using vector embeddings
                and similarity search.
              </p>

              <div className="mt-3 text-[10px] font-medium text-muted-foreground">
                Query → Embeddings → Search
              </div>

            </div>


            {/* Intelligent Answers */}
            <div className="group rounded-xl border bg-background/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-lg transition-transform duration-300 group-hover:scale-110">
                🧠
              </div>

              <h3 className="text-base font-semibold">
                Intelligent Answers
              </h3>

              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                Generate concise answers using retrieved context
                and a powerful language model.
              </p>

              <div className="mt-3 text-[10px] font-medium text-muted-foreground">
                Context → LLM → Grounded Response
              </div>

            </div>

          </div>

        </section>


        {/* Bottom CTA */}
        <section className="mb-10 mt-14 w-full rounded-2xl border bg-muted/30 px-6 py-8 text-center shadow-sm">

          <div className="mx-auto max-w-xl">

            <div className="text-2xl">
              🚀
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Ready to explore your knowledge?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Start a conversation and experience intelligent
              document search in seconds.
            </p>

            <a
              href="/chat"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore RAG AI
              <span>→</span>
            </a>

          </div>

        </section>

      </div>
    </main>
  );
}