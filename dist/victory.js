/*
 * Victory.css 0.0.1
 * Copyright (c) 2018 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 * 
 * https://github.com/brcontainer/Victory.css
 */

(function (w, d) {
    if (w.Victory) return;

    w.Victory = {
        'toggle': function (el, className) {
            if (!el) return;

            var cls = className.replace(/([[\]\\.{}\-])/gi, '\\$1');

            cre = new RegExp('\\b' + cls + '\\b', 'g');

            if (cre.test(el.className)) {
                el.className = el.className.replace(cre, ' ').replace(/\s+/g, '');
            } else {
                el.className += " " + className;
            }
        }
    };
})(window, document);

(function (d, w, u) {
    var selector = '.v-navbar-items.v-navbar-';

    d.addEventListener('click', function (e) {
        var target = e.target;

        console.log(e.target.className);

        if (target.matches('.v-navbar .v-navbar-toggle')) {
            w.Victory.toggle(target, 'v-drop');
        } else if (target.matches('.v-navbar .v-navbar-toggle *')) {
            w.Victory.toggle(target.closest(".v-navbar-toggle"), 'v-drop');
        } else if (target.matches(selector + 'ltr') || target.matches(selector + 'rtl')) {
            var navbar = e.target.closest(".v-navbar");

            w.Victory.toggle(navbar.querySelector('.v-navbar-toggle'), 'v-drop');
        }
    });
})(document, window);

if (window.Element && window.Element.prototype) {
    var elproto = window.Element.prototype;

    if (!elproto.matches) {
        elproto.matches =
        elproto.matchesSelector ||
        elproto.mozMatchesSelector ||
        elproto.msMatchesSelector ||
        elproto.oMatchesSelector ||
        elproto.webkitMatchesSelector ||
        function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;

            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1; 
        };
    }

    if (!elproto.closest) {
        elproto.closest = function (s) {
            var el = this;

            if (!document.documentElement.contains(el)) return null;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);

            return null;
        };
    }
}
