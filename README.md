# rollup-plugin-jspicl
This plugin uses jspicl to convert your JavaScript into a PICO-8 cartridge with lua code.

## Installation

```bash
npm install rollup-plugin-jspicl --save-dev
```

## Related projects
[jspicl](https://github.com/AgronKabashi/jspicl) - A Javascript to PICO-8 Lua transpiler

[jspicl-mario-sample](https://github.com/AgronKabashi/jspicl-mario-sample) - Mario sample game using jspicl and rollup-plugin-jspicl

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
    jspicl()
  ]
})
```

## Options
| Property       | Type   | Default | Description |
|----------------|--------|---------|-------------|
| cartridgePath  | string |         | Path to cartridge to load sprites, map, music and sfx from. Ideally this should point to the generated cartridge so you can edit the assets directly. However, this setting gives you the option to use a separate cartridge as the source for your assets. |
| jsOutput       | string |         | Output generated javascript code to a file. Useful for debugging, use in combination with [astexplorer](http://astexplorer.net). |
| luaOutput      | string |         | Output generated lua code to a file. |
| showStats      | bool   | true    | Display useful stats about the generated cartridge |
| runPico        | bool   | false   | Run cartridge in PICO-8 after it has been generated. **NOT SUPPORTED YET** |

## Versioning
This project uses semantic versioning

## License
MIT
