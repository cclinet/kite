import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDomStringify from "rehype-dom-stringify";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math"
import rehypeMathjax from "rehype-mathjax/browser";
import "highlight.js/styles/github.css";

const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeMathjax)
  .use(rehypeHighlight)
  .use(rehypeDomStringify);

export async function mdProcess(markdownText: string) {
  return (await processor.process(markdownText)).toString();
}
