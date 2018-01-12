export default {
  input: "src/index.js",
  external: ["fs", "path", "jspicl", "child_process", "mkdirp", "columnify"],
  output: {
    file: "build/plugin.js",
    format: "cjs"
  }
};
