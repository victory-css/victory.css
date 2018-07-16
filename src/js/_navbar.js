(function (d, w, u) {
    var selector = '.v-navbar-items.v-navbar-';

    d.addEventListener('click', function (e) {
        var target = e.target;

        if (
            target.matches('.v-navbar .v-navbar-toggle') ||
            target.matches('.v-navbar .v-navbar-toggle *')
        ) {
            w.Victory.classList.toggle(target.closest(".v-navbar"), 'v-navbar-toggled');
        } else if (
            target.matches(selector + 'ltr') ||
            target.matches(selector + 'rtl')
        ) {
            w.Victory.classList.remove(target.closest(".v-navbar"), 'v-navbar-toggled');
        }
    });

    w.addEventListener('resize', function (e) {
        var navbars = d.querySelectorAll(".v-navbar");
        
        for (var i = navbars.length - 1; i >= 0; i--) {
            w.Victory.classList.remove(navbars[i], 'v-navbar-toggled');
        }
    });
})(document, window);
