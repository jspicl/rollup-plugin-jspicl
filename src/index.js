import jspicl from "jspicl";
import { defaultOptions } from "./constants";
import { generateCartridge } from "./cartridge";
import { logStats, logToFile } from "./logging";

export default (options = defaultOptions) => {
  options = Object.assign({}, defaultOptions, options);

  return {
    options: rollupOptions => {
      options.output = rollupOptions.output;
    },

    transformBundle: javascriptCode => {
      const { output, luaOutput, jsOutput, showStats } = options;

      const luaCode = jspicl(javascriptCode);
      const cartridge = generateCartridge(luaCode, output.file);

      jsOutput && logToFile(javascriptCode, jsOutput);
      luaOutput && logToFile(luaCode, luaOutput);
      showStats && logStats(luaCode, cartridge);

      return cartridge;
    }
  };
};