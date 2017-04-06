# rollup-plugin-jspicl
This plugin uses jspicl to convert javascript into PICO-8 lua code.

## Installation

```bash
npm install rollup-plugin-jspicl --save-dev
```

## Usage

```js
import jspicl from "rollup-plugin-jspicl";

export default {
  ...
  plugins: [
    ...
    jspicl()
  ]
})
```

## Versioning
This project uses semantic versioning

## License
MIT