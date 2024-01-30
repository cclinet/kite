import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDomStringify from "rehype-dom-stringify";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeDomStringify);

export async function mdProcess(markdownText: string) {
  return (await processor.process(markdownText)).toString();
}
