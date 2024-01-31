import "./style.css";
import { mdProcess } from "./mdProcess.ts";
import "mathjax/es5/tex-chtml";
// import "mathjax/es5/output/chtml/fonts/woff-v2"

const response = await fetch("config.json");
const config: { title: string; path: string }[] = await response.json();

const pathname = window.location.pathname;
console.log(pathname);
const appContainer = document.querySelector<HTMLDivElement>("#app")!;
if (pathname === "/") {
  appContainer.innerHTML = `
  <ul id="menu">
  </ul>
`;
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
  const response = await fetch(pathname + ".md");
  const text = await response.text();
  console.log(text);
  const htmlContent = await mdProcess(text);
  appContainer.innerHTML = htmlContent;
  //@ts-ignore
  await MathJax.typesetPromise();
}
