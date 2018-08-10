import chokidar from "chokidar";
import { defaultOptions, defaultPicoOptions } from "./constants";
import { generateCartridgeContent, getCartridgeSections } from "./cartridge";
import { logStats, logToFile } from "./logging";
import { getSpritesheetFromImage } from "./spritesheet";
import { createPico8Launcher } from "./pico8-launcher";
import { transpile } from "./transpile";

export default function (customizedOptions) {
  const options = {
    ...defaultOptions,
    ...customizedOptions
  };

  if (!options.cartridgePath) {
    throw new Error("Ensure that 'cartridgePath' property in options is set.");
  }

  if (!options.spritesheetImagePath) {
    throw new Error("Ensure that 'spritesheetImagePath' property in options is set.");
  }

  const picoOptions = {
    ...defaultPicoOptions,
    ...options.pico
  };

  const runPico = createPico8Launcher(picoOptions);
  let spritesheetWatcher;

  return {
    name: "jspicl",

    buildStart () {
      if (!spritesheetWatcher && this.watcher) {
        spritesheetWatcher = chokidar.watch(options.spritesheetImagePath);
        spritesheetWatcher.on("change", () => {
          this.watcher.tasks.forEach(task => task.invalidate());
        });
      }
    },

    async transformChunk (javascriptCode) {
      const {
        cartridgePath,
        jsOutput,
        luaOutput,
        showStats,
        spritesheetImagePath
      } = options;

      const transpiledSource = transpile(javascriptCode, options);
      const cartridgeSections = getCartridgeSections(cartridgePath);
      const gfxSection = await getSpritesheetFromImage(spritesheetImagePath);

      const cartridge = generateCartridgeContent({
        ...cartridgeSections,
        lua: transpiledSource,
        gfx: gfxSection
      });

      // Statistics
      jsOutput && logToFile(javascriptCode, jsOutput);
      luaOutput && logToFile(transpiledSource.lua, luaOutput);
      showStats && logStats(transpiledSource.lua, transpiledSource.polyfillOutput, cartridge);

      return {
        code: cartridge
      };
    },

    generateBundle ({ file }) {
      runPico(file);
    }
  };
}
