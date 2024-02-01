import compileMDToHTML from "./plugin/compileMDToHTML";

export default {
  plugins: [compileMDToHTML()],
  build: {
    target: "esnext",
  },
};
