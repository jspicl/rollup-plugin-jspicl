'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var mkdirp = _interopDefault(require('mkdirp'));
var jspicl = _interopDefault(require('jspicl'));

var index = (options = {}) => ({
  transformBundle: function (source) {
    const { jsOutput } = options;
    if (jsOutput) {
      mkdirp.sync(path.dirname(jsOutput));
      fs.writeFileSync(path.resolve(jsOutput), source);
    }

    const cartridge = jspicl(source);
// `pico-8 cartridge // http://www.pico-8.com
// version 8
// __lua__
//  ${jspicl(source)}
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
