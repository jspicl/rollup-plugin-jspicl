export const expected2 = (gff, map, music) => `pico-8 cartridge // http://www.pico-8.com
version 8
__lua__
local a = 1
__gfx__
1
__gff__
${gff}
__map__
${map}
__sfx__
4
5
6
__music__
${music}

`;
