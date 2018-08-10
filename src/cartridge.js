import fs from "fs";
import path from "path";
import { defaultGfx, defaultGff, defaultMap, defaultSfx, defaultMusic } from "./constants";

export function generateCartridgeContent ({
  lua = "",
  gff = defaultGff,
  gfx = defaultGfx,
  music = defaultMusic,
  map = defaultMap,
  sfx = defaultSfx
}) {
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

export function getCartridgeSections (cartridgePath) {
  const result = {};

  try {
    const contents = fs.readFileSync(path.resolve(cartridgePath), "utf8");

    let content, section;

    // Extract the contents of each section
    const regex = /__([a-z]+)__\n([\s\S]*?)(?=\n__\w+__\n|\n(\n|$))/g;
    while ([, section, content] = regex.exec(contents) || "") { // eslint-disable-line no-cond-assign
      result[section] = content;
    }
  }
  catch (error) {
    // File probably doesn't exist
    console.warn("Warning: Could not parse cartridge or no cartridge found"); // eslint-disable-line no-console
  }

  return result;
}
