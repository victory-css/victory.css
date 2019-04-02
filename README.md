Victory.css is a simply and lightweight front-end framework for developing fast.

> **Note:** under development

## Download

For production download from:

- https://raw.githubusercontent.com/brcontainer/victory.css/master/dist/victory.min.css
- https://raw.githubusercontent.com/brcontainer/victory.css/master/dist/victory.min.js

To contribute or modify download using git (require `npm`):

```
git clone https://github.com/inphinit/Victory.css.git [project_name]
cd [project_name]
npm update
```

After changes files in `./src` folder execute this command for deploy:

```
gulp
```

For create only `victory.css` without create prefixes and without min version, execute:

```
gulp mergecss
```

For put prefix properties in `victory.css` execute:

```
gulp prefix
```

For create min version from `victory.css` execute:

```
gulp mincss
```

For create only `victory.js` without min version, execute:

```
gulp mergejs
```

For create min version from `victory.js` execute:

```
gulp minjs
```

## Deploying Slim version

For create only `victory.css` without create prefixes and without min version, execute:

```
gulp slim-mergecss
```

For create min version from `victory-slim.css` execute:

```
gulp slim-mincss
```

For create only `victory-slim.js` without min version, execute:

```
gulp slim-mergejs
```

For create min version from `victory-slim.js` execute:

```
gulp slim-minjs
```

## Using

For use in your project copy `victory.min.css` and `victory.min.js` and put like this:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0">
<link rel="stylesheet" type="text/css" href="victory.min.css">
<script src="victory.min.js"></script>
```

## Browser Support

![Chrome][1] | ![Firefox][2] | ![Safari][3] | ![Opera][4] | ![Edge][5] | ![IE9+][6] | ![IE8][7]
--- | --- | --- | --- | --- | --- | ---
Latest ✔ | Latest ✔ | 8+ ✔ | Latest ✔ | Latest ✔ | 9+ ✔ | 8 (partial)

> **Note:** Victory.css has some fallbacks for browsers without media-queries, such as *Internet Explorer 8*, preventing your site from breaking into some older browsers.

[1]: https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[2]: https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[3]: https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png
[4]: https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png
[5]: https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png
[6]: https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png
[7]: https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png
