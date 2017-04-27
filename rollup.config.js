export default {
  entry: "src/index.js",
  external: ["fs", "path", "jspicl", "mkdirp", "columnify"],
  targets: [
    {
      dest: "build/plugin.js",
      format: "cjs"
    },
    {
      dest: "build/plugin.es.js",
      format: "es"
    }
  ]
};