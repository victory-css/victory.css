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
