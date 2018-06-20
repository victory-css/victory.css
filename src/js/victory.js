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
