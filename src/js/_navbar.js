(function (d, w) {
    var selector = '.v-navbar-items.v-navbar-',
        wh = w.innerHeight,
        ww = w.innerWidth,
        Victory = w.Victory;

    Victory.addEvent(d, 'click', function (e) {
        var target = e.target || e.srcElement;

        if (!target) return;

        if (target.matches('.v-navbar .v-navbar-toggle,.v-navbar .v-navbar-toggle *')) {
            Victory.classList.toggle(target.closest('.v-navbar'), 'v-navbar-toggled');
        } else if (target.matches(selector + 'ltr,' + selector + 'rtl')) {
            Victory.classList.remove(target.closest('.v-navbar'), 'v-navbar-toggled');
        }

        e.preventDefault();
    });

    Victory.addEvent(w, 'resize', function (e) {
        if (ww !== w.innerWidth && wh !== w.innerHeight) {
            var navbars = d.querySelectorAll('.v-navbar');
            
            for (var i = navbars.length - 1; i >= 0; i--) {
                Victory.classList.remove(navbars[i], 'v-navbar-toggled');
            }
        }

        ww = w.innerWidth;
        wh = w.innerHeight;
    });
})(document, window);
