m(i, [
    {
        key: "init",
        value: function () {
            var t = this;
            window.isMobile ||
                ((this.hasMoved = !1),
                (this.mouse = { x: 0, y: 0, lerpedX: 0, lerpedY: 0 }),
                this.animate(),
                (this.bindMousemove = this.mousemove.bind(this)),
                window.addEventListener("mousemove", this.bindMousemove),
                (this.bindEnter = this.hover.bind(this)),
                (this.bindLeave = this.leave.bind(this)),
                (this.hoverElements = document.querySelectorAll("a, button, .js-hover, .js-hover-video")),
                this.hoverElements.forEach(function (e) {
                    e.addEventListener("mouseenter", t.bindEnter), e.addEventListener("mouseleave", t.bindLeave);
                }));
        },
    },
    {
        key: "animate",
        value: function () {
            var t = this;
            (this.raf = requestAnimationFrame(function () {
                return t.animate();
            })),
                (this.mouse.lerpedX = E(this.mouse.lerpedX, this.mouse.x, 0.2)),
                (this.mouse.lerpedY = E(this.mouse.lerpedY, this.mouse.y, 0.2)),
                A(this.el, "translate3d(".concat(this.mouse.lerpedX, "px,").concat(this.mouse.lerpedY, "px,0)"));
        },
    },
    {
        key: "mousemove",
        value: function (t) {
            this.hasMoved || ((this.hasMoved = !0), this.el.classList.add("has-moved")), (this.mouse.x = t.clientX), (this.mouse.y = t.clientY);
        },
    },
    {
        key: "hover",
        value: function (t) {
            t.currentTarget.classList.contains("js-hover-video") && this.el.classList.add("has-hover-video"), this.el.classList.add("has-hover");
        },
    },
    {
        key: "leave",
        value: function (t) {
            t.currentTarget.classList.contains("js-hover-video") && this.el.classList.remove("has-hover-video"), this.el.classList.remove("has-hover");
        },
    },
    {
        key: "destroy",
        value: function () {
            var t = this;
            window.isMobile ||
                (window.removeEventListener("mousemove", this.bindmousemove),
                this.hoverElements.forEach(function (e) {
                    e.removeEventListener("mouseenter", t.bindEnter), e.removeEventListener("mouseleave", t.bindLeave);
                }),
                cancelAnimationFrame(this.raf));
        },
    },
]),