import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { mdProcess } from "./mdProcess.ts";

const pathname = window.location.pathname;
console.log(pathname);
const appContainer = document.querySelector<HTMLDivElement>("#app")!;
if (pathname === "/") {
  appContainer.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

  setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
} else {
  (async () => {
    const response = await fetch(pathname + ".md");
    const text = await response.text();
    console.log(text);
    const htmlContent = await mdProcess(text);
    appContainer.innerHTML = htmlContent;
  })();
}
