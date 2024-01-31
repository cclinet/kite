import "./style.css";
import menuHtml from './menu.html?raw'
import "highlight.js/styles/github.css";
// import "mathjax/es5/tex-chtml";
// import "mathjax/es5/output/chtml/fonts/woff-v2"
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax/browser";
import rehypeStringify from "rehype-stringify";
async function mdProcess(text:string) {
  const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeMathjax)
  .use(rehypeHighlight)
  .use(rehypeStringify);
  return (await processor.process(text)).toString()
}

const response = await fetch("config.json");
const config: { title: string; path: string }[] = await response.json();

const pathname = window.location.pathname;
console.log(pathname);
const appContainer = document.querySelector<HTMLDivElement>("#app")!;
if (pathname === "/") {
  appContainer.innerHTML = menuHtml;
  const menu = document.querySelector<HTMLUListElement>("#menu")!;
  console.log(config);
  config.map(({ title, path }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.appendChild(document.createTextNode(title));
    a.href = path;
    li.appendChild(a);
    menu.appendChild(li);
  });
} else {
  const {default: file} = await import("./posts/ss.md?raw");
  console.log(file)
  const htmlContent = await mdProcess(file);
  console.log(htmlContent)
  appContainer.innerHTML = htmlContent;
  // @ts-ignore
  // await MathJax.typesetPromise();
}
