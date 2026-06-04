import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Response({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ lineHeight: "1.7" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {String(children)}
      </ReactMarkdown>
    </div>
  );
}