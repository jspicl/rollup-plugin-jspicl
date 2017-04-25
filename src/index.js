import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import jspicl from "jspicl";

import {defaultOptions, defaultGfx, defaultGff, defaultMap, defaultSfx, defaultMusic} from "./constants";

function getCartDetails (dest) {
  const result = {};

  try {
    const contents = fs.readFileSync(path.resolve(dest), { encoding: "utf8" });

    let content, section;

    const regex = /__([a-z]+)__\n([\s\S]*?)(?=\n__\w+__\n|\n\n)/g;
    while ([, section, content] = regex.exec(contents) || "") { // eslint-disable-line no-cond-assign
      if (section !== "lua") {
        result[section] = content;
      }
    }
  }
  catch (error) {
    // File probably doesn't exist
  }

  return result;
}

export default (options = defaultOptions) => ({
  options: function (rollupOptions) {
    options.dest = rollupOptions.dest;
  },

  transformBundle: function (source) {
    const { jsOutput, dest } = options;
    if (jsOutput) {
      mkdirp.sync(path.dirname(jsOutput));
      fs.writeFileSync(path.resolve(jsOutput), source);
    }

    const {
      gff = defaultGff,
      gfx = defaultGfx,
      music = defaultMusic,
      map = defaultMap,
      sfx = defaultSfx
    } = getCartDetails(dest);

    const cartridge = `pico-8 cartridge // http://www.pico-8.com
version 8
__lua__
${jspicl(source)}
__gfx__
${gfx}
__gff__
${gff}
__map__
${map}
__sfx__
${sfx}
__music__
${music}
 `;

    return cartridge;
  }
});