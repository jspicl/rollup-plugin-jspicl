# This project is no longer maintained! [Please use jspicl-cli instead.](https://github.com/jspicl/rollup-plugin-jspicl)

---

## rollup-plugin-jspicl
This plugin uses jspicl to convert your JavaScript into a PICO-8 cartridge with lua code.

## Installation

```bash
npm install rollup-plugin-jspicl --save-dev
```

## Related projects
[jspicl](https://github.com/AgronKabashi/jspicl) - A Javascript to PICO-8 Lua transpiler

[games](https://github.com/topics/jspicl-sample) - Games created with jspicl

## Usage

```js
import jspicl from "rollup-plugin-jspicl";

export default {
  input: "src/game.js",
  output: {
    file: "build/game.p8",
    format: "es"
  },
  plugins: [
    buble(),
    jspicl({
      // options
    })
  ]
})
```

## Options
| Property              | Type                  | Default   | Description |
|-----------------------|-----------------------|-----------|-------------|
| cartridgePath         | string                |           | Path to an existing cartridge to load map, music and sfx from. Ideally this should point to the generated cartridge so you can edit the assets directly. This setting however gives you the option to use a separate cartridge as the source for your assets. *MANDATORY* |
| includeBanner         | bool                  | true      | Adds a comment at the very top of the generated bundle with jspicl info. |
| jsOutput              | string                |           | Output generated javascript code to a file. Useful for debugging when used in combination with [astexplorer](http://astexplorer.net). |
| luaOutput             | string                |           | Output generated lua code to a file. |
| polyfillTransform     | polyfills => string   | undefined | Callback method for modifying the polyfills that are needed. An object hashmap will be passed in where the keys represent the function names and values the lua code. You may replace the existing polyfills with your own versions or even add additional ones. |
| showStats             | bool                  | true      | Display useful stats about the generated cartridge |
| spritesheetImagePath  | string                |           | Path to a png image to be used as the spritesheet. Colors will be downsampled and mapped against PICO-8's fixed palette using a distance based approach. Using colors close to PICO-8's palette will yield best results. *MANDATORY* |
| pico                  | object                |           | PICO-8 specific options. Default options will be used if not supplied. See table below for details. |
| jspicl                | object                |           | Options to pass into jspicl. Default options will be used if not supplied. See [repo](https://github.com/AgronKabashi/jspicl#usage) for detailed info. |

### PICO-8 Options
| Property            | Type   | Default | Description |
|---------------------|--------|---------|-------------|
| autoRun             | bool   | true    | Start up PICO-8 when starting the build with `npm start` |
| customPicoPath      | string |         | Path to PICO-8. If not specified the default path will be used. |
| pipeOutputToConsole | bool   | false   | When true, will output `console.log` calls to terminal that launched PICO-8. |
| reloadOnSave        | bool | true      | Automatically reload the cart when source files have been modified. |

## Versioning
This project uses semantic versioning
