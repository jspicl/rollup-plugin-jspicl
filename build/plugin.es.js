import fs from 'fs';
import path from 'path';
import jspicl from 'jspicl';

var utilities = `
function merge(target, source)
  for key, value in pairs(source) do
    target[key] = value
  end

  return target
end

function join(table, separator)
  local result = ""

  for value in all(table) do
    result = result..separator..value
  end

  return result
end`;

// const defaultOutput = "bundle.js";

var index = () => ({
  transformBundle: function (source) {
    fs.writeFileSync(path.resolve("build/bundle.js"), source);

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

export default index;
