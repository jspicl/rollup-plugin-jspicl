'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var jspicl = _interopDefault(require('jspicl'));

// const defaultOutput = "bundle.js";

var index = (options = {}) => ({
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

module.exports = index;
