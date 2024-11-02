import DOMPurify from "dompurify";
import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "",
    langPrefix: "hljs language-",
    highlight(code, lang, _info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

export function renderMdToHtml(md: string): string {
  let rendered: string | undefined;
  try {
    rendered = marked.parse(md) as string;
  } catch (err) {
    console.error(err);
    rendered = md;
  }
  return DOMPurify.sanitize(rendered);
}
