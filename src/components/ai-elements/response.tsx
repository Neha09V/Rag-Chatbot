
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

export function Response({
  children,
}: {
  children: React.ReactNode;
}) {
  const text = String(children ?? "")
    // Normalize escaped HTML line breaks from the LLM
    .replace(/\\+&lt;br\s*\/?&gt;/gi, "\n")
    .replace(/\\+<br\s*\/?>/gi, "\n")
    .replace(/&lt;br\s*\/?&gt;/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n");

  const components: Components = {
    h1: ({ children }) => (
      <h1 className="mt-6 mb-3 text-2xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-5 mb-2 text-xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-4 mb-2 text-lg font-semibold">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="my-3 leading-7">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-3 list-disc space-y-1 pl-6">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-3 list-decimal space-y-1 pl-6">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="pl-1 leading-7">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="my-4 w-full overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="border-b px-4 py-3 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b px-4 py-3 align-top leading-6">
        {children}
      </td>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
        {children}
      </pre>
    ),
    code: ({ children, className }) => {
      const isBlock = Boolean(className);

      return isBlock ? (
        <code className={className}>{children}</code>
      ) : (
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
          {children}
        </code>
      );
    },
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4"
      >
        {children}
      </a>
    ),
  };

  return (
    <div className="min-w-0 w-full break-words text-sm sm:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
