import myPlugin from "./plugin/compileMDToHTML";

export default {
  plugins: [myPlugin()],
  build: {
    target: "esnext",
  },
};
