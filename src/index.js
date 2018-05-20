import jspicl from "jspicl";
import path from "path";
import { spawn, execSync } from "child_process";
import { banner, defaultOptions, defaultPicoOptions, pico8PathMap } from "./constants";
import { generateCartridge } from "./cartridge";
import { logStats, logToFile } from "./logging";

export default function (customizedOptions) {
  const options = Object.assign({}, defaultOptions, customizedOptions);

  if (!options.cartridgePath) {
    throw new Error("Ensure that 'cartridgePath' property in options is set.");
  }

  const picoOptions = Object.assign({}, defaultPicoOptions, options.pico);

  let picoProcess = null;

  return {
    transformBundle: javascriptCode => {
      const {
        cartridgePath,
        luaOutput,
        includeBanner,
        jsOutput,
        polyfillTransform,
        showStats
      } = options;

      const { output, polyfills } = jspicl(javascriptCode);
      const polyfillOutput = polyfillTransform ? polyfillTransform(polyfills) : Object.values(polyfills).join("\n");
      const luaCode = `${polyfillOutput} ${output}`;

      const jspiclBanner = includeBanner && banner || "";
      const cartridge = generateCartridge(`${jspiclBanner} ${luaCode}`, cartridgePath);

      jsOutput && logToFile(javascriptCode, jsOutput);
      luaOutput && logToFile(luaCode, luaOutput);
      showStats && logStats(luaCode, polyfillOutput, cartridge);

      return cartridge;
    },

    ongenerate: ({ file }) => {
      if (!picoOptions.autoRun) {
        return;
      }

      if (picoProcess) {
        if (!picoOptions.reloadOnSave) {
          return;
        }

        // Currently only MacOS supports auto reloading when saving.
        process.platform === "darwin" && execSync(`osascript "${path.join(__dirname, "reload-pico8.scpt")}"`);
      }
      else {
        // Use customized path if available, otherwise fallback to the default one for the current OS
        const picoPath = picoOptions.customizedOptions || pico8PathMap[process.platform];

        picoProcess = spawn(picoPath, ["-run", `"${path.join(".", file)}"`], {
          shell: true,
          stdio: picoOptions.pipeOutputToConsole ? "inherit" : "pipe"
        });

        picoProcess.on("close", code => {
          picoProcess = null;
          code && console.log(`Pico-8 process exited with code ${code}`); // eslint-disable-line no-console
        });
      }
    }
  };
}
