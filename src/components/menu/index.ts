import menuHTML from "./menu.html?raw";
export default function IndexMenu(config: { title: string; path: string }[]) {
  const root = document.createElement("section");
  root.innerHTML = menuHTML;
  const menu = root.querySelector<HTMLUListElement>("#menu")!;
  config.map(({ title, path }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.appendChild(document.createTextNode(title));
    a.href = path;
    li.appendChild(a);
    menu.appendChild(li);
  });
  return root;
}
