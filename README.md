Victory.css is a simply and lightweight front-end framework for developing fast.

> **Note:** under development

## Download

For production download from:

- https://raw.githubusercontent.com/brcontainer/victory.css/master/dist/victory.min.css
- https://raw.githubusercontent.com/brcontainer/victory.css/master/dist/victory.min.js

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

> **Note:** Victory.css has some fallbacks for browsers without media-queries, such as *Internet Explorer 8*, preventing your site from breaking into some older browsers.

## Slim vs Standard

Slim version is more lightweight but don't support old browsers, in Slim version is required native from browser:

- `Element.matches`
- `Element.closest`
- Only uses CSS3 syntax to `::before` and `::after` pseudo elements
- Removed fallback for IE8

With the standard version you will be able to support users accessing your site from an older mobile phone or older browser.

The standard version weighs a little more (8KB or 1KB more), which is not much.

The slim version is best recommended for indoor environments where you will be sure that only modern equipment will be used, for production download from:

- https://raw.githubusercontent.com/brcontainer/victory.css/master/dist/victory-slim.min.css
- https://raw.githubusercontent.com/brcontainer/victory.css/master/dist/victory-slim.min.js

then use in your project put like this:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0">
<link rel="stylesheet" type="text/css" href="victory-slim.min.css">
<script src="victory-slim.min.js"></script>
```

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
`gulp noslim` | Deploy without create slim version, auto-execute follow commands `mergecss`, `prefix`, `mincss`, `mergejs`, `minjs`
`gulp` | Full deploy, auto-execute follow commands `mergecss`, `prefix`, `mincss`, `mergejs`, `minjs`, `slim:mergecss`, `slim:mincss`, `slim:mergejs` and `slim:minjs` in sequence

## Slim commands

Command | Description
---|---
`gulp slim:mergecss` | For create only `victory.css` without create prefixes and without min version
`gulp slim:mincss` | For create min version from `victory-slim.css`
`gulp slim:mergejs` | For create only `victory-slim.js` without min version
`gulp slim:minjs` | For create min version from `victory-slim.js`
`gulp slim` | Slim deploy, auto-execute follow commands `slim:mergecss`, `slim:mincss`, `slim:mergejs` and `slim:minjs` in sequence


[1]: https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[2]: https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[3]: https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png
[4]: https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png
[5]: https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png
[6]: https://raw.github.com/alrra/browser-logos/master/src/archive/edge_12-18/edge_12-18_48x48.png
[7]: https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png
[8]: https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png
