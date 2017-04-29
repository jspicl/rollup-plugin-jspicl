import fs from "fs";
import path from "path";
import { defaultGfx, defaultGff, defaultMap, defaultSfx, defaultMusic } from "./constants";

export {
  generateCartridge
};

function generateCartridge (lua, cartridgePath) {
  const {
    gff = defaultGff,
    gfx = defaultGfx,
    music = defaultMusic,
    map = defaultMap,
    sfx = defaultSfx
  } = getCartridgeDetails(cartridgePath);

  return `pico-8 cartridge // http://www.pico-8.com
version 8
__lua__
${lua}
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
}

function getCartridgeDetails (cartridgePath) {
  const result = {};

  try {
    const contents = fs.readFileSync(path.resolve(cartridgePath), { encoding: "utf8" });

    let content, section;

    // Extract the contents of each section
    const regex = /__([a-z]+)__\n([\s\S]*?)(?=\n__\w+__\n|\n\n)/g;
    while ([, section, content] = regex.exec(contents) || "") { // eslint-disable-line no-cond-assign
      if (section !== "lua") {
        result[section] = content;
      }
    }
  }
  catch (error) {
    // File probably doesn't exist
    console.warn("Warning: Could not parse cartridge or no cartridge found"); // eslint-disable-line no-console
  }

  return result;
}