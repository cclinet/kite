import myPlugin from "./plugin/compileMdToHtml";

export default {
  plugins: [myPlugin()],
  build: {
    target: "esnext",
  },
};
