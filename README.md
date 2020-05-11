Victory.css is a simply and lightweight front-end framework for developing fast.

> **Note:** under development

## Download

Use CDN:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/victory.css@0.2.1/dist/victory.min.css">
<script src="https://cdn.jsdelivr.net/npm/victory.css@0.2.1/dist/victory.min.js></script>
```

Or download from:

- https://raw.githubusercontent.com/brcontainer/victory.css/0.2.1/dist/victory.min.css
- https://raw.githubusercontent.com/brcontainer/victory.css/0.2.1/dist/victory.min.js

## Using

For use in your project copy `victory.min.css` and `victory.min.js` and put like this:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0">
<link rel="stylesheet" type="text/css" href="victory.min.css">
<script src="victory.min.js"></script>
```

## Browser Support

![Chrome][1] | ![Firefox][2] | ![Safari][3] | ![Opera][4] | ![Edge][5] | ![EdgeHTML][6] | ![IE9+][7] | ![IE8][8]
--- | --- | --- | --- | --- | --- | --- | ---
✔ | ✔ | ✔ 8+ | ✔ | ✔ | ✔ | ✔ 9+ | 8 (partial)

> **Note:** Victory.css has some fallbacks for old browsers without media-queries support, such as *Internet Explorer 8*, preventing your site from breaking

## Basic vs Standard

Basic contains only basic resources, `victory.min.js` is same from standard version, about differences see:

Resource | Standard | Basic
--- | --- | ---
`adaptive-animation.scss` | ✔ | ✔
`border.scss` | ✔ |✔
`clear-both.scss` | ✔ | ✔
`colors.scss` | ✔ | ✔
`commons.scss` | ✔ | ✔
`container.scss` | ✔ | ✔
`grid.scss` | ✔ | ✔
`normalize.scss` | ✔ | ✔
`text-align.scss` | ✔ | ✔
`visibility.scss` | ✔ | ✔
`align-middle.scss` | ✔
`arrow.scss` | ✔
`badge.scss` | ✔
`button.scss` | ✔
`code.scss` | ✔
`divider.scss` | ✔
`input.scss` | ✔
`kbd.scss` | ✔
`nav.scss` | ✔
`resize.scss` | ✔
`slide.scss` | ✔
`table.scss` | ✔
`underline.scss` | ✔
Minified size  | 38 kB | 15.6 kB
Gziped size | 7.6 kB | 3.8 kB

For production use CDN:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/victory-basic.css@0.2.1/dist/victory.min.css">
<script src="https://cdn.jsdelivr.net/npm/victory.css@0.2.1/dist/victory-basic.min.js></script>
```

Or download from:

- https://raw.githubusercontent.com/brcontainer/victory-basic.css/0.2.1/dist/victory.min.css
- https://raw.githubusercontent.com/brcontainer/victory-basic.css/0.2.1/dist/victory.min.js

then use in your project put like this:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0">
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
