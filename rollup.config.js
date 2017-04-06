export default {
  entry: "src/index.js",
  external: ["fs", "path", "jspicl"],
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