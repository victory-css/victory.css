/*
 * victory.css 0.4.0
 * Copyright (c) 2020 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 * 
 * https://github.com/brcontainer/victory.css
 */

(function (w, d) {
    var tags = [
        //none
        'audio', 'dialog', 'datalist', 'template',

        //inline
        'abbr', 'bdi', 'data', 'mark', 'math', 'output', 'picture', 'source', 'time', 'track',

        //inline-block
        'canvas', 'meter', 'progress', 'video', 'svg',

        //block
        'article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'main', 'nav', 'section', 'summary'
    ];

    /* Fallback for HTML5 tags in IE8 */
    for (var i = tags.length - 1; i >= 0; i--) {
        d.createElement(tags[i]);
    }

    if (w.Element && w.Element.prototype) {
        var elproto = w.Element.prototype;

        /* Polyfill for Element.matches() in old browsers  */
        if (!elproto.matches) {
            elproto.matches =
            elproto.matchesSelector ||
            elproto.mozMatchesSelector ||
            elproto.msMatchesSelector ||
            elproto.oMatchesSelector ||
            elproto.webkitMatchesSelector ||
            function (s) {
                var el = this,
                    matches = (el.document || el.ownerDocument).querySelectorAll(s),
                    i = matches.length;

                while (--i >= 0 && matches.item(i) !== el) {}
                return i > -1; 
            };
        }

        /* Polyfill for Element.closest() in old browsers */
        if (!elproto.closest) {
            elproto.closest = function (s) {
                var el = this;

                if (!(el.document || el.ownerDocument).documentElement.contains(el)) return null;

                do {
                    if (el.matches(s)) return el;
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);

                return null;
            };
        }
    }
})(window, document);
