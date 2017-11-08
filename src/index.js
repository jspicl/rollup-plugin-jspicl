import jspicl from "jspicl";
import { defaultOptions } from "./constants";
import { generateCartridge } from "./cartridge";
import { logStats, logToFile } from "./logging";

export default function (customizedOptions) {
  const options = Object.assign({}, defaultOptions, customizedOptions);

  if (!options.cartridgePath) {
    throw new Error("The 'cartridgePath' property is missing.");
  }

  return {
    transformBundle: javascriptCode => {
      const { cartridgePath, luaOutput, jsOutput, showStats } = options;

      const luaCode = jspicl(javascriptCode);
      const cartridge = generateCartridge(luaCode, cartridgePath);

      jsOutput && logToFile(javascriptCode, jsOutput);
      luaOutput && logToFile(luaCode, luaOutput);
      showStats && logStats(luaCode, cartridge);

      return cartridge;
    }
  };
}
