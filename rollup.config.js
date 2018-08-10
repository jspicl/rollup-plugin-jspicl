export default {
  input: "src/index.js",
  external: ["fs", "path", "chokidar", "jspicl", "child_process", "mkdirp", "columnify", "pngjs"],
  output: {
    file: "build/plugin.js",
    format: "cjs"
  }
};
