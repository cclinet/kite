import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://cclinet.github.io',
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: "mathml" }]],
  },
});
