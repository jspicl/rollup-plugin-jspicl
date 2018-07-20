import { expect } from "chai";
import path from "path";
import plugin from "../src";
import { defaultGff, defaultMusic, defaultMap } from "../src/constants";
import * as results from "./expected";

const defaultOptions = {
  luaOutput: false,
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
  it("should only overwrite lua section and leave remaining sections intact", () => {
    const { transformChunk } = setup({
      cartridgePath: path.resolve(__dirname, "./fixtures/fixture1.txt")
    });

    expect(transformChunk("var a = 1;").code).to.equal(results.expected1);
  });

  it("should add missing sections", () => {
    const { transformChunk } = setup({
      cartridgePath: path.resolve(__dirname, "./fixtures/fixture2.txt")
    });

    expect(transformChunk("var a = 1;").code).to.equal(results.expected2(
      defaultGff,
      defaultMap,
      defaultMusic
    ));
  });

  it("should handle case where cartridge does not end with two newlines", () => {
    const { transformChunk } = setup({
      cartridgePath: path.resolve(__dirname, "./fixtures/fixture3.txt")
    });

    expect(transformChunk("var a = 1;").code).to.equal(results.expected3);
  });
});
