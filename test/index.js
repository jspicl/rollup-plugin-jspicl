import { expect } from "chai";
import fs from "fs";
import plugin from "../src";

const defaultOptions = {
  luaOutput: false,
  spritesheetImagePath: `${__dirname}/fixtures/spritesheet.png`,
  includeBanner: false,
  jsOutput: false,
  showStats: false,
  pico: {
    autoRun: false,
    reloadOnSave: false
  }
};

const setup = options => plugin({
  ...defaultOptions,
  ...options
});

describe("rollup-plugin-jspicl", () => {
  it("should only overwrite lua section with transpiled code", async () => {
    const { transformChunk } = setup({
      cartridgePath: `${__dirname}/fixtures/replaceLua.txt`
    });

    const result = await transformChunk("var a = 1;");
    expect(result.code).to.equal(fs.readFileSync(`${__dirname}/expected/replaceLua.txt`, "utf8"));
  });

  it("should add missing sections", async () => {
    const { transformChunk } = setup({
      cartridgePath: `${__dirname}/fixtures/missingSections.txt`
    });

    const result = await transformChunk("var a = 1;");
    expect(result.code).to.equal(fs.readFileSync(`${__dirname}/expected/missingSections.txt`, "utf8"));
  });

  it("should handle case where cartridge does not end with two newlines", async () => {
    const { transformChunk } = setup({
      cartridgePath: `${__dirname}/fixtures/singleNewline.txt`
    });

    const result = await transformChunk("var a = 1;");
    expect(result.code).to.equal(fs.readFileSync(`${__dirname}/expected/singleNewline.txt`, "utf8"));
  });

  it("includes banner", async () => {
    const { transformChunk } = setup({
      includeBanner: true,
      cartridgePath: `${__dirname}/fixtures/banner.txt`
    });

    const result = await transformChunk("var a = 1;");
    expect(result.code).to.equal(fs.readFileSync(`${__dirname}/expected/banner.txt`, "utf8"));
  });
});
