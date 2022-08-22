(window.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1)),
        window.isMobile && k.classList.add("is-mobile"),
        (window.isIE = !!window.MSInputMethodContext && !!document.documentMode),
        window.isIE && k.classList.add("is-ie"),
        (window.onload = function (t) {
            var e = document.getElementById("eidos-theme-app-css");
            e &&
                (e.isLoaded
                    ? de()
                    : e.addEventListener("load", function (t) {
                          de();
                      }));
        });