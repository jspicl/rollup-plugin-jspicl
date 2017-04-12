import fs from "fs";
import path from "path";
import jspicl from "jspicl";

// const defaultOutput = "bundle.js";

export default (options = {}) => ({
  transformBundle: function (source) {
    const { jsOutput = "jsoutput.js" } = options;
    jsOutput && fs.writeFileSync(path.resolve(jsOutput), source);

    const cartridge = jspicl(source);
// `pico-8 cartridge // http://www.pico-8.com
// version 8
// __lua__
//
// __gfx__
// __label__

// __gff__
// __map__
// __sfx__
// __music__

// `;

    return cartridge;
  }
});