import fs from "fs";
import path from "path";
import jspicl from "jspicl";
import utilities from "./utilities";

// const defaultOutput = "bundle.js";

export default (options = {}) => ({
  transformBundle: function (source) {
    const { jsOutput = "jsoutput.js" } = options;
    jsOutput && fs.writeFileSync(path.resolve(jsOutput), source);

    const luaCode = jspicl(source)
      .replace(/\$/g, "_")
      .replace(/Math\.max/g, "max")
      .replace(/Math\.floor/g, "flr")
      .replace(/Object\.assign/g, "merge")
      .replace(/(\w+)\.forEach\(/g, "foreach($1, ")
      .replace(/(\w+)\.push\(/g, "add($1, ")
      .replace(/(\w+)\.join\(/g, "join($1, ");

    const cartridge = utilities + luaCode;
//         const cartridge = `pico-8 cartridge // http://www.pico-8.com
// version 8
// __lua__
// ${luaCode}
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