import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import jspicl from 'jspicl';

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

export default index;
