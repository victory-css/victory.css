Victory.css is a simply and lightweight front-end framework/toolkit (call it what you want) for developing fast.

## Download

Use CDN:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/victory.css@0.5/dist/victory.min.css">
<script src="https://cdn.jsdelivr.net/npm/victory.css@0.5/dist/victory.min.js"></script>
```

Or download from:

- https://raw.githubusercontent.com/brcontainer/victory.css/0.5.4/dist/victory.min.css
- https://raw.githubusercontent.com/brcontainer/victory.css/0.5.4/dist/victory.min.js

then use in your project put like this:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no">
<link rel="stylesheet" type="text/css" href="victory.min.css">
<script src="victory.min.js"></script>
```

## Browser Support

Chrome | Firefox | Safari | Opera | Edge | EdgeHTML | IE9+ | IE8
--- | --- | --- | --- | --- | --- | --- | ---
![Chrome][1] | ![Firefox][2] | ![Safari][3] | ![Opera][4] | ![Edge][5] | ![EdgeHTML][6] | ![IE9+][7] | ![IE8][8]
✔ | ✔ | ✔ 8+ | ✔ | ✔ | ✔ | ✔ | (partial)

> **Note:** Victory.css has some fallbacks for old browsers without media-queries support, such as *Internet Explorer 8*, preventing your site from breaking

## Basic vs Standard

Basic contains only basic resources, `victory-basic.min.js` contains only polyfills, about differences see:

Resource | Standard | Basic | About
--- | --- | --- | ---
`border.scss` | ✔ | ✔ | Utility for arround any element
`clear-both.scss` | ✔ | ✔ | Clear both "global"
`colors.scss` | ✔ | ✔ | Background and border color classes
`commons.scss` | ✔ | ✔ | Various classes of common use
`container.scss` | ✔ | ✔ | container (adpatative width `@media-query`) and container-fluid
`grid.scss` | ✔ | ✔ | Grid system
`normalize.scss` | ✔ | ✔ | Basic normalize and fallback for html5 tags for old browsers
`text-align.scss` | ✔ | ✔ | `text-align` basead in view-port size
`visibility.scss` | ✔ | ✔ | `visibility:` and `display:` basead in view-port size
`arrow.scss` | ✔ | - | Various arrow "icons"
`badge.scss` | ✔ | - | Badges system
`button.scss` | ✔ | - | Styled buttons
`code.scss` | ✔ | - | Pre defined style for `<code>` tags
`divider.scss` | ✔ | - | Style horizontal lines (like `<hr>`)
`fix-render.scss` | ✔ | - | fix-render (fix bug in elements with `position:fixed` on enter Chromium/Chrome DevTools)
`input.scss` | ✔ | - | Styled inputs
`kbd.scss` | ✔ | - | Pre defined style for `<kbd>` tags
`nav.scss` | ✔ | - | Navbar system
`resize.scss` | ✔ | - | Resize elements (only Desktop)
`slide.scss` | ✔ | - | Slide system
`table.scss` | ✔ | - | Styled tables
`underline.scss` | ✔ | - | Underline text animated
Minified size  | 42kB | 16kB | -
Gziped size | 7.5kB | 2.7kB | -

For production use CDN:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/victory.css@0.5/dist/victory-basic.min.css">
<script src="https://cdn.jsdelivr.net/npm/victory.css@0.5/dist/victory-basic.min.js"></script>
```

Or download from:

- https://raw.githubusercontent.com/brcontainer/victory.css/0.5.4/dist/victory-basic.min.css
- https://raw.githubusercontent.com/brcontainer/victory.css/0.5.4/dist/victory-basic.min.js

then use in your project put like this:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no">
<link rel="stylesheet" type="text/css" href="victory-basic.min.css">
<script src="victory-basic.min.js"></script>
```

---

## Development

To contribute or modify download using git (require `npm`):

```
git clone https://github.com/inphinit/Victory.css.git [project_name]
cd [project_name]
npm install
```

After changes files in `./src` folder execute this command for deploy:

```
gulp
```

Or see another commands

## Commands

Command | Description
---|---
`gulp readme` | Generate `README.html` from `README.md`
`gulp examples` | Generate `examples/index.html` for link all examples
`gulp mergecss` | For create only `victory.css` without create prefixes and without min version
`gulp prefix` | For put prefix properties in `victory.css`
`gulp mincss` | For create min version from `victory.css`
`gulp mergejs` | For create only `victory.js` without min version
`gulp minjs` | For create min version from `victory.js`
`gulp standard` | Deploy without create slim and minimal versions, auto-execute follow commands `mergecss`, `prefix`, `mincss`, `mergejs`, `minjs`
`gulp` | Full deploy, auto-execute follow commands `mergecss`, `prefix`, `mincss`, `mergejs`, `minjs`, `slim:mergecss`, `slim:mincss`, `slim:mergejs`, `slim:minjs`, `minimal:mergecss`, `minimal:mincss` in sequence

## Basic commands

Command | Description
---|---
`gulp basic:mergecss` | For create only `victory-basic.css` without min version
`gulp basic:mincss` | For create min version from `victory-basic.css`
`gulp basic:mergejs` | For create only `victory-basic.js` without min version
`gulp basic:minjs` | For create min version from `victory-basic.js`
`gulp basic` | Minimal deploy, auto-execute follow commands `basic:mergecss`, `basic:mincss`, `basic:mergejs` and `basic:minjs` in sequence


[1]: https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[2]: https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[3]: https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png
[4]: https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png
[5]: https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png
[6]: https://raw.github.com/alrra/browser-logos/master/src/archive/edge_12-18/edge_12-18_48x48.png
[7]: https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png
[8]: https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png
