(function (w, d) {
    if (w.Victory) return;

    function checkClass(el, className)
    {
        if (!el) return false;

        var cls = className.replace(/([[\]\\.{}\-])/gi, '\\$1');

        return new RegExp('\\b' + cls + '\\b', 'g');
    }

    w.Victory = {
        'classList': {
            'toggle': function (el, className) {
                if (!el) return;

                var cre = checkClass(el, className);

                if (!cre) return;

                if (cre.test(el.className)) {
                    el.className = el.className.replace(cre, ' ').replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
                } else {
                    el.className += ' ' + className;
                }
            },
            'add': function (el, className) {
                var cre = checkClass(el, className);

                if (cre && cre.test(el.className) === false) {
                    el.className += ' ' + className;
                }
            },
            'remove': function (el, className) {
                var cre = checkClass(el, className);
 
                if (cre !== false) el.className = el.className.replace(cre, ' ').replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
            }
        },
        'addEvent': function (target, type, callback) {
            if (target.addEventListener) {
                target.addEventListener(type, callback);
            } else if (target.attachEvent) {
                target.attachEvent('on' + type, callback);
            }
        },
        'removeEvent': function (target, type, callback) {
            if (target.removeEventListener) {
                target.addEventListener(type, callback);
            } else if (target.detachEvent) {
                target.detachEvent('on' + type, callback);
            }
        }
    };
})(window, document);
