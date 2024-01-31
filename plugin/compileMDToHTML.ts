import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax/chtml";
import rehypeStringify from "rehype-stringify";

export default async function myPlugin() {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathjax, {
      chtml: {
        fontURL:
          "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
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

        console.log(source.replace(/\\n/g, "\n"));
        const result = await processor.process(source.replace(/\\n/g, "\n"));
        const resultString = result.toString().replace(/\n/g, "\\n");

        return {
          code: `export default \`${resultString}\``,
        };
      }
    },
  };
}
