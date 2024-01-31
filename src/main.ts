import "./style.css";
import menuHtml from "./menu.html?raw";
import "highlight.js/styles/github.css";

const response = await fetch("config.json");
const config: { title: string; path: string }[] = await response.json();

const pathname = window.location.pathname;
console.log(pathname);
const appContainer = document.querySelector<HTMLDivElement>("#app")!;

if (pathname === "/") {
  appContainer.innerHTML = menuHtml;
  const menu = document.querySelector<HTMLUListElement>("#menu")!;
  config.map(({ title, path }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.appendChild(document.createTextNode(title));
    a.href = path;
    li.appendChild(a);
    menu.appendChild(li);
  });
} else {
  const { default: postHTML } = await import("./posts/ss.md?raw");
  appContainer.innerHTML = postHTML;
}
