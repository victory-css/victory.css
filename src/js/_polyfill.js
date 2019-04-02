(function (w, d) {
    var tags = [
        'nav', 'main', 'section', 'article', 'aside', 'header', 'footer',
        'video', 'audio', 'figure', 'figcaption', 'summary', 'details', 'hgroup',
        'mark', 'bdi', 'source', 'canvas', 'svg', 'math', 'keygen', 'output', 'progress', 'meter'
    ];

    for (var i = tags.length - 1; i >= 0; i--) {
        d.createElement(tags[i]);
    }

    if (w.Element && w.Element.prototype) {
        var elproto = w.Element.prototype;

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
