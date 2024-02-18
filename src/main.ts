import "./style.css";

import notFoundHTML from "./404.html?raw";
import IndexMenu from "./components";

const response = await fetch("config.json");
const config: { title: string; path: string }[] = await response.json();
const posts = new Set(config.map(({ path }) => path));

const pathname = window.location.pathname.substring(1);
const appContainer = document.querySelector<HTMLDivElement>("#app")!;

if (pathname === "") {
appContainer.appendChild(IndexMenu(config))
} else if (posts.has(pathname)) {
  const { default: postHTML } = await import(`../posts/${pathname}.md?raw`);
  appContainer.innerHTML = postHTML;
  if (
    document.querySelector<HTMLScriptElement>("#MathJax-script") &&
    //@ts-ignore
    typeof MathJax.typesetPromise === "function"
  ) {
    //@ts-ignore
    await MathJax.typesetPromise();
  }
} else {
  appContainer.innerHTML = notFoundHTML;
}
