import packageJson from "./package.json";

export default {
  input: "src/index.js",
  external: [
    "fs",
    "path",
    "child_process",
    ...Object.keys(packageJson.dependencies)
  ],
  output: {
    file: "build/plugin.js",
    format: "cjs"
  }
};
