import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import columnify from "columnify";

export {
  logStats,
  logToFile
};

function logToFile (content, filePath) {
  mkdirp.sync(path.dirname(filePath));
  fs.writeFileSync(path.resolve(filePath), content);
}

function logStats (lua, cartridge) {
  const stats = [
    {
      label: "Characters",
      value: lua.length,
      percent: `${(lua.length * 100 / 65535).toPrecision(1)}%`
    },
    // {
    //   label: "Tokens",
    //   value: 0,
    //   percent: `${0 / 8192}%`
    // },
    {
      label: "Filesize",
      value: `${Math.ceil(cartridge.length / 1024)} KB`
    }
  ];

  console.log(columnify(stats, { // eslint-disable-line no-console
    minWidth: 10,
    align: "right",
    dataTransform: value => `\x1b[33m${value}\x1b[0m`,
    headingTransform: () => "",
    config: {
      label: {
        align: "left",
        minWidth: 12,
        dataTransform: value => `\x1b[32m${value}\x1b[0m`
      }
    }
  }));
}
