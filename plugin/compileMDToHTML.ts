import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax/browser";
import rehypeStringify from "rehype-stringify";

export default async function compileMDToHTML() {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathjax, {
      tex: {
        inlineMath: [
          ["$", "$"],
        ],
        displayMath: [
          ["$$", "$$"],
        ],
      },
    })
    .use(rehypeHighlight)
    .use(rehypeStringify);

  const fileRegex = /.*?.md\?raw/;
  return {
    name: "transform-file",

    async transform(code: string, id: string) {
      if (fileRegex.test(id)) {
        const source = code.slice('export default "'.length, -1);

        const result = await processor.process(source.replace(/\\n/g, "\n"));
        const resultString = result.toString().replace(/\\/g, "$&");
        return {
          code: `export default \`${resultString}\``,
        };
      }
    },
  };
}
