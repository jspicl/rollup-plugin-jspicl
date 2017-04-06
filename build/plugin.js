'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var jspicl = _interopDefault(require('jspicl'));

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

var index = (options = {}) => ({
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

module.exports = index;
