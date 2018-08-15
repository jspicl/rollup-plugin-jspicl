# Changelog

## Version 5.0.3
*2018-08-15*
* Upgraded to jspicl@2.2.4

## Version 5.0.2
*2018-08-14*
* Upgraded to jspicl@2.2.2

## Version 5.0.1
*2018-08-10*
* Bug fix: Watcher would in some cases trigger multiple times when updating the spritesheet.

## Version 5.0.0
*2018-08-10*
* ***\*BREAKING CHANGE\**** Added `spritesheetImagePath` configuration option in order to allow a png file to be used as the PICO-8 spritesheet. The `gfx` section in cartridge will no longer be reused. A watcher will re-build the project whenever the spritesheet is updated.
* Readme updated to include new configuration option.
* Upgraded to jspicl@2.2.1
* Added CHANGELOG

## Version 4.7.0
*2018-07-21*
* Readme updated to include jspicl options
* Added github issue template for reporting bugs
* Live reload is more stable and predictable.
* Upgraded to jspicl@2.1.0
* Rollup API changed. Upgraded to jspicl@0.63.2

## Version 4.6.3
*2018-05-20*
* Banner no longer adds to token count in build output stats.

## Version 4.6.2
*2018-05-20*
* Bug fix: Converted banner to lower case to prevent PICO-8 from displaying special characters

## Version 4.6.1
*2018-05-19*
* Bug fix: Covered case when there would be 0 tokens detected.

## Version 4.6.0
*2018-05-19*
* Add, remove or replace polyfills through the `polyfillTransform` callback option.
* Extended build output details to include polyfill stats.
* Upgraded to jspicl@2.0.0

## Version 4.5.0
*2018-04-14*
* Upgraded to jspicl@1.6.0

## Version 4.4.1
*2018-02-15*
* Debugging configuration for VS code
* Upgraded to rollup@0.54.0

## Version 4.4.0
*2018-02-14*
* Fixes cartridge overwriting. A special case where cartridge could end up with double line feeds at the end would break the cardridge.
  - Contributed by [Bryce Neal](https://github.com/prettymuchbryce)

## Version 4.3.1
*2018-02-14*
* Upgraded to jspicl@1.4.2

## Version 4.3.0
*2018-01-24*
* Upgraded to jspicl@1.4.0

## Version 4.2.0
*2018-01-13*
* Added support for livereloading PICO-8 when source files changes. Currently supports macOS only.

## Version 4.1.2
*2018-01-08*
* Upgraded to jspicl@1.2.2

## Version 4.1.1
*2018-01-08*
* Upgraded to jspicl@1.2.1

## Version 4.1.0
*2018-01-07*
* Upgraded to jspicl@1.2.0

## Version 4.0.5
*2018-01-05*
* Upgraded to jspicl@1.1.2
* Upgraded to rollup@0.53.3

## Version 4.0.4
*2018-01-05*
* Upgraded to jspicl@1.1.1

## Version 4.0.3
*2017-09-26*
* Upgraded to jspicl@1.1.0

## Version 4.0.2
*2017-09-14*
* Upgraded to jspicl@1.0.0

## Version 4.0.1
*2017-09-09*
* Upgraded to jspicl@0.4.1

## Version 4.0.0
*2017-09-08*
* ***\*BREAKING CHANGE\**** Rollup API changes. Upgraded to rollup@^0.50.0
* Introduced `cartridgePath` option to specify which cartridge to extract assets from.
* Readme updated to document new option.

## Version 3.0.1
*2017-09-08*
* Revert removal of CJS output.

## Version 3.0.0
*2017-09-08*
* Breaking change, no longer producing CJS output in favor of only ES.
* Using customized eslint configuration
* Upgraded to jspicl@0.4.0

## Version 2.0.1
*2017-08-23*
* Bug fix: Reverted option callback.

## Version 2.0.0
*2017-08-23*
* ***\*BREAKING CHANGE\**** Rollup API changes. Upgraded to rollup@0.48.2

## Version 1.2.2
*2017-06-05*
* Upgraded to jspicl@0.2.6

## Version 1.2.1
*2017-05-22*
* Upgraded to jspicl@0.2.4

## Version 1.2.0
*2017-04-29*
* Token count is included in build output statistics.

## Version 1.1.0
*2017-04-27*
* Readme updated to include configuration options.
* Build output with statistics about the generated cardridge.

## Version 1.0.2
*2017-04-27*
* Moved jspicl to dependencies from devDependencies

## Version 1.0.1
*2017-04-27*
* Upgraded to jspicl@0.2.3

## Version 1.0.0
*2017-04-25*
* MVP release that included reusing of existing assets in cartridge.

## Version 0.0.7
*2017-04-15*
* README updated with related projects.

## Version 0.0.4
*2017-04-07*
* Preparations for unit testing, dependencies and launch script added.

## Version 0.0.6
*2017-04-12*
* Lua polyfills removed.

## Version 0.0.4
*2017-04-07*
* Preparations for unit testing, dependencies and launch script added.

## Version 0.0.3
*2017-04-06*
* JS export path made configurable

## Version 0.0.2
*2017-04-06*
* README updated with usage info.

## Version 0.0.1
*2017-04-06*
* Initial version.
