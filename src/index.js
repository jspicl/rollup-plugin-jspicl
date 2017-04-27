import jspicl from "jspicl";
import { defaultOptions } from "./constants";
import { generateCartridge } from "./cartridge";
import { logStats, logToFile } from "./logging";

export default (options = defaultOptions) => {
  options = Object.assign({}, defaultOptions, options);

  return {
    options: rollupOptions => {
      options.dest = rollupOptions.dest;
    },

    transformBundle: javascriptCode => {
      const { dest, luaOutput, jsOutput, showStats } = options;

      const luaCode = jspicl(javascriptCode);
      const cartridge = generateCartridge(luaCode, dest);

      jsOutput && logToFile(javascriptCode, jsOutput);
      luaOutput && logToFile(luaCode, luaOutput);
      showStats && logStats(luaCode, cartridge);

      return cartridge;
    }
  };
};