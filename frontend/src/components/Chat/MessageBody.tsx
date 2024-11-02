import { renderMdToHtml } from "./markdownRendering";

interface MessageBodyProps {
  rawContent: string;
}
export default function MessageBody({ rawContent }: MessageBodyProps) {
  return (
    <p
      className="font-sans text-base/8 font-light"
      dangerouslySetInnerHTML={{ __html: renderMdToHtml(rawContent) }}
    />
  );
}
