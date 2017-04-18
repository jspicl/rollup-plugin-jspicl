# rollup-plugin-jspicl
This plugin uses jspicl to convert javascript into PICO-8 lua code.

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
  entry: "src/game.js",
  dest: "build/game.lua",
  format: "es",
  plugins: [
    buble(),
    jspicl()
  ]
})
```

## Options
#### jsOutput
`string` **optional** Output the bundled javascript code to a file.

## Versioning
This project uses semantic versioning

## License
MIT