!(function () {
    "use strict";
    function t(e) {
        return (t =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  })(e);
    }
    function e(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
        }
    }
    function n(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t;
    }
    function s(t, e, i) {
        return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = i), t;
    }
    function o(t, e) {
        return (
            (function (t) {
                if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var i = [],
                    n = !0,
                    s = !1,
                    o = void 0;
                try {
                    for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); n = !0);
                } catch (t) {
                    (s = !0), (o = t);
                } finally {
                    try {
                        n || null == a.return || a.return();
                    } finally {
                        if (s) throw o;
                    }
                }
                return i;
            })(t, e) ||
            a(t, e) ||
            (function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function r(t) {
        return (
            (function (t) {
                if (Array.isArray(t)) return l(t);
            })(t) ||
            (function (t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
            })(t) ||
            a(t) ||
            (function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function a(t, e) {
        if (t) {
            if ("string" == typeof t) return l(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? l(t, e) : void 0;
        }
    }
    function l(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
        return n;
    }
    var c = (function () {
            function i(t) {
                e(this, i), (this.mAttr = "data-" + t.dataName), (this.mCaptureEvents = ["mouseenter", "mouseleave"]), (this.el = t.el);
            }
            return (
                n(i, [
                    {
                        key: "mInit",
                        value: function (t) {
                            var e = this;
                            (this.modules = t),
                                (this.mCheckEventTarget = this.mCheckEventTarget.bind(this)),
                                this.events &&
                                    Object.keys(this.events).forEach(function (t) {
                                        return e.mAddEvent(t);
                                    });
                        },
                    },
                    {
                        key: "mUpdate",
                        value: function (t) {
                            this.modules = t;
                        },
                    },
                    {
                        key: "mDestroy",
                        value: function () {
                            var t = this;
                            this.events &&
                                Object.keys(this.events).forEach(function (e) {
                                    return t.mRemoveEvent(e);
                                });
                        },
                    },
                    {
                        key: "mAddEvent",
                        value: function (t) {
                            var e = !!this.mCaptureEvents.includes(t);
                            this.el.addEventListener(t, this.mCheckEventTarget, e);
                        },
                    },
                    {
                        key: "mRemoveEvent",
                        value: function (t) {
                            var e = !!this.mCaptureEvents.includes(t);
                            this.el.removeEventListener(t, this.mCheckEventTarget, e);
                        },
                    },
                    {
                        key: "mCheckEventTarget",
                        value: function (t) {
                            var e = this.events[t.type];
                            if ("string" == typeof e) this[e](t);
                            else {
                                var i = "[" + this.mAttr + "]",
                                    n = t.target;
                                if (this.mCaptureEvents.includes(t.type)) n.matches(i) && this.mCallEventMethod(t, e, n);
                                else for (; n && n !== document && (!n.matches(i) || "undefined" == this.mCallEventMethod(t, e, n)); ) n = n.parentNode;
                            }
                        },
                    },
                    {
                        key: "mCallEventMethod",
                        value: function (t, e, i) {
                            var n = i.getAttribute(this.mAttr);
                            if (e.hasOwnProperty(n)) {
                                var s = e[n];
                                t.hasOwnProperty("currentTarget") || Object.defineProperty(t, "currentTarget", { value: i }), t.hasOwnProperty("curTarget") || Object.defineProperty(t, "curTarget", { value: i }), this[s](t);
                            }
                        },
                    },
                    {
                        key: "$",
                        value: function (e, i) {
                            var n = [e.indexOf("."), e.indexOf("#"), e.indexOf("[")].filter(function (t) {
                                    return -1 != t;
                                }),
                                s = !1,
                                o = e,
                                a = "",
                                l = this.el;
                            return n.length && ((s = Math.min.apply(Math, r(n))), (o = e.slice(0, s)), (a = e.slice(s))), "object" == t(i) && (l = i), l.querySelectorAll("[" + this.mAttr + "=" + o + "]" + a);
                        },
                    },
                    {
                        key: "parent",
                        value: function (t, e) {
                            for (var i = "[" + this.mAttr + "=" + t + "]", n = e.parentNode; n && n !== document; ) {
                                if (n.matches(i)) return n;
                                n = n.parentNode;
                            }
                        },
                    },
                    {
                        key: "getData",
                        value: function (t, e) {
                            return (e || this.el).getAttribute(this.mAttr + "-" + t);
                        },
                    },
                    {
                        key: "setData",
                        value: function (t, e, i) {
                            return (i || this.el).setAttribute(this.mAttr + "-" + t, e);
                        },
                    },
                    {
                        key: "call",
                        value: function (t, e, i, n) {
                            var s = this;
                            e && !i && ((i = e), (e = !1)),
                                this.modules[i] &&
                                    (n
                                        ? this.modules[i][n] && this.modules[i][n][t](e)
                                        : Object.keys(this.modules[i]).forEach(function (n) {
                                              s.modules[i][n][t](e);
                                          }));
                        },
                    },
                    {
                        key: "on",
                        value: function (t, e, i, n) {
                            var s = this;
                            this.modules[e] &&
                                (n
                                    ? this.modules[e][n].el.addEventListener(t, function (t) {
                                          return i(t);
                                      })
                                    : Object.keys(this.modules[e]).forEach(function (n) {
                                          s.modules[e][n].el.addEventListener(t, function (t) {
                                              return i(t);
                                          });
                                      }));
                        },
                    },
                    { key: "init", value: function () {} },
                    { key: "destroy", value: function () {} },
                ]),
                i
            );
        })(),
        h = (function () {
            function t(i) {
                e(this, t), this.app, (this.modules = i.modules), (this.currentModules = {}), (this.activeModules = {}), (this.newModules = {}), (this.moduleId = 0);
            }
            return (
                n(t, [
                    {
                        key: "init",
                        value: function (t, e) {
                            var i = this,
                                n = (e || document).querySelectorAll("*");
                            t && !this.app && (this.app = t),
                                (this.activeModules.app = { app: this.app }),
                                n.forEach(function (t) {
                                    Array.from(t.attributes).forEach(function (n) {
                                        if (n.name.startsWith("data-module")) {
                                            var s = !1,
                                                o = n.name.split("-").splice(2),
                                                r = i.toCamel(o);
                                            if ((i.modules[r] ? (s = !0) : i.modules[i.toUpper(r)] && ((r = i.toUpper(r)), (s = !0)), s)) {
                                                var a = { el: t, name: r, dataName: o.join("-") },
                                                    l = new i.modules[r](a),
                                                    c = n.value;
                                                c || (i.moduleId++, (c = "m" + i.moduleId), t.setAttribute(n.name, c)), i.addActiveModule(r, c, l);
                                                var h = r + "-" + c;
                                                e ? (i.newModules[h] = l) : (i.currentModules[h] = l);
                                            }
                                        }
                                    });
                                }),
                                Object.entries(this.currentModules).forEach(function (t) {
                                    var n = o(t, 2),
                                        s = n[0],
                                        r = n[1];
                                    if (e) {
                                        var a = s.split("-"),
                                            l = a.shift(),
                                            c = a.pop();
                                        i.addActiveModule(l, c, r);
                                    } else i.initModule(r);
                                });
                        },
                    },
                    {
                        key: "initModule",
                        value: function (t) {
                            t.mInit(this.activeModules), t.init();
                        },
                    },
                    {
                        key: "addActiveModule",
                        value: function (t, e, i) {
                            this.activeModules[t] ? Object.assign(this.activeModules[t], s({}, e, i)) : (this.activeModules[t] = s({}, e, i));
                        },
                    },
                    {
                        key: "update",
                        value: function (t) {
                            var e = this;
                            this.init(this.app, t),
                                Object.entries(this.currentModules).forEach(function (t) {
                                    var i = o(t, 2);
                                    i[0];
                                    i[1].mUpdate(e.activeModules);
                                }),
                                Object.entries(this.newModules).forEach(function (t) {
                                    var i = o(t, 2),
                                        n = (i[0], i[1]);
                                    e.initModule(n);
                                }),
                                Object.assign(this.currentModules, this.newModules);
                        },
                    },
                    {
                        key: "destroy",
                        value: function (t) {
                            t ? this.destroyScope(t) : this.destroyModules();
                        },
                    },
                    {
                        key: "destroyScope",
                        value: function (t) {
                            var e = this;
                            t.querySelectorAll("*").forEach(function (t) {
                                Array.from(t.attributes).forEach(function (t) {
                                    if (t.name.startsWith("data-module")) {
                                        var i = t.value,
                                            n = t.name.split("-").splice(2),
                                            s = e.toCamel(n) + "-" + i,
                                            o = !1;
                                        e.currentModules[s] ? (o = !0) : e.currentModules[e.toUpper(s)] && ((s = e.toUpper(s)), (o = !0)), o && (e.destroyModule(e.currentModules[s]), delete e.currentModules[s]);
                                    }
                                });
                            }),
                                (this.activeModules = {}),
                                (this.newModules = {});
                        },
                    },
                    {
                        key: "destroyModules",
                        value: function () {
                            var t = this;
                            Object.entries(this.currentModules).forEach(function (e) {
                                var i = o(e, 2),
                                    n = (i[0], i[1]);
                                t.destroyModule(n);
                            }),
                                (this.currentModules = []);
                        },
                    },
                    {
                        key: "destroyModule",
                        value: function (t) {
                            t.mDestroy(), t.destroy();
                        },
                    },
                    {
                        key: "toCamel",
                        value: function (t) {
                            var e = this;
                            return t.reduce(function (t, i) {
                                return t + e.toUpper(i);
                            });
                        },
                    },
                    {
                        key: "toUpper",
                        value: function (t) {
                            return t.charAt(0).toUpperCase() + t.slice(1);
                        },
                    },
                ]),
                t
            );
        })();
    function u(t) {
        return (u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  })(t);
    }
    function d(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function f(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
        }
    }
    function m(t, e, i) {
        return e && f(t.prototype, e), i && f(t, i), t;
    }
    function p(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })), e && y(t, e);
    }
    function v(t) {
        return (v = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
    }
    function y(t, e) {
        return (y =
            Object.setPrototypeOf ||
            function (t, e) {
                return (t.__proto__ = e), t;
            })(t, e);
    }
    function g(t, e) {
        return !e || ("object" != typeof e && "function" != typeof e)
            ? (function (t) {
                  if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return t;
              })(t)
            : e;
    }
    function w(t) {
        var e = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
            } catch (t) {
                return !1;
            }
        })();
        return function () {
            var i,
                n = v(t);
            if (e) {
                var s = v(this).constructor;
                i = Reflect.construct(n, arguments, s);
            } else i = n.apply(this, arguments);
            return g(this, i);
        };
    }
    function b(t, e, i) {
        return (b =
            "undefined" != typeof Reflect && Reflect.get
                ? Reflect.get
                : function (t, e, i) {
                      var n = (function (t, e) {
                          for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = v(t)); );
                          return t;
                      })(t, e);
                      if (n) {
                          var s = Object.getOwnPropertyDescriptor(n, e);
                          return s.get ? s.get.call(i) : s.value;
                      }
                  })(t, e, i || t);
    }
    var k = document.documentElement,
        x = document.body,
        S = k.hasAttribute("data-debug"),
        C = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return d(this, i), ((n = e.call(this, t)).events = { click: { toggler: "toggle" } }), n;
            }
            return (
                m(i, [
                    { key: "init", value: function () {} },
                    {
                        key: "toggle",
                        value: function (t) {
                            var e = t.curTarget,
                                i = this.parent("item", e);
                            i.classList.contains("is-open") ? this.close() : (this.close(), this.open(i));
                        },
                    },
                    {
                        key: "open",
                        value: function (t) {
                            var e = this,
                                i = this.$("content", t)[0];
                            t.classList.add("is-open"),
                                gsap.to(i, {
                                    duration: 0,
                                    height: this.compute(this.$("inner", t)[0]).height,
                                    onComplete: function () {
                                        k.classList.contains("has-scroll-smooth"),
                                            setTimeout(function () {
                                                e.call("scrollTo", { target: t, options: { speed: 0.2, disableLerp: !0 } }, "Scroll"), e.call("update", "Scroll");
                                            }, 600);
                                    },
                                });
                        },
                    },
                    {
                        key: "close",
                        value: function () {
                            var t = this;
                            this.$("item").forEach(function (e) {
                                e.classList.remove("is-open");
                                var i = t.$("content", e)[0];
                                i &&
                                    gsap.to(i, 0, {
                                        height: 0,
                                        onComplete: function () {
                                            setTimeout(function () {
                                                t.call("update", "Scroll");
                                            }, 600);
                                        },
                                    });
                            });
                        },
                    },
                    {
                        key: "compute",
                        value: function (t) {
                            return t.getBoundingClientRect();
                        },
                    },
                ]),
                i
            );
        })(c);
    function E(t, e, i) {
        return (1 - i) * t + i * e;
    }
    function A(t, e) {
        (t.style.webkitTransform = e), (t.style.msTransform = e), (t.style.transform = e);
    }
    var T = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                return d(this, i), e.call(this, t);
            }
            return (
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
                i
            );
        })(c),
        L = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return d(this, i), ((n = e.call(this, t)).events = { change: "onFormChange", reset: "onFormReset" }), window.wpcf7 && Object.assign(n.events, { wpcf7beforesubmit: "onFormBeforeSubmit", wpcf7submit: "onFormAfterSubmit" }), n;
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            var t = this;
                            (this.form = this.el.querySelector(".wpcf7-form")),
                                (this.active = !1),
                                (this.attempt = 0),
                                (this.poller = null),
                                this.isReady()
                                    ? this.initForm()
                                    : (this.poller = window.setInterval(function () {
                                          if ((t.attempt++, 50 === t.attempt)) return S && console.warn("[Form.init] WPCF7 is unavailable"), clearInterval(t.poller), void (t.active = !1);
                                          t.isReady() && ((t.active = !0), clearInterval(t.poller), t.initForm());
                                      }, 100));
                        },
                    },
                    {
                        key: "initForm",
                        value: function () {
                            if (this.isReady()) {
                                if (!this.form.dataset.wpcf7 && !this.form.querySelector(".ajax-loader")) {
                                    var t = window.jQuery(this.form);
                                    window.wpcf7.initForm(t), window.jQuery && window.wpcf7cf && window.wpcf7cf.initForm(t);
                                }
                            } else S && console.warn("[Form.initForm] WPCF7 is unavailable");
                        },
                    },
                    {
                        key: "isReady",
                        value: function () {
                            return window.jQuery && window.wpcf7 && window.wpcf7.supportHtml5;
                        },
                    },
                    {
                        key: "updateInputFileLabel",
                        value: function (t) {
                            var e = this.el.querySelector('.c-form_value[for="' + t.id + '"]');
                            if (e) {
                                e.hasAttribute("data-initial-text") || e.setAttribute("data-initial-text", e.innerText);
                                var i = t.value.replace("C:\\fakepath\\", "");
                                e.innerText = i || e.getAttribute("data-initial-text");
                            }
                        },
                    },
                    {
                        key: "updateScroll",
                        value: function (t) {
                            var e = this;
                            requestAnimationFrame(function () {
                                "clear" !== t && e.call("scrollTo", { target: e.el }, "Scroll"), e.call("update", null, "Scroll");
                            });
                        },
                    },
                    {
                        key: "onFormChange",
                        value: function (t) {
                            "file" === t.target.type && this.updateInputFileLabel(t.target);
                        },
                    },
                    {
                        key: "onFormReset",
                        value: function (t) {
                            var e = this;
                            this.form.querySelectorAll('[type="file"]').forEach(function (t) {
                                return e.updateInputFileLabel(t);
                            });
                        },
                    },
                    {
                        key: "onFormBeforeSubmit",
                        value: function (t) {
                            var e = window.wpcf7;
                            e && (e.setStatus(this.form, "busy"), e.toggleSubmit(this.form, !1));
                        },
                    },
                    {
                        key: "onFormAfterSubmit",
                        value: function (t) {
                            var e = this,
                                i = window.wpcf7;
                            i && i.toggleSubmit(this.form),
                                setTimeout(function () {
                                    e.updateScroll();
                                }, 1e3);
                        },
                    },
                ]),
                i
            );
        })(c);
    function M(t, e, i) {
        return (1 - i) * t + i * e;
    }
    function O() {
        for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, e = 256, i = e - 1, n = t, s = 0.02, o = [], r = 0; r < e; ++r) o.push(Math.random());
        var a = function (t) {
                var e = t * s,
                    r = Math.floor(e),
                    a = e - r,
                    c = a * a * (3 - 2 * a),
                    h = r % i,
                    u = (h + 1) % i;
                return l(o[h], o[u], c) * n;
            },
            l = function (t, e, i) {
                return t * (1 - i) + e * i;
            };
        return {
            getVal: a,
            setAmplitude: function (t) {
                n = t;
            },
            setScale: function (t) {
                s = t;
            },
        };
    }
    var R = "is-loading",
        B = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return (
                    d(this, i),
                    ((n = e.call(this, t)).isMobile = window.isMobile),
                    window.isIE
                        ? g(n)
                        : (window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", function () {
                              n.isMobile = !0;
                          }),
                          n.el.classList.add(R),
                          (n.maskSrc = n.getData("mask-src")),
                          (n.gap = n.getData("gap")),
                          (n.windowWidth = window.innerWidth),
                          (n.windowHeight = window.innerHeight),
                          (n.BCR = n.el.getBoundingClientRect()),
                          (n.planeBCR = { width: 1, height: 1, x: 0, y: 0 }),
                          (n.inView = !0),
                          (n.isLoaded = !1),
                          (n.isRenderable = !0),
                          (n.maskPosition = new Vec2(1, 0)),
                          (n.mouse = new Vec2(-0.5, -0.5)),
                          (n.now = 0),
                          (n.settings = { factor: 0, factorAim: n.getData("factor"), speed: 0 }),
                          (n.$wrap = null),
                          (n.$media = null),
                          n)
                );
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            window.isIE ||
                                ((this.$wrap = this.$("wrap")[0]),
                                this.$wrap
                                    ? ((this.$media = this.$("media")[0]),
                                      this.$media
                                          ? ((this.renderer = new Renderer({ dpr: 1, antialias: !0, premultiplyAlpha: !1, alpha: !0 })),
                                            this.renderer.setSize(this.BCR.width, this.BCR.height),
                                            (this.gl = this.renderer.gl),
                                            this.gl.clearColor(247 / 255, 245 / 255, 248 / 255, 1),
                                            this.$wrap.appendChild(this.gl.canvas),
                                            this.isMobile,
                                            this.initScene(),
                                            this.initCamera(),
                                            this.initShape(),
                                            (this.scrollBind = this.scroll.bind(this)),
                                            document.addEventListener("scroll", this.scrollBind),
                                            (this.resizeBind = this.resize.bind(this)),
                                            window.addEventListener("resize", this.resizeBind),
                                            (this.mousemoveBind = this.mousemove.bind(this)),
                                            window.addEventListener("mousemove", this.mousemoveBind))
                                          : S && console.debug("GLImage.init:", "Skipping module. Missing media."))
                                    : S && console.debug("GLImage.init:", "Skipping module. Missing wrapper."));
                        },
                    },
                    {
                        key: "trigger",
                        value: function (t) {
                            window.isIE || (cancelAnimationFrame(this.raf), "enter" === t.way ? (this.render(this.now), (this.isRenderable = !0)) : ((this.isRenderable = !1), gsap.to(this.settings, 0.6, { speed: 0 })));
                        },
                    },
                    {
                        key: "initScene",
                        value: function () {
                            this.scene = new Transform();
                        },
                    },
                    {
                        key: "initCamera",
                        value: function () {
                            (this.fov = 75), (this.camera = new Camera(this.glElement, { fov: this.fov })), this.camera.position.set(0, 0, 1);
                        },
                    },
                    {
                        key: "initShape",
                        value: function () {
                            var t = this;
                            (this.geometry = new Plane(this.gl, { width: 1, height: 1, widthSegments: 10, heightSegments: 10 })), (this.texture = new Texture(this.gl, { minFilter: this.gl.LINEAR }));
                            var e = new Texture(this.gl, { minFilter: this.gl.LINEAR }),
                                i = new Image();
                            (i.src = this.maskSrc),
                                (i.onload = function () {
                                    (e.image = i),
                                        t.$media instanceof HTMLVideoElement && (t.$media.load(), t.$media.play()),
                                        (t.program = new Program(t.gl, {
                                            vertex:
                                                "\n    precision highp float;\n    precision highp int;\n    attribute vec2 uv;\n    attribute vec3 position;\n    attribute vec3 normal;\n    uniform mat4 modelViewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat3 normalMatrix;\n\n    uniform sampler2D maskTexture;\n    uniform float speed;\n    uniform float scale;\n    uniform vec2 maskPosition;\n    varying vec2 maskUv;\n    varying vec2 vUv;\n    varying vec3 vNormal;\n\n    varying vec3 newPosition;\n    varying vec4 maskColor;\n\n    void main() {\n\n        // vNormal = normalize(normalMatrix * normal);\n\n        vUv = uv;\n\n        newPosition = vec3(position.x , position.y , position.z);\n\n        maskUv = uv + maskPosition;\n\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);\n    }\n",
                                            fragment:
                                                "\n    precision highp float;\n    precision highp int;\n    uniform sampler2D texture;\n    uniform sampler2D maskTexture;\n    uniform float speed;\n\n    varying vec2 vUv;\n    varying vec3 vNormal;\n    varying vec3 newPosition;\n    uniform vec2 maskPosition;\n    varying vec2 maskUv;\n\n    void main() {\n\n        vec3 normal = normalize(vNormal);\n        vec4 textureColor = texture2D(texture, vUv);\n        // vec4 maskColor = texture2D(maskTexture, maskUv);\n\n        // textureColor.a = maskColor.r;\n\n        gl_FragColor.rgb = textureColor.rgb;\n\n        float distord = 0.2;\n        float intensity = - speed * 8.;\n        float distordLeft = distord + ((vUv.y * 2.) * (-intensity * (maskPosition.y - 0.5)));\n        float distordRight = distord + ((vUv.y * 2.) * (intensity * (maskPosition.y - 0.5)));\n\n        // Cool bubbly/curvy effect\n        //float distordLeft = distord + (sin((vUv.y + maskPosition.y - 0.5) * 3.14) * (intensity));\n        //float distordRight = distord + (sin((vUv.y + maskPosition.y - 0.5) * 3.14) * (- intensity));\n\n        float maskLeft = 1. - smoothstep(vUv.x - 0.001, vUv.x + 0.001, (maskPosition.x - distordLeft) < 1.0 - (distordLeft * 2.0) ? maskPosition.x - distordLeft : 1.0 - (distordLeft * 2.0));\n        float maskRight = smoothstep(vUv.x - 0.001, vUv.x + 0.001, (maskPosition.x + distordRight) > (distordRight * 2.0) ? maskPosition.x + distordRight : distordRight * 2.0 );\n\n        float mask = min(maskLeft, maskRight);\n\n        gl_FragColor.a = max(mask,-.1);\n\n        // FOR IOS LOOOOOL\n        gl_FragColor.rgb *= gl_FragColor.a;\n\n    }\n",
                                            uniforms: { maskTexture: { value: e }, maskPosition: { value: new Vec2(1, 0) }, texture: { value: t.texture }, speed: { value: t.settings.speed } },
                                        })),
                                        (t.mesh = new Mesh(t.gl, { geometry: t.geometry, program: t.program })),
                                        t.updateSize(),
                                        (t.isLoaded = !0),
                                        t.el.classList.remove(R),
                                        setTimeout(function () {
                                            t.resize();
                                        }, 1e3),
                                        t.isMobile;
                                });
                        },
                    },
                    {
                        key: "calculateUnitSize",
                        value: function (t) {
                            var e = (this.fov * Math.PI) / 180,
                                i = 2 * Math.tan(e / 2) * t;
                            return { width: i * this.camera.aspect, height: i };
                        },
                    },
                    {
                        key: "updateSize",
                        value: function () {
                            (this.camUnit = this.calculateUnitSize(this.camera.position.z)),
                                (this.planeBCR.width = this.camUnit.width - this.camUnit.width * (this.gap / 100)),
                                (this.planeBCR.height = this.planeBCR.width / this.camera.aspect),
                                (this.geometry = new Plane(this.gl, { width: this.planeBCR.width, height: this.planeBCR.height, widthSegments: 100, heightSegments: 100 })),
                                (this.mesh.geometry = this.geometry),
                                (this.gl.canvas.style.width = "".concat(this.BCR.width, "px")),
                                (this.gl.canvas.style.height = "".concat(this.BCR.height, "px"));
                        },
                    },
                    {
                        key: "mouseenter",
                        value: function (t) {
                            (this.isRenderable = !0),
                                this.formatPosition({ x: (t.clientX - this.BCR.left) / this.BCR.width, y: (t.clientY - this.BCR.top) / this.BCR.height, obj: this.mouse }),
                                this.formatPosition({ x: (t.clientX - this.BCR.left) / this.BCR.width, y: (t.clientY - this.BCR.top) / this.BCR.height, obj: this.maskPosition });
                        },
                    },
                    { key: "mouseleave", value: function (t) {} },
                    {
                        key: "mousemove",
                        value: function (t) {
                            this.formatPosition({ x: (t.clientX - this.BCR.left) / this.BCR.width, y: (t.clientY - this.BCR.top) / this.BCR.height, obj: this.mouse }),
                                this.formatPosition({ x: (t.clientX - this.BCR.left) / this.BCR.width, y: (t.clientY - this.BCR.top) / this.BCR.height, obj: this.maskPosition });
                        },
                    },
                    {
                        key: "formatPosition",
                        value: function (t) {
                            (t.obj.x = t.x), (t.obj.y = t.y);
                        },
                    },
                    {
                        key: "render",
                        value: function (t) {
                            var e = this;
                            (this.raf = requestAnimationFrame(function (t) {
                                return e.render(t);
                            })),
                                this.isLoaded &&
                                    this.isRenderable &&
                                    ((this.settings.speed = (this.maskPosition.x - this.program.uniforms.maskPosition.value.x) / (t - this.now)),
                                    this.settings.speed > 0.01 && (this.settings.speed = 0.01),
                                    this.settings.speed < -0.01 && (this.settings.speed = -0.01),
                                    (this.program.uniforms.maskPosition.value.x = M(this.program.uniforms.maskPosition.value.x, this.maskPosition.x, 0.085)),
                                    (this.program.uniforms.maskPosition.value.y = M(this.program.uniforms.maskPosition.value.y, this.maskPosition.y, 0.085)),
                                    isNaN(this.settings.speed) || (this.program.uniforms.speed.value = M(this.program.uniforms.speed.value, this.settings.speed, 0.2)),
                                    this.$media instanceof HTMLVideoElement
                                        ? this.$media.readyState >= this.$media.HAVE_ENOUGH_DATA && (this.texture.image || (this.texture.image = this.$media), (this.texture.needsUpdate = !0))
                                        : this.$media instanceof HTMLImageElement && (this.texture.image || (this.texture.image = this.$media), (this.texture.needsUpdate = !0)),
                                    this.renderer.render({ scene: this.mesh, camera: this.camera })),
                                (this.now = t);
                        },
                    },
                    {
                        key: "resize",
                        value: function () {
                            var t = this.el.getBoundingClientRect();
                            (this.BCR && this.BCR.top == t.top && this.BCR.height == t.height) ||
                                ((this.BCR = t),
                                (this.windowWidth = window.innerWidth),
                                (this.windowHeight = window.innerHeight),
                                this.renderer.setSize(this.BCR.width, this.BCR.height),
                                this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height }),
                                this.updateSize());
                        },
                    },
                    {
                        key: "scroll",
                        value: function () {
                            var t = this.el.getBoundingClientRect();
                            (this.BCR && this.BCR.top == t.top && this.BCR.height == t.height) || (this.BCR = t);
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            b(v(i.prototype), "destroy", this).call(this),
                                cancelAnimationFrame(this.raf),
                                window.removeEventListener("resize", this.resizeBind),
                                document.removeEventListener("scroll", this.scrollBind),
                                window.addEventListener("mousemove", this.mousemoveBind);
                        },
                    },
                ]),
                i
            );
        })(c),
        j = (function (t) {
            p(i, t);
            var e = w(i);
            function i() {
                return d(this, i), e.apply(this, arguments);
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            (this.bindKeydown = this.keydown.bind(this)),
                                document.addEventListener("keydown", this.bindKeydown),
                                (this.pattern = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]),
                                (this.currentIndex = 0);
                        },
                    },
                    {
                        key: "keydown",
                        value: function (t) {
                            this.pattern.indexOf(t.key) < 0 || t.key !== this.pattern[this.currentIndex]
                                ? (this.currentIndex = 0)
                                : (this.currentIndex++, this.currentIndex === this.pattern.length && ((this.currentIndex = 0), this.call("goCrazy", "Llama")));
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            document.removeEventListener("keydown", this.bindKeydown);
                        },
                    },
                ]),
                i
            );
        })(c),
        D = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return d(this, i), ((n = e.call(this, t)).events = { click: "trigger" }), n;
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            window.isMobile || ((this.isAvailable = !0), this.reset());
                        },
                    },
                    {
                        key: "sayHello",
                        value: function () {
                            var t = this;
                            this.reset();
                            var e = new gsap.timeline();
                            e.to(this.el, { duration: 1, y: "80%", ease: "power2.out" }),
                                e.to(this.el, {
                                    duration: 1,
                                    y: "100%",
                                    ease: "power2.inOut",
                                    onComplete: function () {
                                        t.call("enableFire", "Ui");
                                    },
                                });
                        },
                    },
                    {
                        key: "fly",
                        value: function () {
                            var t = this;
                            this.reset();
                            var e = new gsap.timeline();
                            gsap.set(this.el, { x: "50%" }),
                                e.to(this.el, { duration: 2, y: "70%", x: "0%", ease: "power2.out" }),
                                e.to(this.el, {
                                    duration: 2,
                                    y: "100%",
                                    x: "-50%",
                                    ease: "power2.inOut",
                                    onComplete: function () {
                                        t.call("enableFire", "Ui"), t.call("reloadAmmo", "Ui");
                                    },
                                });
                        },
                    },
                    {
                        key: "goCrazy",
                        value: function () {
                            var t = this;
                            if (this.isAvailable) {
                                this.call("disableFire", "Ui"), (this.isAvailable = !1);
                                var e = new gsap.timeline({ repeat: -1 });
                                e.to(this.el.querySelector("img"), { duration: 0.26, y: -8 }),
                                    e.to(this.el.querySelector("img"), { duration: 0.26, y: 0 }),
                                    gsap.set(this.el, { y: "50%", x: window.innerWidth / 2 }),
                                    gsap.to(this.el, {
                                        duration: 16,
                                        y: "50%",
                                        x: -(window.innerWidth / 2 + this.el.getBoundingClientRect().width),
                                        ease: "none",
                                        onComplete: function () {
                                            t.reset(), t.call("enableFire", "Ui"), (t.isAvailable = !0), e.kill();
                                        },
                                    });
                            }
                        },
                    },
                    {
                        key: "reset",
                        value: function () {
                            gsap.set(this.el, { y: "100%", x: 0, rotate: 0, scale: 1 });
                        },
                    },
                ]),
                i
            );
        })(c);
    function P(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
        }
    }
    function I(t, e) {
        return (
            (function (t) {
                if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var i = [],
                    n = !0,
                    s = !1,
                    o = void 0;
                try {
                    for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); n = !0);
                } catch (t) {
                    (s = !0), (o = t);
                } finally {
                    try {
                        n || null == a.return || a.return();
                    } finally {
                        if (s) throw o;
                    }
                }
                return i;
            })(t, e) ||
            (function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return _(t, e);
                var i = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === i && t.constructor && (i = t.constructor.name);
                if ("Map" === i || "Set" === i) return Array.from(t);
                if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return _(t, e);
            })(t, e) ||
            (function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function _(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
        return n;
    }
    var z = (function () {
            function t(e) {
                !(function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                })(this, t),
                    (this.defaults = {
                        name: "load",
                        loadingClass: "is-loading",
                        loadedClass: "is-loaded",
                        readyClass: "is-ready",
                        transitionsPrefix: "is-",
                        transitionsHistory: !0,
                        enterDelay: 0,
                        exitDelay: 0,
                        loadedDelay: 0,
                        isLoaded: !1,
                        isEntered: !1,
                        isUrl: !1,
                        transitionContainer: null,
                    }),
                    Object.assign(this, this.defaults, e),
                    (this.options = e),
                    (this.namespace = "modular"),
                    (this.html = document.documentElement),
                    (this.href = window.location.href),
                    (this.container = "data-" + this.name + "-container"),
                    (this.subContainer = !1),
                    (this.prevTransition = null),
                    (this.loadAttributes = ["src", "srcset", "style", "href"]),
                    (this.isInserted = !1),
                    (this.isLoading = !1),
                    (this.enterTimeout = !1),
                    (this.controller = new AbortController()),
                    (this.classContainer = this.html),
                    (this.isChrome = -1 != navigator.userAgent.indexOf("Chrome")),
                    this.init();
            }
            var e, i, n;
            return (
                (e = t),
                (i = [
                    {
                        key: "init",
                        value: function () {
                            var t = this;
                            window.addEventListener(
                                "popstate",
                                function (e) {
                                    return t.checkState(e);
                                },
                                !1
                            ),
                                this.html.addEventListener(
                                    "click",
                                    function (e) {
                                        return t.checkClick(e);
                                    },
                                    !1
                                ),
                                this.loadEls(document);
                        },
                    },
                    {
                        key: "checkClick",
                        value: function (t) {
                            if (!t.ctrlKey && !t.metaKey)
                                for (var e = t.target; e && e !== document; ) {
                                    if (e.matches("a") && null == e.getAttribute("download")) {
                                        var i = e.getAttribute("href");
                                        i.startsWith("#") || i.startsWith("mailto:") || i.startsWith("tel:") || (t.preventDefault(), this.reset(), this.getClickOptions(e));
                                        break;
                                    }
                                    e = e.parentNode;
                                }
                        },
                    },
                    {
                        key: "checkState",
                        value: function () {
                            this.reset(), this.getStateOptions();
                        },
                    },
                    {
                        key: "reset",
                        value: function () {
                            this.isLoading && (this.controller.abort(), (this.isLoading = !1), (this.controller = new AbortController())),
                                window.clearTimeout(this.enterTimeout),
                                this.isInserted && this.removeContainer(),
                                (this.classContainer = this.html),
                                Object.assign(this, this.defaults, this.options);
                        },
                    },
                    {
                        key: "getClickOptions",
                        value: function (t) {
                            (this.transition = t.getAttribute("data-" + this.name)), (this.isUrl = t.getAttribute("data-" + this.name + "-url"));
                            var e = t.getAttribute("href");
                            "_blank" != t.getAttribute("target") ? ("false" != this.transition ? this.setOptions(e, !0) : (window.location = e)) : window.open(e, "_blank");
                        },
                    },
                    {
                        key: "getStateOptions",
                        value: function () {
                            this.transitionsHistory ? (this.transition = history.state) : (this.transition = !1);
                            var t = window.location.href;
                            this.setOptions(t);
                        },
                    },
                    {
                        key: "goTo",
                        value: function (t, e, i) {
                            this.reset(), (this.transition = e), (this.isUrl = i), this.setOptions(t, !0);
                        },
                    },
                    {
                        key: "setOptions",
                        value: function (t, e) {
                            var i,
                                n = "[" + this.container + "]";
                            this.transition &&
                                "true" != this.transition &&
                                ((this.transitionContainer = "[" + this.container + '="' + this.transition + '"]'),
                                (this.loadingClass = this.transitions[this.transition].loadingClass || this.loadingClass),
                                (this.loadedClass = this.transitions[this.transition].loadedClass || this.loadedClass),
                                (this.readyClass = this.transitions[this.transition].readyClass || this.readyClass),
                                (this.transitionsPrefix = this.transitions[this.transition].transitionsPrefix || this.transitionsPrefix),
                                (this.enterDelay = this.transitions[this.transition].enterDelay || this.enterDelay),
                                (this.exitDelay = this.transitions[this.transition].exitDelay || this.exitDelay),
                                (this.loadedDelay = this.transitions[this.transition].loadedDelay || this.loadedDelay),
                                (i = document.querySelector(this.transitionContainer))),
                                i
                                    ? ((n = this.transitionContainer),
                                      (this.oldContainer = i),
                                      (this.classContainer = this.oldContainer.parentNode),
                                      this.subContainer || history.replaceState(this.transition, null, this.href),
                                      (this.subContainer = !0))
                                    : ((this.oldContainer = document.querySelector(n)), this.subContainer && history.replaceState(this.prevTransition, null, this.href), (this.subContainer = !1)),
                                (this.href = t),
                                (this.parentContainer = this.oldContainer.parentNode),
                                "" === this.isUrl || (null != this.isUrl && "false" != this.isUrl && 0 != this.isUrl)
                                    ? history.pushState(this.transition, null, t)
                                    : (this.oldContainer.classList.add("is-old"), this.setLoading(), this.startEnterDelay(), this.loadHref(t, n, e));
                        },
                    },
                    {
                        key: "setLoading",
                        value: function () {
                            this.classContainer.classList.remove(this.loadedClass, this.readyClass),
                                this.classContainer.classList.add(this.loadingClass),
                                this.classContainer.classList.remove(this.transitionsPrefix + this.prevTransition),
                                this.transition && this.classContainer.classList.add(this.transitionsPrefix + this.transition),
                                this.subContainer || (this.prevTransition = this.transition);
                            var t = new Event(this.namespace + "loading");
                            window.dispatchEvent(t);
                        },
                    },
                    {
                        key: "startEnterDelay",
                        value: function () {
                            var t = this;
                            this.enterTimeout = window.setTimeout(function () {
                                (t.isEntered = !0), t.isLoaded && t.transitionContainers();
                            }, this.enterDelay);
                        },
                    },
                    {
                        key: "loadHref",
                        value: function (t, e, i) {
                            var n = this;
                            this.isLoading = !0;
                            var s = this.controller.signal;
                            fetch(t, { signal: s })
                                .then(function (t) {
                                    return t.text();
                                })
                                .then(function (s) {
                                    i && history.pushState(n.transition, null, t);
                                    var o = new DOMParser();
                                    (n.data = o.parseFromString(s, "text/html")),
                                        (n.newContainer = n.data.querySelector(e)),
                                        n.newContainer.classList.add("is-new"),
                                        (n.parentNewContainer = n.newContainer.parentNode),
                                        n.hideContainer(),
                                        n.parentContainer.insertBefore(n.newContainer, n.oldContainer),
                                        (n.isInserted = !0),
                                        n.setSvgs(),
                                        (n.isLoaded = !0),
                                        n.isEntered && n.transitionContainers(),
                                        n.loadEls(n.newContainer),
                                        (n.isLoading = !1);
                                })
                                .catch(function (e) {
                                    window.location = t;
                                });
                        },
                    },
                    {
                        key: "transitionContainers",
                        value: function () {
                            var t = this;
                            this.setAttributes(),
                                this.showContainer(),
                                this.setLoaded(),
                                setTimeout(function () {
                                    t.removeContainer(), t.setReady();
                                }, this.exitDelay);
                        },
                    },
                    {
                        key: "setSvgs",
                        value: function () {
                            if (this.isChrome) {
                                var t = this.newContainer.querySelectorAll("use");
                                t.length &&
                                    t.forEach(function (t) {
                                        var e = t.getAttribute("xlink:href");
                                        if (e) t.parentNode.innerHTML = '<use xlink:href="' + e + '"></use>';
                                        else {
                                            var i = t.getAttribute("href");
                                            i && (t.parentNode.innerHTML = '<use href="' + i + '"></use>');
                                        }
                                    });
                            }
                        },
                    },
                    {
                        key: "setAttributes",
                        value: function () {
                            var t,
                                e,
                                i = this,
                                n = this.data.getElementsByTagName("title")[0],
                                s = this.data.head.querySelector('meta[name="description"]'),
                                o = document.head.querySelector('meta[name="description"]');
                            this.subContainer ? ((e = this.parentNewContainer), (t = document.querySelector(this.transitionContainer).parentNode)) : ((e = this.data.querySelector("html")), (t = document.querySelector("html")));
                            var r = Object.assign({}, e.dataset);
                            n && (document.title = n.innerText),
                                o && s && o.setAttribute("content", s.getAttribute("content")),
                                r &&
                                    Object.entries(r).forEach(function (e) {
                                        var n = I(e, 2),
                                            s = n[0],
                                            o = n[1];
                                        t.setAttribute("data-" + i.toDash(s), o);
                                    });
                        },
                    },
                    {
                        key: "toDash",
                        value: function (t) {
                            return t
                                .split(/(?=[A-Z])/)
                                .join("-")
                                .toLowerCase();
                        },
                    },
                    {
                        key: "hideContainer",
                        value: function () {
                            (this.newContainer.style.visibility = "hidden"), (this.newContainer.style.height = 0), (this.newContainer.style.overflow = "hidden");
                        },
                    },
                    {
                        key: "showContainer",
                        value: function () {
                            (this.newContainer.style.visibility = ""), (this.newContainer.style.height = ""), (this.newContainer.style.overflow = "");
                        },
                    },
                    {
                        key: "loadEls",
                        value: function (t) {
                            var e = this,
                                i = [];
                            this.loadAttributes.forEach(function (n) {
                                var s = "data-" + e.name + "-" + n,
                                    o = t.querySelectorAll("[" + s + "]");
                                o.length &&
                                    o.forEach(function (t) {
                                        var e = t.getAttribute(s);
                                        if ((t.setAttribute(n, e), "src" == n || "srcset" == n)) {
                                            var o = new Promise(function (e) {
                                                t.onload = function () {
                                                    return e(t);
                                                };
                                            });
                                            i.push(o);
                                        }
                                    });
                            }),
                                Promise.all(i).then(function (t) {
                                    var i = new Event(e.namespace + "images");
                                    window.dispatchEvent(i);
                                });
                        },
                    },
                    {
                        key: "setLoaded",
                        value: function () {
                            var t = this;
                            this.classContainer.classList.remove(this.loadingClass),
                                setTimeout(function () {
                                    t.classContainer.classList.add(t.loadedClass);
                                }, this.loadedDelay);
                            var e = new Event(this.namespace + "loaded");
                            window.dispatchEvent(e);
                        },
                    },
                    {
                        key: "removeContainer",
                        value: function () {
                            this.parentContainer.removeChild(this.oldContainer), this.newContainer.classList.remove("is-new"), (this.isInserted = !1);
                        },
                    },
                    {
                        key: "setReady",
                        value: function () {
                            this.classContainer.classList.add(this.readyClass);
                            var t = new Event(this.namespace + "ready");
                            window.dispatchEvent(t);
                        },
                    },
                    {
                        key: "on",
                        value: function (t, e) {
                            var i = this;
                            window.addEventListener(
                                this.namespace + t,
                                function () {
                                    switch (t) {
                                        case "loading":
                                            return e(i.transition, i.oldContainer);
                                        case "loaded":
                                            return e(i.transition, i.oldContainer, i.newContainer);
                                        case "ready":
                                            return e(i.transition, i.newContainer);
                                        default:
                                            return e();
                                    }
                                },
                                !1
                            );
                        },
                    },
                ]) && P(e.prototype, i),
                n && P(e, n),
                t
            );
        })(),
        H = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                return d(this, i), e.call(this, t);
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            var t = this;
                            this.analyticsId = this.getData("analytics");
                            var e = new z({ enterDelay: 1400, transitions: { gameTransition: { enterDelay: 1400 } } });
                            e.on("loading", function (t, e) {
                                k.classList.remove("has-menu-open"), k.classList.remove("is-animated"), k.classList.remove("has-scrolled"), k.classList.add("is-transition");
                            }),
                                e.on("loaded", function (e, i, n) {
                                    k.classList.remove("is-transition"),
                                        window.gtag && null != t.analyticsId && gtag("config", t.analyticsId, { page_path: location.pathname, page_title: document.title }),
                                        t.call("destroy", i, "app"),
                                        t.call("update", n, "app"),
                                        setTimeout(function () {
                                            k.classList.add("is-animated");
                                        }, 1200);
                                });
                        },
                    },
                ]),
                i
            );
        })(c),
        W = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return d(this, i), ((n = e.call(this, t)).events = { click: { background: "close" } }), n;
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            var t = this;
                            (this.keyupBind = function (e) {
                                "Escape" === e.key && t.close();
                            }),
                                document.addEventListener("keyup", this.keyupBind);
                        },
                    },
                    {
                        key: "close",
                        value: function () {
                            k.classList.remove("has-menu-open");
                        },
                    },
                    {
                        key: "open",
                        value: function () {
                            k.classList.add("has-menu-open");
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            document.removeEventListener("keyup", this.keyupBind);
                        },
                    },
                ]),
                i
            );
        })(c),
        F = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return d(this, i), ((n = e.call(this, t)).events = { click: "trigger" }), n;
            }
            return (
                m(i, [
                    { key: "init", value: function () {} },
                    {
                        key: "trigger",
                        value: function () {
                            k.classList.contains("has-menu-open") ? this.call("close", "Menu") : this.call("open", "Menu");
                        },
                    },
                ]),
                i
            );
        })(c),
        Y = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return d(this, i), ((n = e.call(this, t)).events = { click: { closeButton: "close" } }), n;
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            this.$inner = this.$("inner")[0];
                        },
                    },
                    {
                        key: "open",
                        value: function (t) {
                            if ((void 0 !== this.timeout && clearTimeout(this.timeout), t.html)) {
                                switch (t.provider) {
                                    case "vimeo":
                                    case "vimeo.com":
                                    case "youtube":
                                    case "youtube.com":
                                        t.html = this.parseUriQueryInHtml(t.html, "src", "autoplay=1");
                                }
                                this.$inner.innerHTML = t.html;
                            } else
                                switch (t.provider) {
                                    case "vimeo":
                                    case "vimeo.com":
                                        this.$inner.innerHTML = '<iframe src="https://player.vimeo.com/video/'.concat(
                                            t.id,
                                            '?controls=true&amp;autoplay=1&amp;transparent=false&amp;autopause=false&amp;muted=0"frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; encrypted-media"></iframe>'
                                        );
                                        break;
                                    case "youtube":
                                    case "youtube.com":
                                        this.$inner.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'.concat(
                                            t.id,
                                            '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                                        );
                                        break;
                                    default:
                                        this.$inner.innerHTML = window.eidosData.l10n.errorTryLater || "Something went wrong.";
                                }
                            k.classList.add("has-popup-open");
                        },
                    },
                    {
                        key: "parseUriQueryInHtml",
                        value: function (t, e, i) {
                            if (!1 === new RegExp("\\b" + i + "\\b").test(t)) {
                                var n = new RegExp("\\b" + e + '="[^"]+[\\?&][^"]+"'),
                                    s = new RegExp("\\b" + e + '="([^"]+)"');
                                t = !0 === n.test(t) ? t.replace(s, e + '="$1&' + i + '"') : t.replace(s, e + '="$1?' + i + '"');
                            }
                            return t;
                        },
                    },
                    {
                        key: "close",
                        value: function () {
                            var t = this;
                            k.classList.add("has-popup-closing"),
                                k.classList.remove("has-popup-open"),
                                (this.timeout = setTimeout(function () {
                                    t.$inner.innerHTML = "";
                                }, 600)),
                                setTimeout(function () {
                                    k.classList.remove("has-popup-closing");
                                }, 600);
                        },
                    },
                ]),
                i
            );
        })(c);
    function U(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function V(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
        }
    }
    function X(t, e, i) {
        return e && V(t.prototype, e), i && V(t, i), t;
    }
    function q(t, e, i) {
        return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = i), t;
    }
    function $(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
                (n = n.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })),
                i.push.apply(i, n);
        }
        return i;
    }
    function N(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2
                ? $(Object(i), !0).forEach(function (e) {
                      q(t, e, i[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
                : $(Object(i)).forEach(function (e) {
                      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
                  });
        }
        return t;
    }
    function K(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })), e && Q(t, e);
    }
    function G(t) {
        return (G = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
    }
    function Q(t, e) {
        return (Q =
            Object.setPrototypeOf ||
            function (t, e) {
                return (t.__proto__ = e), t;
            })(t, e);
    }
    function Z(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function J(t, e) {
        return !e || ("object" != typeof e && "function" != typeof e) ? Z(t) : e;
    }
    function tt(t) {
        var e = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
            } catch (t) {
                return !1;
            }
        })();
        return function () {
            var i,
                n = G(t);
            if (e) {
                var s = G(this).constructor;
                i = Reflect.construct(n, arguments, s);
            } else i = n.apply(this, arguments);
            return J(this, i);
        };
    }
    function et(t, e, i) {
        return (et =
            "undefined" != typeof Reflect && Reflect.get
                ? Reflect.get
                : function (t, e, i) {
                      var n = (function (t, e) {
                          for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = G(t)); );
                          return t;
                      })(t, e);
                      if (n) {
                          var s = Object.getOwnPropertyDescriptor(n, e);
                          return s.get ? s.get.call(i) : s.value;
                      }
                  })(t, e, i || t);
    }
    function it(t, e) {
        return (
            (function (t) {
                if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                var i = [],
                    n = !0,
                    s = !1,
                    o = void 0;
                try {
                    for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); n = !0);
                } catch (t) {
                    (s = !0), (o = t);
                } finally {
                    try {
                        n || null == a.return || a.return();
                    } finally {
                        if (s) throw o;
                    }
                }
                return i;
            })(t, e) ||
            st(t, e) ||
            (function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function nt(t) {
        return (
            (function (t) {
                if (Array.isArray(t)) return ot(t);
            })(t) ||
            (function (t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
            })(t) ||
            st(t) ||
            (function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function st(t, e) {
        if (t) {
            if ("string" == typeof t) return ot(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? ot(t, e) : void 0;
        }
    }
    function ot(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
        return n;
    }
    var rt = {
            el: document,
            name: "scroll",
            offset: [0, 0],
            repeat: !1,
            smooth: !1,
            initPosition: { x: 0, y: 0 },
            direction: "vertical",
            gestureDirection: "vertical",
            reloadOnContextChange: !1,
            lerp: 0.1,
            class: "is-inview",
            scrollbarContainer: !1,
            scrollbarClass: "c-scrollbar",
            scrollingClass: "has-scroll-scrolling",
            draggingClass: "has-scroll-dragging",
            smoothClass: "has-scroll-smooth",
            initClass: "has-scroll-init",
            getSpeed: !1,
            getDirection: !1,
            scrollFromAnywhere: !1,
            multiplier: 1,
            firefoxMultiplier: 50,
            touchMultiplier: 2,
            resetNativeScroll: !0,
            tablet: { smooth: !1, direction: "vertical", gestureDirection: "vertical", breakpoint: 1024 },
            smartphone: { smooth: !1, direction: "vertical", gestureDirection: "vertical" },
        },
        at = (function () {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                U(this, t),
                    Object.assign(this, rt, e),
                    (this.smartphone = rt.smartphone),
                    e.smartphone && Object.assign(this.smartphone, e.smartphone),
                    (this.tablet = rt.tablet),
                    e.tablet && Object.assign(this.tablet, e.tablet),
                    (this.namespace = "locomotive"),
                    (this.html = document.documentElement),
                    (this.windowHeight = window.innerHeight),
                    (this.windowWidth = window.innerWidth),
                    (this.windowMiddle = { x: this.windowWidth / 2, y: this.windowHeight / 2 }),
                    (this.els = {}),
                    (this.currentElements = {}),
                    (this.listeners = {}),
                    (this.hasScrollTicking = !1),
                    (this.hasCallEventSet = !1),
                    (this.checkScroll = this.checkScroll.bind(this)),
                    (this.checkResize = this.checkResize.bind(this)),
                    (this.checkEvent = this.checkEvent.bind(this)),
                    (this.instance = { scroll: { x: 0, y: 0 }, limit: { x: this.html.offsetWidth, y: this.html.offsetHeight }, currentElements: this.currentElements }),
                    this.isMobile ? (this.isTablet ? (this.context = "tablet") : (this.context = "smartphone")) : (this.context = "desktop"),
                    this.isMobile && (this.direction = this[this.context].direction),
                    "horizontal" === this.direction ? (this.directionAxis = "x") : (this.directionAxis = "y"),
                    this.getDirection && (this.instance.direction = null),
                    this.getDirection && (this.instance.speed = 0),
                    this.html.classList.add(this.initClass),
                    window.addEventListener("resize", this.checkResize, !1);
            }
            return (
                X(t, [
                    {
                        key: "init",
                        value: function () {
                            this.initEvents();
                        },
                    },
                    {
                        key: "checkScroll",
                        value: function () {
                            this.dispatchScroll();
                        },
                    },
                    {
                        key: "checkResize",
                        value: function () {
                            var t = this;
                            this.resizeTick ||
                                ((this.resizeTick = !0),
                                requestAnimationFrame(function () {
                                    t.resize(), (t.resizeTick = !1);
                                }));
                        },
                    },
                    { key: "resize", value: function () {} },
                    {
                        key: "checkContext",
                        value: function () {
                            if (this.reloadOnContextChange) {
                                (this.isMobile =
                                    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1) || this.windowWidth < this.tablet.breakpoint),
                                    (this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint);
                                var t = this.context;
                                if ((this.isMobile ? (this.isTablet ? (this.context = "tablet") : (this.context = "smartphone")) : (this.context = "desktop"), t != this.context))
                                    ("desktop" == t ? this.smooth : this[t].smooth) != ("desktop" == this.context ? this.smooth : this[this.context].smooth) && window.location.reload();
                            }
                        },
                    },
                    {
                        key: "initEvents",
                        value: function () {
                            var t = this;
                            (this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]"))),
                                (this.setScrollTo = this.setScrollTo.bind(this)),
                                this.scrollToEls.forEach(function (e) {
                                    e.addEventListener("click", t.setScrollTo, !1);
                                });
                        },
                    },
                    {
                        key: "setScrollTo",
                        value: function (t) {
                            t.preventDefault(),
                                this.scrollTo(t.currentTarget.getAttribute("data-".concat(this.name, "-href")) || t.currentTarget.getAttribute("href"), { offset: t.currentTarget.getAttribute("data-".concat(this.name, "-offset")) });
                        },
                    },
                    { key: "addElements", value: function () {} },
                    {
                        key: "detectElements",
                        value: function (t) {
                            var e = this,
                                i = this.instance.scroll.y,
                                n = i + this.windowHeight,
                                s = this.instance.scroll.x,
                                o = s + this.windowWidth;
                            Object.entries(this.els).forEach(function (r) {
                                var a = it(r, 2),
                                    l = a[0],
                                    c = a[1];
                                if ((!c || (c.inView && !t) || ("horizontal" === e.direction ? o >= c.left && s < c.right && e.setInView(c, l) : n >= c.top && i < c.bottom && e.setInView(c, l)), c && c.inView))
                                    if ("horizontal" === e.direction) {
                                        var h = c.right - c.left;
                                        (c.progress = (e.instance.scroll.x - (c.left - e.windowWidth)) / (h + e.windowWidth)), (o < c.left || s > c.right) && e.setOutOfView(c, l);
                                    } else {
                                        var u = c.bottom - c.top;
                                        (c.progress = (e.instance.scroll.y - (c.top - e.windowHeight)) / (u + e.windowHeight)), (n < c.top || i > c.bottom) && e.setOutOfView(c, l);
                                    }
                            }),
                                (this.hasScrollTicking = !1);
                        },
                    },
                    {
                        key: "setInView",
                        value: function (t, e) {
                            (this.els[e].inView = !0), t.el.classList.add(t.class), (this.currentElements[e] = t), t.call && this.hasCallEventSet && (this.dispatchCall(t, "enter"), t.repeat || (this.els[e].call = !1));
                        },
                    },
                    {
                        key: "setOutOfView",
                        value: function (t, e) {
                            var i = this;
                            (this.els[e].inView = !1),
                                Object.keys(this.currentElements).forEach(function (t) {
                                    t === e && delete i.currentElements[t];
                                }),
                                t.call && this.hasCallEventSet && this.dispatchCall(t, "exit"),
                                t.repeat && t.el.classList.remove(t.class);
                        },
                    },
                    {
                        key: "dispatchCall",
                        value: function (t, e) {
                            (this.callWay = e),
                                (this.callValue = t.call.split(",").map(function (t) {
                                    return t.trim();
                                })),
                                (this.callObj = t),
                                1 == this.callValue.length && (this.callValue = this.callValue[0]);
                            var i = new Event(this.namespace + "call");
                            this.el.dispatchEvent(i);
                        },
                    },
                    {
                        key: "dispatchScroll",
                        value: function () {
                            var t = new Event(this.namespace + "scroll");
                            this.el.dispatchEvent(t);
                        },
                    },
                    {
                        key: "setEvents",
                        value: function (t, e) {
                            this.listeners[t] || (this.listeners[t] = []);
                            var i = this.listeners[t];
                            i.push(e), 1 === i.length && this.el.addEventListener(this.namespace + t, this.checkEvent, !1), "call" === t && ((this.hasCallEventSet = !0), this.detectElements(!0));
                        },
                    },
                    {
                        key: "unsetEvents",
                        value: function (t, e) {
                            if (this.listeners[t]) {
                                var i = this.listeners[t],
                                    n = i.indexOf(e);
                                n < 0 || (i.splice(n, 1), 0 === i.index && this.el.removeEventListener(this.namespace + t, this.checkEvent, !1));
                            }
                        },
                    },
                    {
                        key: "checkEvent",
                        value: function (t) {
                            var e = this,
                                i = t.type.replace(this.namespace, ""),
                                n = this.listeners[i];
                            n &&
                                0 !== n.length &&
                                n.forEach(function (t) {
                                    switch (i) {
                                        case "scroll":
                                            return t(e.instance);
                                        case "call":
                                            return t(e.callValue, e.callWay, e.callObj);
                                        default:
                                            return t();
                                    }
                                });
                        },
                    },
                    { key: "startScroll", value: function () {} },
                    { key: "stopScroll", value: function () {} },
                    {
                        key: "setScroll",
                        value: function (t, e) {
                            this.instance.scroll = { x: 0, y: 0 };
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            var t = this;
                            window.removeEventListener("resize", this.checkResize, !1),
                                Object.keys(this.listeners).forEach(function (e) {
                                    t.el.removeEventListener(t.namespace + e, t.checkEvent, !1);
                                }),
                                (this.listeners = {}),
                                this.scrollToEls.forEach(function (e) {
                                    e.removeEventListener("click", t.setScrollTo, !1);
                                }),
                                this.html.classList.remove(this.initClass);
                        },
                    },
                ]),
                t
            );
        })(),
        lt = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function ct(t, e) {
        return t((e = { exports: {} }), e.exports), e.exports;
    }
    var ht = ct(function (t, e) {
            t.exports = {
                polyfill: function () {
                    var t = window,
                        e = document;
                    if (!("scrollBehavior" in e.documentElement.style) || !0 === t.__forceSmoothScrollPolyfill__) {
                        var i,
                            n = t.HTMLElement || t.Element,
                            s = { scroll: t.scroll || t.scrollTo, scrollBy: t.scrollBy, elementScroll: n.prototype.scroll || a, scrollIntoView: n.prototype.scrollIntoView },
                            o = t.performance && t.performance.now ? t.performance.now.bind(t.performance) : Date.now,
                            r = ((i = t.navigator.userAgent), new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(i) ? 1 : 0);
                        (t.scroll = t.scrollTo = function () {
                            void 0 !== arguments[0] &&
                                (!0 !== l(arguments[0])
                                    ? m.call(t, e.body, void 0 !== arguments[0].left ? ~~arguments[0].left : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : t.scrollY || t.pageYOffset)
                                    : s.scroll.call(
                                          t,
                                          void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : t.scrollX || t.pageXOffset,
                                          void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : t.scrollY || t.pageYOffset
                                      ));
                        }),
                            (t.scrollBy = function () {
                                void 0 !== arguments[0] &&
                                    (l(arguments[0])
                                        ? s.scrollBy.call(
                                              t,
                                              void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0,
                                              void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0
                                          )
                                        : m.call(t, e.body, ~~arguments[0].left + (t.scrollX || t.pageXOffset), ~~arguments[0].top + (t.scrollY || t.pageYOffset)));
                            }),
                            (n.prototype.scroll = n.prototype.scrollTo = function () {
                                if (void 0 !== arguments[0])
                                    if (!0 !== l(arguments[0])) {
                                        var t = arguments[0].left,
                                            e = arguments[0].top;
                                        m.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e);
                                    } else {
                                        if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                                        s.elementScroll.call(
                                            this,
                                            void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft,
                                            void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop
                                        );
                                    }
                            }),
                            (n.prototype.scrollBy = function () {
                                void 0 !== arguments[0] &&
                                    (!0 !== l(arguments[0])
                                        ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior })
                                        : s.elementScroll.call(
                                              this,
                                              void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft,
                                              void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop
                                          ));
                            }),
                            (n.prototype.scrollIntoView = function () {
                                if (!0 !== l(arguments[0])) {
                                    var i = d(this),
                                        n = i.getBoundingClientRect(),
                                        o = this.getBoundingClientRect();
                                    i !== e.body
                                        ? (m.call(this, i, i.scrollLeft + o.left - n.left, i.scrollTop + o.top - n.top), "fixed" !== t.getComputedStyle(i).position && t.scrollBy({ left: n.left, top: n.top, behavior: "smooth" }))
                                        : t.scrollBy({ left: o.left, top: o.top, behavior: "smooth" });
                                } else s.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
                            });
                    }
                    function a(t, e) {
                        (this.scrollLeft = t), (this.scrollTop = e);
                    }
                    function l(t) {
                        if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
                        if ("object" == typeof t && "smooth" === t.behavior) return !1;
                        throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.");
                    }
                    function c(t, e) {
                        return "Y" === e ? t.clientHeight + r < t.scrollHeight : "X" === e ? t.clientWidth + r < t.scrollWidth : void 0;
                    }
                    function h(e, i) {
                        var n = t.getComputedStyle(e, null)["overflow" + i];
                        return "auto" === n || "scroll" === n;
                    }
                    function u(t) {
                        var e = c(t, "Y") && h(t, "Y"),
                            i = c(t, "X") && h(t, "X");
                        return e || i;
                    }
                    function d(t) {
                        for (; t !== e.body && !1 === u(t); ) t = t.parentNode || t.host;
                        return t;
                    }
                    function f(e) {
                        var i,
                            n,
                            s,
                            r,
                            a = (o() - e.startTime) / 468;
                        (r = a = a > 1 ? 1 : a),
                            (i = 0.5 * (1 - Math.cos(Math.PI * r))),
                            (n = e.startX + (e.x - e.startX) * i),
                            (s = e.startY + (e.y - e.startY) * i),
                            e.method.call(e.scrollable, n, s),
                            (n === e.x && s === e.y) || t.requestAnimationFrame(f.bind(t, e));
                    }
                    function m(i, n, r) {
                        var l,
                            c,
                            h,
                            u,
                            d = o();
                        i === e.body ? ((l = t), (c = t.scrollX || t.pageXOffset), (h = t.scrollY || t.pageYOffset), (u = s.scroll)) : ((l = i), (c = i.scrollLeft), (h = i.scrollTop), (u = a)),
                            f({ scrollable: l, method: u, startTime: d, startX: c, startY: h, x: n, y: r });
                    }
                },
            };
        }),
        ut =
            (ht.polyfill,
            (function (t) {
                K(i, t);
                var e = tt(i);
                function i() {
                    var t,
                        n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return (
                        U(this, i),
                        (t = e.call(this, n)).resetNativeScroll && (history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0)),
                        window.addEventListener("scroll", t.checkScroll, !1),
                        void 0 === window.smoothscrollPolyfill && ((window.smoothscrollPolyfill = ht), window.smoothscrollPolyfill.polyfill()),
                        t
                    );
                }
                return (
                    X(i, [
                        {
                            key: "init",
                            value: function () {
                                (this.instance.scroll.y = window.pageYOffset), this.addElements(), this.detectElements(), et(G(i.prototype), "init", this).call(this);
                            },
                        },
                        {
                            key: "checkScroll",
                            value: function () {
                                var t = this;
                                et(G(i.prototype), "checkScroll", this).call(this),
                                    this.getDirection && this.addDirection(),
                                    this.getSpeed && (this.addSpeed(), (this.speedTs = Date.now())),
                                    (this.instance.scroll.y = window.pageYOffset),
                                    Object.entries(this.els).length &&
                                        (this.hasScrollTicking ||
                                            (requestAnimationFrame(function () {
                                                t.detectElements();
                                            }),
                                            (this.hasScrollTicking = !0)));
                            },
                        },
                        {
                            key: "addDirection",
                            value: function () {
                                window.pageYOffset > this.instance.scroll.y
                                    ? "down" !== this.instance.direction && (this.instance.direction = "down")
                                    : window.pageYOffset < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up");
                            },
                        },
                        {
                            key: "addSpeed",
                            value: function () {
                                window.pageYOffset != this.instance.scroll.y ? (this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs)) : (this.instance.speed = 0);
                            },
                        },
                        {
                            key: "resize",
                            value: function () {
                                Object.entries(this.els).length && ((this.windowHeight = window.innerHeight), this.updateElements());
                            },
                        },
                        {
                            key: "addElements",
                            value: function () {
                                var t = this;
                                (this.els = {}),
                                    this.el.querySelectorAll("[data-" + this.name + "]").forEach(function (e, i) {
                                        e.getBoundingClientRect();
                                        var n,
                                            s,
                                            o,
                                            r = e.dataset[t.name + "Class"] || t.class,
                                            a = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : i,
                                            l = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset,
                                            c = e.dataset[t.name + "Repeat"],
                                            h = e.dataset[t.name + "Call"],
                                            u = e.dataset[t.name + "Target"],
                                            d = (o = void 0 !== u ? document.querySelector("".concat(u)) : e).getBoundingClientRect();
                                        (n = d.top + t.instance.scroll.y), (s = d.left + t.instance.scroll.x);
                                        var f = n + o.offsetHeight,
                                            m = s + o.offsetWidth;
                                        c = "false" != c && (null != c || t.repeat);
                                        var p = t.getRelativeOffset(l),
                                            v = { el: e, targetEl: o, id: a, class: r, top: (n += p[0]), bottom: (f -= p[1]), left: s, right: m, offset: l, progress: 0, repeat: c, inView: !1, call: h };
                                        (t.els[a] = v), e.classList.contains(r) && t.setInView(t.els[a], a);
                                    });
                            },
                        },
                        {
                            key: "updateElements",
                            value: function () {
                                var t = this;
                                Object.entries(this.els).forEach(function (e) {
                                    var i = it(e, 2),
                                        n = i[0],
                                        s = i[1],
                                        o = s.targetEl.getBoundingClientRect().top + t.instance.scroll.y,
                                        r = o + s.targetEl.offsetHeight,
                                        a = t.getRelativeOffset(s.offset);
                                    (t.els[n].top = o + a[0]), (t.els[n].bottom = r - a[1]);
                                }),
                                    (this.hasScrollTicking = !1);
                            },
                        },
                        {
                            key: "getRelativeOffset",
                            value: function (t) {
                                var e = [0, 0];
                                if (t) for (var i = 0; i < t.length; i++) "string" == typeof t[i] ? (t[i].includes("%") ? (e[i] = parseInt((t[i].replace("%", "") * this.windowHeight) / 100)) : (e[i] = parseInt(t[i]))) : (e[i] = t[i]);
                                return e;
                            },
                        },
                        {
                            key: "scrollTo",
                            value: function (t) {
                                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                    i = parseInt(e.offset) || 0,
                                    n = !!e.callback && e.callback;
                                if ("string" == typeof t) {
                                    if ("top" === t) t = this.html;
                                    else if ("bottom" === t) t = this.html.offsetHeight - window.innerHeight;
                                    else if (!(t = document.querySelector(t))) return;
                                } else if ("number" == typeof t) t = parseInt(t);
                                else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid");
                                i = "number" != typeof t ? t.getBoundingClientRect().top + i + this.instance.scroll.y : t + i;
                                var s = function () {
                                    return parseInt(window.pageYOffset) === parseInt(i);
                                };
                                if (n) {
                                    if (s()) return void n();
                                    var o = function t() {
                                        s() && (window.removeEventListener("scroll", t), n());
                                    };
                                    window.addEventListener("scroll", o);
                                }
                                window.scrollTo({ top: i, behavior: "smooth" });
                            },
                        },
                        {
                            key: "update",
                            value: function () {
                                this.addElements(), this.detectElements();
                            },
                        },
                        {
                            key: "destroy",
                            value: function () {
                                et(G(i.prototype), "destroy", this).call(this), window.removeEventListener("scroll", this.checkScroll, !1);
                            },
                        },
                    ]),
                    i
                );
            })(at)),
        dt = Object.getOwnPropertySymbols,
        ft = Object.prototype.hasOwnProperty,
        mt = Object.prototype.propertyIsEnumerable;
    function pt(t) {
        if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(t);
    }
    var vt = (function () {
        try {
            if (!Object.assign) return !1;
            var t = new String("abc");
            if (((t[5] = "de"), "5" === Object.getOwnPropertyNames(t)[0])) return !1;
            for (var e = {}, i = 0; i < 10; i++) e["_" + String.fromCharCode(i)] = i;
            if (
                "0123456789" !==
                Object.getOwnPropertyNames(e)
                    .map(function (t) {
                        return e[t];
                    })
                    .join("")
            )
                return !1;
            var n = {};
            return (
                "abcdefghijklmnopqrst".split("").forEach(function (t) {
                    n[t] = t;
                }),
                "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
            );
        } catch (t) {
            return !1;
        }
    })()
        ? Object.assign
        : function (t, e) {
              for (var i, n, s = pt(t), o = 1; o < arguments.length; o++) {
                  for (var r in (i = Object(arguments[o]))) ft.call(i, r) && (s[r] = i[r]);
                  if (dt) {
                      n = dt(i);
                      for (var a = 0; a < n.length; a++) mt.call(i, n[a]) && (s[n[a]] = i[n[a]]);
                  }
              }
              return s;
          };
    function yt() {}
    yt.prototype = {
        on: function (t, e, i) {
            var n = this.e || (this.e = {});
            return (n[t] || (n[t] = [])).push({ fn: e, ctx: i }), this;
        },
        once: function (t, e, i) {
            var n = this;
            function s() {
                n.off(t, s), e.apply(i, arguments);
            }
            return (s._ = e), this.on(t, s, i);
        },
        emit: function (t) {
            for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), n = 0, s = i.length; n < s; n++) i[n].fn.apply(i[n].ctx, e);
            return this;
        },
        off: function (t, e) {
            var i = this.e || (this.e = {}),
                n = i[t],
                s = [];
            if (n && e) for (var o = 0, r = n.length; o < r; o++) n[o].fn !== e && n[o].fn._ !== e && s.push(n[o]);
            return s.length ? (i[t] = s) : delete i[t], this;
        },
    };
    var gt = yt,
        wt = ct(function (t, e) {
            (function () {
                (null !== e ? e : this).Lethargy = (function () {
                    function t(t, e, i, n) {
                        (this.stability = null != t ? Math.abs(t) : 8),
                            (this.sensitivity = null != e ? 1 + Math.abs(e) : 100),
                            (this.tolerance = null != i ? 1 + Math.abs(i) : 1.1),
                            (this.delay = null != n ? n : 150),
                            (this.lastUpDeltas = function () {
                                var t, e, i;
                                for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) i.push(null);
                                return i;
                            }.call(this)),
                            (this.lastDownDeltas = function () {
                                var t, e, i;
                                for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) i.push(null);
                                return i;
                            }.call(this)),
                            (this.deltasTimestamp = function () {
                                var t, e, i;
                                for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) i.push(null);
                                return i;
                            }.call(this));
                    }
                    return (
                        (t.prototype.check = function (t) {
                            var e;
                            return (
                                null != (t = t.originalEvent || t).wheelDelta ? (e = t.wheelDelta) : null != t.deltaY ? (e = -40 * t.deltaY) : (null == t.detail && 0 !== t.detail) || (e = -40 * t.detail),
                                this.deltasTimestamp.push(Date.now()),
                                this.deltasTimestamp.shift(),
                                e > 0 ? (this.lastUpDeltas.push(e), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e), this.lastDownDeltas.shift(), this.isInertia(-1))
                            );
                        }),
                        (t.prototype.isInertia = function (t) {
                            var e, i, n, s, o, r, a;
                            return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0]
                                ? t
                                : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) &&
                                      ((n = e.slice(0, this.stability)),
                                      (i = e.slice(this.stability, 2 * this.stability)),
                                      (a = n.reduce(function (t, e) {
                                          return t + e;
                                      })),
                                      (o = i.reduce(function (t, e) {
                                          return t + e;
                                      })),
                                      (r = a / n.length),
                                      (s = o / i.length),
                                      Math.abs(r) < Math.abs(s * this.tolerance) && this.sensitivity < Math.abs(s) && t);
                        }),
                        (t.prototype.showLastUpDeltas = function () {
                            return this.lastUpDeltas;
                        }),
                        (t.prototype.showLastDownDeltas = function () {
                            return this.lastDownDeltas;
                        }),
                        t
                    );
                })();
            }.call(lt));
        }),
        bt = {
            hasWheelEvent: "onwheel" in document,
            hasMouseWheelEvent: "onmousewheel" in document,
            hasTouch: "ontouchstart" in window || window.TouchEvent || (window.DocumentTouch && document instanceof DocumentTouch),
            hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
            hasPointer: !!window.navigator.msPointerEnabled,
            hasKeyDown: "onkeydown" in document,
            isFirefox: navigator.userAgent.indexOf("Firefox") > -1,
        },
        kt = Object.prototype.toString,
        xt = Object.prototype.hasOwnProperty;
    function St(t, e) {
        return function () {
            return t.apply(e, arguments);
        };
    }
    var Ct = wt.Lethargy,
        Et = "virtualscroll",
        At = Bt,
        Tt = 37,
        Lt = 38,
        Mt = 39,
        Ot = 40,
        Rt = 32;
    function Bt(t) {
        !(function (t) {
            if (!t) return console.warn("bindAll requires at least one argument.");
            var e = Array.prototype.slice.call(arguments, 1);
            if (0 === e.length) for (var i in t) xt.call(t, i) && "function" == typeof t[i] && "[object Function]" == kt.call(t[i]) && e.push(i);
            for (var n = 0; n < e.length; n++) {
                var s = e[n];
                t[s] = St(t[s], t);
            }
        })(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"),
            (this.el = window),
            t && t.el && ((this.el = t.el), delete t.el),
            (this.options = vt({ mouseMultiplier: 1, touchMultiplier: 2, firefoxMultiplier: 15, keyStep: 120, preventTouch: !1, unpreventTouchClass: "vs-touchmove-allowed", limitInertia: !1, useKeyboard: !0, useTouch: !0 }, t)),
            this.options.limitInertia && (this._lethargy = new Ct()),
            (this._emitter = new gt()),
            (this._event = { y: 0, x: 0, deltaX: 0, deltaY: 0 }),
            (this.touchStartX = null),
            (this.touchStartY = null),
            (this.bodyTouchAction = null),
            void 0 !== this.options.passive && (this.listenerOptions = { passive: this.options.passive });
    }
    function jt(t, e, i) {
        return (1 - i) * t + i * e;
    }
    function Dt(t) {
        var e = {};
        if (window.getComputedStyle) {
            var i = getComputedStyle(t),
                n = i.transform || i.webkitTransform || i.mozTransform,
                s = n.match(/^matrix3d\((.+)\)$/);
            return (
                s
                    ? ((e.x = s ? parseFloat(s[1].split(", ")[12]) : 0), (e.y = s ? parseFloat(s[1].split(", ")[13]) : 0))
                    : ((s = n.match(/^matrix\((.+)\)$/)), (e.x = s ? parseFloat(s[1].split(", ")[4]) : 0), (e.y = s ? parseFloat(s[1].split(", ")[5]) : 0)),
                e
            );
        }
    }
    function Pt(t) {
        for (var e = []; t && t !== document; t = t.parentNode) e.push(t);
        return e;
    }
    (Bt.prototype._notify = function (t) {
        var e = this._event;
        (e.x += e.deltaX), (e.y += e.deltaY), this._emitter.emit(Et, { x: e.x, y: e.y, deltaX: e.deltaX, deltaY: e.deltaY, originalEvent: t });
    }),
        (Bt.prototype._onWheel = function (t) {
            var e = this.options;
            if (!this._lethargy || !1 !== this._lethargy.check(t)) {
                var i = this._event;
                (i.deltaX = t.wheelDeltaX || -1 * t.deltaX),
                    (i.deltaY = t.wheelDeltaY || -1 * t.deltaY),
                    bt.isFirefox && 1 == t.deltaMode && ((i.deltaX *= e.firefoxMultiplier), (i.deltaY *= e.firefoxMultiplier)),
                    (i.deltaX *= e.mouseMultiplier),
                    (i.deltaY *= e.mouseMultiplier),
                    this._notify(t);
            }
        }),
        (Bt.prototype._onMouseWheel = function (t) {
            if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
                var e = this._event;
                (e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0), (e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta), this._notify(t);
            }
        }),
        (Bt.prototype._onTouchStart = function (t) {
            var e = t.targetTouches ? t.targetTouches[0] : t;
            (this.touchStartX = e.pageX), (this.touchStartY = e.pageY);
        }),
        (Bt.prototype._onTouchMove = function (t) {
            var e = this.options;
            e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
            var i = this._event,
                n = t.targetTouches ? t.targetTouches[0] : t;
            (i.deltaX = (n.pageX - this.touchStartX) * e.touchMultiplier), (i.deltaY = (n.pageY - this.touchStartY) * e.touchMultiplier), (this.touchStartX = n.pageX), (this.touchStartY = n.pageY), this._notify(t);
        }),
        (Bt.prototype._onKeyDown = function (t) {
            var e = this._event;
            e.deltaX = e.deltaY = 0;
            var i = window.innerHeight - 40;
            switch (t.keyCode) {
                case Tt:
                case Lt:
                    e.deltaY = this.options.keyStep;
                    break;
                case Mt:
                case Ot:
                    e.deltaY = -this.options.keyStep;
                    break;
                case t.shiftKey:
                    e.deltaY = i;
                    break;
                case Rt:
                    e.deltaY = -i;
                    break;
                default:
                    return;
            }
            this._notify(t);
        }),
        (Bt.prototype._bind = function () {
            bt.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions),
                bt.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions),
                bt.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions), this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)),
                bt.hasPointer &&
                    bt.hasTouchWin &&
                    ((this.bodyTouchAction = document.body.style.msTouchAction),
                    (document.body.style.msTouchAction = "none"),
                    this.el.addEventListener("MSPointerDown", this._onTouchStart, !0),
                    this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)),
                bt.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown);
        }),
        (Bt.prototype._unbind = function () {
            bt.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel),
                bt.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel),
                bt.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)),
                bt.hasPointer &&
                    bt.hasTouchWin &&
                    ((document.body.style.msTouchAction = this.bodyTouchAction), this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0), this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)),
                bt.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown);
        }),
        (Bt.prototype.on = function (t, e) {
            this._emitter.on(Et, t, e);
            var i = this._emitter.e;
            i && i[Et] && 1 === i[Et].length && this._bind();
        }),
        (Bt.prototype.off = function (t, e) {
            this._emitter.off(Et, t, e);
            var i = this._emitter.e;
            (!i[Et] || i[Et].length <= 0) && this._unbind();
        }),
        (Bt.prototype.reset = function () {
            var t = this._event;
            (t.x = 0), (t.y = 0);
        }),
        (Bt.prototype.destroy = function () {
            this._emitter.off(), this._unbind();
        });
    var It = "function" == typeof Float32Array;
    function _t(t, e) {
        return 1 - 3 * e + 3 * t;
    }
    function zt(t, e) {
        return 3 * e - 6 * t;
    }
    function Ht(t) {
        return 3 * t;
    }
    function Wt(t, e, i) {
        return ((_t(e, i) * t + zt(e, i)) * t + Ht(e)) * t;
    }
    function Ft(t, e, i) {
        return 3 * _t(e, i) * t * t + 2 * zt(e, i) * t + Ht(e);
    }
    function Yt(t) {
        return t;
    }
    var Ut = function (t, e, i, n) {
            if (!(0 <= t && t <= 1 && 0 <= i && i <= 1)) throw new Error("bezier x values must be in [0, 1] range");
            if (t === e && i === n) return Yt;
            for (var s = It ? new Float32Array(11) : new Array(11), o = 0; o < 11; ++o) s[o] = Wt(0.1 * o, t, i);
            function r(e) {
                for (var n = 0, o = 1; 10 !== o && s[o] <= e; ++o) n += 0.1;
                --o;
                var r = n + 0.1 * ((e - s[o]) / (s[o + 1] - s[o])),
                    a = Ft(r, t, i);
                return a >= 0.001
                    ? (function (t, e, i, n) {
                          for (var s = 0; s < 4; ++s) {
                              var o = Ft(e, i, n);
                              if (0 === o) return e;
                              e -= (Wt(e, i, n) - t) / o;
                          }
                          return e;
                      })(e, r, t, i)
                    : 0 === a
                    ? r
                    : (function (t, e, i, n, s) {
                          var o,
                              r,
                              a = 0;
                          do {
                              (o = Wt((r = e + (i - e) / 2), n, s) - t) > 0 ? (i = r) : (e = r);
                          } while (Math.abs(o) > 1e-7 && ++a < 10);
                          return r;
                      })(e, n, n + 0.1, t, i);
            }
            return function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : Wt(r(t), e, n);
            };
        },
        Vt = 38,
        Xt = 40,
        qt = 32,
        $t = 9,
        Nt = 33,
        Kt = 34,
        Gt = 36,
        Qt = 35,
        Zt = (function (t) {
            K(i, t);
            var e = tt(i);
            function i() {
                var t,
                    n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return (
                    U(this, i),
                    history.scrollRestoration && (history.scrollRestoration = "manual"),
                    window.scrollTo(0, 0),
                    (t = e.call(this, n)).inertia && (t.lerp = 0.1 * t.inertia),
                    (t.isScrolling = !1),
                    (t.isDraggingScrollbar = !1),
                    (t.isTicking = !1),
                    (t.hasScrollTicking = !1),
                    (t.parallaxElements = {}),
                    (t.stop = !1),
                    (t.scrollbarContainer = n.scrollbarContainer),
                    (t.checkKey = t.checkKey.bind(Z(t))),
                    window.addEventListener("keydown", t.checkKey, !1),
                    t
                );
            }
            return (
                X(i, [
                    {
                        key: "init",
                        value: function () {
                            var t = this;
                            this.html.classList.add(this.smoothClass),
                                this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction),
                                (this.instance = N({ delta: { x: this.initPosition.x, y: this.initPosition.y }, scroll: { x: this.initPosition.x, y: this.initPosition.y } }, this.instance)),
                                (this.vs = new At({
                                    el: this.scrollFromAnywhere ? document : this.el,
                                    mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : 0.4,
                                    firefoxMultiplier: this.firefoxMultiplier,
                                    touchMultiplier: this.touchMultiplier,
                                    useKeyboard: !1,
                                    passive: !0,
                                })),
                                this.vs.on(function (e) {
                                    t.stop ||
                                        t.isDraggingScrollbar ||
                                        requestAnimationFrame(function () {
                                            t.updateDelta(e), t.isScrolling || t.startScrolling();
                                        });
                                }),
                                this.setScrollLimit(),
                                this.initScrollBar(),
                                this.addSections(),
                                this.addElements(),
                                this.checkScroll(!0),
                                this.transformElements(!0, !0),
                                et(G(i.prototype), "init", this).call(this);
                        },
                    },
                    {
                        key: "setScrollLimit",
                        value: function () {
                            if (((this.instance.limit.y = this.el.offsetHeight - this.windowHeight), "horizontal" === this.direction)) {
                                for (var t = 0, e = this.el.children, i = 0; i < e.length; i++) t += e[i].offsetWidth;
                                this.instance.limit.x = t - this.windowWidth;
                            }
                        },
                    },
                    {
                        key: "startScrolling",
                        value: function () {
                            (this.startScrollTs = Date.now()), (this.isScrolling = !0), this.checkScroll(), this.html.classList.add(this.scrollingClass);
                        },
                    },
                    {
                        key: "stopScrolling",
                        value: function () {
                            cancelAnimationFrame(this.checkScrollRaf),
                                this.scrollToRaf && (cancelAnimationFrame(this.scrollToRaf), (this.scrollToRaf = null)),
                                (this.isScrolling = !1),
                                (this.instance.scroll.y = Math.round(this.instance.scroll.y)),
                                this.html.classList.remove(this.scrollingClass);
                        },
                    },
                    {
                        key: "checkKey",
                        value: function (t) {
                            var e = this;
                            if (this.stop)
                                t.keyCode == $t &&
                                    requestAnimationFrame(function () {
                                        (e.html.scrollTop = 0), (document.body.scrollTop = 0), (e.html.scrollLeft = 0), (document.body.scrollLeft = 0);
                                    });
                            else {
                                switch (t.keyCode) {
                                    case $t:
                                        requestAnimationFrame(function () {
                                            (e.html.scrollTop = 0), (document.body.scrollTop = 0), (e.html.scrollLeft = 0), (document.body.scrollLeft = 0), e.scrollTo(document.activeElement, { offset: -window.innerHeight / 2 });
                                        });
                                        break;
                                    case Vt:
                                        this.instance.delta[this.directionAxis] -= 240;
                                        break;
                                    case Xt:
                                        this.instance.delta[this.directionAxis] += 240;
                                        break;
                                    case Nt:
                                        this.instance.delta[this.directionAxis] -= window.innerHeight;
                                        break;
                                    case Kt:
                                        this.instance.delta[this.directionAxis] += window.innerHeight;
                                        break;
                                    case Gt:
                                        this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
                                        break;
                                    case Qt:
                                        this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
                                        break;
                                    case qt:
                                        document.activeElement instanceof HTMLInputElement ||
                                            document.activeElement instanceof HTMLTextAreaElement ||
                                            (t.shiftKey ? (this.instance.delta[this.directionAxis] -= window.innerHeight) : (this.instance.delta[this.directionAxis] += window.innerHeight));
                                        break;
                                    default:
                                        return;
                                }
                                this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0),
                                    this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]),
                                    this.stopScrolling(),
                                    (this.isScrolling = !0),
                                    this.checkScroll(),
                                    this.html.classList.add(this.scrollingClass);
                            }
                        },
                    },
                    {
                        key: "checkScroll",
                        value: function () {
                            var t = this,
                                e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                            if (e || this.isScrolling || this.isDraggingScrollbar) {
                                this.hasScrollTicking ||
                                    ((this.checkScrollRaf = requestAnimationFrame(function () {
                                        return t.checkScroll();
                                    })),
                                    (this.hasScrollTicking = !0)),
                                    this.updateScroll();
                                var n = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]),
                                    s = Date.now() - this.startScrollTs;
                                if (
                                    (!this.animatingScroll && s > 100 && ((n < 0.5 && 0 != this.instance.delta[this.directionAxis]) || (n < 0.5 && 0 == this.instance.delta[this.directionAxis])) && this.stopScrolling(),
                                    Object.entries(this.sections).forEach(function (i) {
                                        var n = it(i, 2),
                                            s = (n[0], n[1]);
                                        s.persistent || (t.instance.scroll[t.directionAxis] > s.offset[t.directionAxis] && t.instance.scroll[t.directionAxis] < s.limit[t.directionAxis])
                                            ? ("horizontal" === t.direction ? t.transform(s.el, -t.instance.scroll[t.directionAxis], 0) : t.transform(s.el, 0, -t.instance.scroll[t.directionAxis]),
                                              s.inView || ((s.inView = !0), (s.el.style.opacity = 1), (s.el.style.pointerEvents = "all"), s.el.setAttribute("data-".concat(t.name, "-section-inview"), "")))
                                            : ((s.inView || e) && ((s.inView = !1), (s.el.style.opacity = 0), (s.el.style.pointerEvents = "none"), s.el.removeAttribute("data-".concat(t.name, "-section-inview"))), t.transform(s.el, 0, 0));
                                    }),
                                    this.getDirection && this.addDirection(),
                                    this.getSpeed && (this.addSpeed(), (this.speedTs = Date.now())),
                                    this.detectElements(),
                                    this.transformElements(),
                                    this.hasScrollbar)
                                ) {
                                    var o = (this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis]) * this.scrollBarLimit[this.directionAxis];
                                    "horizontal" === this.direction ? this.transform(this.scrollbarThumb, o, 0) : this.transform(this.scrollbarThumb, 0, o);
                                }
                                et(G(i.prototype), "checkScroll", this).call(this), (this.hasScrollTicking = !1);
                            }
                        },
                    },
                    {
                        key: "resize",
                        value: function () {
                            (this.windowHeight = window.innerHeight), (this.windowWidth = window.innerWidth), this.checkContext(), (this.windowMiddle = { x: this.windowWidth / 2, y: this.windowHeight / 2 }), this.update();
                        },
                    },
                    {
                        key: "updateDelta",
                        value: function (t) {
                            var e,
                                i = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
                            (e = "both" === i ? t.deltaX + t.deltaY : "vertical" === i ? t.deltaY : "horizontal" === i ? t.deltaX : t.deltaY),
                                (this.instance.delta[this.directionAxis] -= e * this.multiplier),
                                this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0),
                                this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]);
                        },
                    },
                    {
                        key: "updateScroll",
                        value: function (t) {
                            this.isScrolling || this.isDraggingScrollbar
                                ? (this.instance.scroll[this.directionAxis] = jt(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp))
                                : this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis]
                                ? this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis])
                                : this.instance.scroll.y < 0
                                ? this.setScroll(this.instance.scroll[this.directionAxis], 0)
                                : this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]);
                        },
                    },
                    {
                        key: "addDirection",
                        value: function () {
                            this.instance.delta.y > this.instance.scroll.y
                                ? "down" !== this.instance.direction && (this.instance.direction = "down")
                                : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up"),
                                this.instance.delta.x > this.instance.scroll.x
                                    ? "right" !== this.instance.direction && (this.instance.direction = "right")
                                    : this.instance.delta.x < this.instance.scroll.x && "left" !== this.instance.direction && (this.instance.direction = "left");
                        },
                    },
                    {
                        key: "addSpeed",
                        value: function () {
                            this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis]
                                ? (this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs))
                                : (this.instance.speed = 0);
                        },
                    },
                    {
                        key: "initScrollBar",
                        value: function () {
                            if (
                                ((this.scrollbar = document.createElement("span")),
                                (this.scrollbarThumb = document.createElement("span")),
                                this.scrollbar.classList.add("".concat(this.scrollbarClass)),
                                this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")),
                                this.scrollbar.append(this.scrollbarThumb),
                                this.scrollbarContainer ? this.scrollbarContainer.append(this.scrollbar) : document.body.append(this.scrollbar),
                                (this.getScrollBar = this.getScrollBar.bind(this)),
                                (this.releaseScrollBar = this.releaseScrollBar.bind(this)),
                                (this.moveScrollBar = this.moveScrollBar.bind(this)),
                                this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar),
                                window.addEventListener("mouseup", this.releaseScrollBar),
                                window.addEventListener("mousemove", this.moveScrollBar),
                                (this.hasScrollbar = !1),
                                "horizontal" == this.direction)
                            ) {
                                if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                            } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                            (this.hasScrollbar = !0),
                                (this.scrollbarBCR = this.scrollbar.getBoundingClientRect()),
                                (this.scrollbarHeight = this.scrollbarBCR.height),
                                (this.scrollbarWidth = this.scrollbarBCR.width),
                                "horizontal" === this.direction
                                    ? (this.scrollbarThumb.style.width = "".concat((this.scrollbarWidth * this.scrollbarWidth) / (this.instance.limit.x + this.scrollbarWidth), "px"))
                                    : (this.scrollbarThumb.style.height = "".concat((this.scrollbarHeight * this.scrollbarHeight) / (this.instance.limit.y + this.scrollbarHeight), "px")),
                                (this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect()),
                                (this.scrollBarLimit = { x: this.scrollbarWidth - this.scrollbarThumbBCR.width, y: this.scrollbarHeight - this.scrollbarThumbBCR.height });
                        },
                    },
                    {
                        key: "reinitScrollBar",
                        value: function () {
                            if (((this.hasScrollbar = !1), "horizontal" == this.direction)) {
                                if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                            } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                            (this.hasScrollbar = !0),
                                (this.scrollbarBCR = this.scrollbar.getBoundingClientRect()),
                                (this.scrollbarHeight = this.scrollbarBCR.height),
                                (this.scrollbarWidth = this.scrollbarBCR.width),
                                "horizontal" === this.direction
                                    ? (this.scrollbarThumb.style.width = "".concat((this.scrollbarWidth * this.scrollbarWidth) / (this.instance.limit.x + this.scrollbarWidth), "px"))
                                    : (this.scrollbarThumb.style.height = "".concat((this.scrollbarHeight * this.scrollbarHeight) / (this.instance.limit.y + this.scrollbarHeight), "px")),
                                (this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect()),
                                (this.scrollBarLimit = { x: this.scrollbarWidth - this.scrollbarThumbBCR.width, y: this.scrollbarHeight - this.scrollbarThumbBCR.height });
                        },
                    },
                    {
                        key: "destroyScrollBar",
                        value: function () {
                            this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar),
                                window.removeEventListener("mouseup", this.releaseScrollBar),
                                window.removeEventListener("mousemove", this.moveScrollBar),
                                this.scrollbar.remove();
                        },
                    },
                    {
                        key: "getScrollBar",
                        value: function (t) {
                            (this.isDraggingScrollbar = !0), this.checkScroll(), this.html.classList.remove(this.scrollingClass), this.html.classList.add(this.draggingClass);
                        },
                    },
                    {
                        key: "releaseScrollBar",
                        value: function (t) {
                            (this.isDraggingScrollbar = !1), this.html.classList.add(this.scrollingClass), this.html.classList.remove(this.draggingClass);
                        },
                    },
                    {
                        key: "moveScrollBar",
                        value: function (t) {
                            var e = this;
                            this.isDraggingScrollbar &&
                                requestAnimationFrame(function () {
                                    var i = (((100 * (t.clientX - e.scrollbarBCR.left)) / e.scrollbarWidth) * e.instance.limit.x) / 100,
                                        n = (((100 * (t.clientY - e.scrollbarBCR.top)) / e.scrollbarHeight) * e.instance.limit.y) / 100;
                                    n > 0 && n < e.instance.limit.y && (e.instance.delta.y = n), i > 0 && i < e.instance.limit.x && (e.instance.delta.x = i);
                                });
                        },
                    },
                    {
                        key: "addElements",
                        value: function () {
                            var t = this;
                            (this.els = {}),
                                (this.parallaxElements = {}),
                                this.el.querySelectorAll("[data-".concat(this.name, "]")).forEach(function (e, i) {
                                    var n,
                                        s,
                                        o,
                                        r = Pt(e),
                                        a = Object.entries(t.sections)
                                            .map(function (t) {
                                                var e = it(t, 2);
                                                e[0];
                                                return e[1];
                                            })
                                            .find(function (t) {
                                                return r.includes(t.el);
                                            }),
                                        l = e.dataset[t.name + "Class"] || t.class,
                                        c = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "el" + i,
                                        h = e.dataset[t.name + "Repeat"],
                                        u = e.dataset[t.name + "Call"],
                                        d = e.dataset[t.name + "Position"],
                                        f = e.dataset[t.name + "Delay"],
                                        m = e.dataset[t.name + "Direction"],
                                        p = "string" == typeof e.dataset[t.name + "Sticky"],
                                        v = !!e.dataset[t.name + "Speed"] && parseFloat(e.dataset[t.name + "Speed"]) / 10,
                                        y = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset,
                                        g = e.dataset[t.name + "Target"],
                                        w = (o = void 0 !== g ? document.querySelector("".concat(g)) : e).getBoundingClientRect();
                                    null === a || a.inView ? ((n = w.top + t.instance.scroll.y - Dt(o).y), (s = w.left + t.instance.scroll.x - Dt(o).x)) : ((n = w.top - Dt(a.el).y - Dt(o).y), (s = w.left - Dt(a.el).x - Dt(o).x));
                                    var b = n + o.offsetHeight,
                                        k = s + o.offsetWidth,
                                        x = { x: (k - s) / 2 + s, y: (b - n) / 2 + n };
                                    if (p) {
                                        var S = e.getBoundingClientRect(),
                                            C = S.top,
                                            E = S.left,
                                            A = { x: E - s, y: C - n };
                                        (n += window.innerHeight),
                                            (s += window.innerWidth),
                                            (b = C + o.offsetHeight - e.offsetHeight - A[t.directionAxis]),
                                            (x = { x: ((k = E + o.offsetWidth - e.offsetWidth - A[t.directionAxis]) - s) / 2 + s, y: (b - n) / 2 + n });
                                    }
                                    h = "false" != h && (null != h || t.repeat);
                                    var T = [0, 0];
                                    if (y)
                                        if ("horizontal" === t.direction) {
                                            for (var L = 0; L < y.length; L++) "string" == typeof y[L] ? (y[L].includes("%") ? (T[L] = parseInt((y[L].replace("%", "") * t.windowWidth) / 100)) : (T[L] = parseInt(y[L]))) : (T[L] = y[L]);
                                            (s += T[0]), (k -= T[1]);
                                        } else {
                                            for (L = 0; L < y.length; L++) "string" == typeof y[L] ? (y[L].includes("%") ? (T[L] = parseInt((y[L].replace("%", "") * t.windowHeight) / 100)) : (T[L] = parseInt(y[L]))) : (T[L] = y[L]);
                                            (n += T[0]), (b -= T[1]);
                                        }
                                    var M = {
                                        el: e,
                                        id: c,
                                        class: l,
                                        section: a,
                                        top: n,
                                        middle: x,
                                        bottom: b,
                                        left: s,
                                        right: k,
                                        offset: y,
                                        progress: 0,
                                        repeat: h,
                                        inView: !1,
                                        call: u,
                                        speed: v,
                                        delay: f,
                                        position: d,
                                        target: o,
                                        direction: m,
                                        sticky: p,
                                    };
                                    (t.els[c] = M), e.classList.contains(l) && t.setInView(t.els[c], c), (!1 !== v || p) && (t.parallaxElements[c] = M);
                                });
                        },
                    },
                    {
                        key: "addSections",
                        value: function () {
                            var t = this;
                            this.sections = {};
                            var e = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                            0 === e.length && (e = [this.el]),
                                e.forEach(function (e, i) {
                                    var n = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "section" + i,
                                        s = e.getBoundingClientRect(),
                                        o = { x: s.left - 1.5 * window.innerWidth - Dt(e).x, y: s.top - 1.5 * window.innerHeight - Dt(e).y },
                                        r = { x: o.x + s.width + 2 * window.innerWidth, y: o.y + s.height + 2 * window.innerHeight },
                                        a = "string" == typeof e.dataset[t.name + "Persistent"];
                                    e.setAttribute("data-scroll-section-id", n);
                                    var l = { el: e, offset: o, limit: r, inView: !1, persistent: a, id: n };
                                    t.sections[n] = l;
                                });
                        },
                    },
                    {
                        key: "transform",
                        value: function (t, e, i, n) {
                            var s;
                            if (n) {
                                var o = Dt(t),
                                    r = jt(o.x, e, n),
                                    a = jt(o.y, i, n);
                                s = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(r, ",").concat(a, ",0,1)");
                            } else s = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(e, ",").concat(i, ",0,1)");
                            (t.style.webkitTransform = s), (t.style.msTransform = s), (t.style.transform = s);
                        },
                    },
                    {
                        key: "transformElements",
                        value: function (t) {
                            var e = this,
                                i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                n = this.instance.scroll.x + this.windowWidth,
                                s = this.instance.scroll.y + this.windowHeight,
                                o = { x: this.instance.scroll.x + this.windowMiddle.x, y: this.instance.scroll.y + this.windowMiddle.y };
                            Object.entries(this.parallaxElements).forEach(function (r) {
                                var a = it(r, 2),
                                    l = (a[0], a[1]),
                                    c = !1;
                                if ((t && (c = 0), l.inView || i))
                                    switch (l.position) {
                                        case "top":
                                            c = e.instance.scroll[e.directionAxis] * -l.speed;
                                            break;
                                        case "elementTop":
                                            c = (s - l.top) * -l.speed;
                                            break;
                                        case "bottom":
                                            c = (e.instance.limit[e.directionAxis] - s + e.windowHeight) * l.speed;
                                            break;
                                        case "left":
                                            c = e.instance.scroll[e.directionAxis] * -l.speed;
                                            break;
                                        case "elementLeft":
                                            c = (n - l.left) * -l.speed;
                                            break;
                                        case "right":
                                            c = (e.instance.limit[e.directionAxis] - n + e.windowHeight) * l.speed;
                                            break;
                                        default:
                                            c = (o[e.directionAxis] - l.middle[e.directionAxis]) * -l.speed;
                                    }
                                l.sticky &&
                                    (c = l.inView
                                        ? "horizontal" === e.direction
                                            ? e.instance.scroll.x - l.left + window.innerWidth
                                            : e.instance.scroll.y - l.top + window.innerHeight
                                        : "horizontal" === e.direction
                                        ? e.instance.scroll.x < l.left - window.innerWidth && e.instance.scroll.x < l.left - window.innerWidth / 2
                                            ? 0
                                            : e.instance.scroll.x > l.right && e.instance.scroll.x > l.right + 100 && l.right - l.left + window.innerWidth
                                        : e.instance.scroll.y < l.top - window.innerHeight && e.instance.scroll.y < l.top - window.innerHeight / 2
                                        ? 0
                                        : e.instance.scroll.y > l.bottom && e.instance.scroll.y > l.bottom + 100 && l.bottom - l.top + window.innerHeight),
                                    !1 !== c && ("horizontal" === l.direction || ("horizontal" === e.direction && "vertical" !== l.direction) ? e.transform(l.el, c, 0, !t && l.delay) : e.transform(l.el, 0, c, !t && l.delay));
                            });
                        },
                    },
                    {
                        key: "scrollTo",
                        value: function (t) {
                            var e = this,
                                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                n = parseInt(i.offset) || 0,
                                s = isNaN(parseInt(i.duration)) ? 1e3 : parseInt(i.duration),
                                o = i.easing || [0.25, 0, 0.35, 1],
                                r = !!i.disableLerp,
                                a = !!i.callback && i.callback;
                            if (((o = Ut.apply(void 0, nt(o))), "string" == typeof t)) {
                                if ("top" === t) t = 0;
                                else if ("bottom" === t) t = this.instance.limit.y;
                                else if ("left" === t) t = 0;
                                else if ("right" === t) t = this.instance.limit.x;
                                else if (!(t = document.querySelector(t))) return;
                            } else if ("number" == typeof t) t = parseInt(t);
                            else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid");
                            if ("number" != typeof t) {
                                var l = Pt(t).includes(this.el);
                                if (!l) return;
                                var c = t.getBoundingClientRect(),
                                    h = c.top,
                                    u = c.left,
                                    d = Pt(t),
                                    f = d.find(function (t) {
                                        return Object.entries(e.sections)
                                            .map(function (t) {
                                                var e = it(t, 2);
                                                e[0];
                                                return e[1];
                                            })
                                            .find(function (e) {
                                                return e.el == t;
                                            });
                                    }),
                                    m = 0;
                                (m = f ? Dt(f)[this.directionAxis] : -this.instance.scroll[this.directionAxis]), (n = "horizontal" === this.direction ? u + n - m : h + n - m);
                            } else n = t + n;
                            var p = parseFloat(this.instance.delta[this.directionAxis]),
                                v = Math.max(0, Math.min(n, this.instance.limit[this.directionAxis])),
                                y = v - p,
                                g = function (t) {
                                    r ? ("horizontal" === e.direction ? e.setScroll(p + y * t, e.instance.delta.y) : e.setScroll(e.instance.delta.x, p + y * t)) : (e.instance.delta[e.directionAxis] = p + y * t);
                                };
                            (this.animatingScroll = !0), this.stopScrolling(), this.startScrolling();
                            var w = Date.now(),
                                b = function t() {
                                    var i = (Date.now() - w) / s;
                                    i > 1 ? (g(1), (e.animatingScroll = !1), 0 == s && e.update(), a && a()) : ((e.scrollToRaf = requestAnimationFrame(t)), g(o(i)));
                                };
                            b();
                        },
                    },
                    {
                        key: "update",
                        value: function () {
                            this.setScrollLimit(), this.addSections(), this.addElements(), this.detectElements(), this.updateScroll(), this.transformElements(!0), this.reinitScrollBar(), this.checkScroll(!0);
                        },
                    },
                    {
                        key: "startScroll",
                        value: function () {
                            this.stop = !1;
                        },
                    },
                    {
                        key: "stopScroll",
                        value: function () {
                            this.stop = !0;
                        },
                    },
                    {
                        key: "setScroll",
                        value: function (t, e) {
                            this.instance = N(N({}, this.instance), {}, { scroll: { x: t, y: e }, delta: { x: t, y: e }, speed: 0 });
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            et(G(i.prototype), "destroy", this).call(this),
                                this.stopScrolling(),
                                this.html.classList.remove(this.smoothClass),
                                this.vs.destroy(),
                                this.destroyScrollBar(),
                                window.removeEventListener("keydown", this.checkKey, !1);
                        },
                    },
                ]),
                i
            );
        })(at),
        Jt = (function () {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                U(this, t),
                    (this.options = e),
                    Object.assign(this, rt, e),
                    (this.smartphone = rt.smartphone),
                    e.smartphone && Object.assign(this.smartphone, e.smartphone),
                    (this.tablet = rt.tablet),
                    e.tablet && Object.assign(this.tablet, e.tablet),
                    this.smooth || "horizontal" != this.direction || console.warn("ðŸš¨ `smooth:false` & `horizontal` direction are not yet compatible"),
                    this.tablet.smooth || "horizontal" != this.tablet.direction || console.warn("ðŸš¨ `smooth:false` & `horizontal` direction are not yet compatible (tablet)"),
                    this.smartphone.smooth || "horizontal" != this.smartphone.direction || console.warn("ðŸš¨ `smooth:false` & `horizontal` direction are not yet compatible (smartphone)"),
                    this.init();
            }
            return (
                X(t, [
                    {
                        key: "init",
                        value: function () {
                            if (
                                ((this.options.isMobile =
                                    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1) || window.innerWidth < this.tablet.breakpoint),
                                (this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint),
                                (this.smooth && !this.options.isMobile) || (this.tablet.smooth && this.options.isTablet) || (this.smartphone.smooth && this.options.isMobile && !this.options.isTablet)
                                    ? (this.scroll = new Zt(this.options))
                                    : (this.scroll = new ut(this.options)),
                                this.scroll.init(),
                                window.location.hash)
                            ) {
                                var t = window.location.hash.slice(1, window.location.hash.length),
                                    e = document.getElementById(t);
                                e && this.scroll.scrollTo(e);
                            }
                        },
                    },
                    {
                        key: "update",
                        value: function () {
                            this.scroll.update();
                        },
                    },
                    {
                        key: "start",
                        value: function () {
                            this.scroll.startScroll();
                        },
                    },
                    {
                        key: "stop",
                        value: function () {
                            this.scroll.stopScroll();
                        },
                    },
                    {
                        key: "scrollTo",
                        value: function (t, e) {
                            this.scroll.scrollTo(t, e);
                        },
                    },
                    {
                        key: "setScroll",
                        value: function (t, e) {
                            this.scroll.setScroll(t, e);
                        },
                    },
                    {
                        key: "on",
                        value: function (t, e) {
                            this.scroll.setEvents(t, e);
                        },
                    },
                    {
                        key: "off",
                        value: function (t, e) {
                            this.scroll.unsetEvents(t, e);
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            this.scroll.destroy();
                        },
                    },
                ]),
                t
            );
        })(),
        te = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                return d(this, i), e.call(this, t);
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            var t = this;
                            (this.$skewedSections = document.querySelectorAll("[data-scroll-skewed]")),
                                (this.speedRatio = window.isMobile ? 2 : 0.15),
                                (this.isMobile = window.isMobile),
                                k.setAttribute("data-theme", this.el.getAttribute("data-theme") || "light"),
                                k.setAttribute("data-template", this.el.getAttribute("data-template") || ""),
                                setTimeout(function () {
                                    (t.scroll = new Jt({ el: t.el, smooth: !window.isIE, getSpeed: !0, offset: ["15%"] })),
                                        (t.speed = 0),
                                        (t.lerpedSpeed = 0),
                                        (t.oldSpeed = 0),
                                        t.animate(),
                                        t.scroll.on("call", function (e, i, n, s) {
                                            t.call(e[0], { way: i, obj: n }, e[1], e[2]);
                                        }),
                                        t.scroll.on("scroll", function (e) {
                                            if ((t.isMobile || t.call("updateHealth", e.scroll.y / e.limit.y, "Ui"), "object" === u(e.currentElements["video-header"]))) {
                                                var i = e.currentElements["video-header"].progress;
                                                e.currentElements["video-header"].el.style.opacity = 1 - 4 * (i - 0.5);
                                            }
                                            (t.speed = e.speed * t.speedRatio), (t.oldSpeed = t.speed), e.scroll.y > 150 ? k.classList.add("has-scrolled") : k.classList.remove("has-scrolled");
                                        });
                                }, 600);
                        },
                    },
                    {
                        key: "animate",
                        value: function () {
                            var t = this;
                            if (
                                ((this.raf = requestAnimationFrame(function () {
                                    return t.animate();
                                })),
                                isNaN(this.speed) ||
                                    (Math.ceil(100 * this.lerpedSpeed) / 100 == Math.ceil(100 * this.oldSpeed) / 100 ? (this.lerpedSpeed = M(this.lerpedSpeed, 0, 0.05)) : (this.lerpedSpeed = M(this.lerpedSpeed, this.speed, 0.1)),
                                    (this.oldSpeed = this.lerpedSpeed)),
                                (this.lerpedSpeed < 1 && this.lerpedSpeed > 1) || Math.abs(this.lerpedSpeed) < 0.05)
                            )
                                return !1;
                            for (var e = 0; e < this.$skewedSections.length; e++) {
                                var i = this.$skewedSections[e],
                                    n = this.lerpedSpeed > 0 ? Math.min(this.lerpedSpeed, 2) : Math.max(this.lerpedSpeed, -2);
                                A(i, "skewY(".concat(n, "deg)"));
                            }
                        },
                    },
                    {
                        key: "toggleLazy",
                        value: function (t) {
                            var e = this.getData("lazy", t.obj.el);
                            e.length && ("IMG" == t.obj.el.tagName ? (t.obj.el.src = e) : (t.obj.el.style.backgroundImage = "url(".concat(e, ")")), this.setData("lazy", "", t.obj.el));
                        },
                    },
                    {
                        key: "update",
                        value: function () {
                            this.scroll.update();
                        },
                    },
                    {
                        key: "scrollTo",
                        value: function (t) {
                            console.log(t), this.scroll.scrollTo(t.target, t.options);
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            this.scroll.destroy(), cancelAnimationFrame(this.raf);
                        },
                    },
                ]),
                i
            );
        })(c),
        ee = (function () {
            function t(e, i, n) {
                var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
                    o = arguments.length > 4 ? arguments[4] : void 0;
                d(this, t),
                    (this.color = n),
                    (this.size = (window.innerWidth / 40) * (Math.random() + 1)),
                    (this.baseX = Math.random() * (e - this.size) + this.size),
                    (this.baseY = Math.random() * (i - this.size) + this.size),
                    (this.noiseGenerator = new O(Math.random() + 1)),
                    (this.i = 0),
                    (this.direction = s),
                    (this.id = o),
                    (this.points = [
                        { x: 0, y: 0 },
                        { x: 0, y: 0 },
                        { x: 0, y: 0 },
                    ]),
                    this.generatePoints(this.baseX, this.baseY);
            }
            return (
                m(t, [
                    {
                        key: "render",
                        value: function (t) {
                            this.i >= 256 && (this.direction = -1), this.i <= 0 && (this.direction = 1), (this.i += 0.1 * this.direction);
                            var e = this.noiseGenerator.getVal(this.i) - 0.5,
                                i = this.noiseGenerator.getVal(this.i / 2) - 0.5;
                            t.beginPath();
                            var n = this.baseX - 50 * e,
                                s = this.baseY - 40 * i;
                            this.generatePoints(n, s),
                                t.moveTo(this.points[0].x, this.points[0].y),
                                t.lineTo(this.points[1].x, this.points[1].y),
                                t.lineTo(this.points[2].x, this.points[2].y),
                                (t.fillStyle = this.color),
                                t.fill(),
                                t.closePath();
                        },
                    },
                    {
                        key: "generatePoints",
                        value: function (t, e) {
                            0 === this.id
                                ? ((this.points[0].x = t), (this.points[0].y = e), (this.points[1].x = t + this.size), (this.points[1].y = e + 10), (this.points[2].x = t + this.size / 2.1), (this.points[2].y = e - this.size))
                                : 1 === this.id
                                ? ((this.points[0].x = t), (this.points[0].y = e), (this.points[1].x = t + this.size / 2), (this.points[1].y = e - this.size), (this.points[2].x = t + this.size), (this.points[2].y = e + 20))
                                : 2 === this.id &&
                                  ((this.points[0].x = t), (this.points[0].y = e), (this.points[1].x = t + this.size / 2), (this.points[1].y = e - this.size), (this.points[2].x = t + this.size), (this.points[2].y = e - 20));
                        },
                    },
                ]),
                t
            );
        })(),
        ie = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                return d(this, i), e.call(this, t);
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            (this.canvas = document.createElement("canvas")),
                                (this.context = this.canvas.getContext("2d")),
                                this.canvas.classList.add("c-shapes_canvas"),
                                this.el.appendChild(this.canvas),
                                this.resize(),
                                (this.resizeBind = this.resize.bind(this)),
                                window.addEventListener("resize", this.resizeBind),
                                (this.triangles = new Array()),
                                this.triangles.push(new ee(this.canvas.width, this.canvas.height, "#34adb6", 1, 0)),
                                this.triangles.push(new ee(this.canvas.width, this.canvas.height, "#269eb9", -1, 1)),
                                this.triangles.push(new ee(this.canvas.width, this.canvas.height, "#2ea6b7", 1, 2)),
                                (this.isRenderable = !0);
                        },
                    },
                    {
                        key: "render",
                        value: function () {
                            var t = this;
                            if (
                                ((this.raf = requestAnimationFrame(function () {
                                    return t.render();
                                })),
                                this.isRenderable)
                            ) {
                                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                                for (var e = 0; e < this.triangles.length; e++) {
                                    this.triangles[e].render(this.context);
                                }
                            }
                        },
                    },
                    {
                        key: "trigger",
                        value: function (t) {
                            cancelAnimationFrame(this.raf), "enter" === t.way ? this.render() : cancelAnimationFrame(this.raf);
                        },
                    },
                    {
                        key: "resize",
                        value: function () {
                            (this.canvas.width = this.el.getBoundingClientRect().width), (this.canvas.height = this.el.getBoundingClientRect().height);
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            void 0 !== this.raf && cancelAnimationFrame(this.raf), window.removeEventListener("resize", this.resizeBind);
                        },
                    },
                ]),
                i
            );
        })(c),
        ne = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return d(this, i), ((n = e.call(this, t)).events = { click: { share: "share" } }), n;
            }
            return (
                m(i, [
                    { key: "init", value: function () {} },
                    {
                        key: "share",
                        value: function (t) {
                            var e = t.curTarget,
                                i = this.getData("url", e) || window.location.href,
                                n = this.getData("text", e) || document.title;
                            switch (this.getData("platform", e)) {
                                case "facebook":
                                    this.openWindow("https://facebook.com/sharer/sharer.php?u=" + i);
                                    break;
                                case "twitter":
                                    this.openWindow("https://twitter.com/share?url=" + i + "&text=" + encodeURIComponent(n));
                                    break;
                                case "mail":
                                    var s = this.getData("subject", e) || n,
                                        o = this.getData("body", e) || i;
                                    this.openMail(s, o);
                            }
                        },
                    },
                    {
                        key: "openWindow",
                        value: function (t) {
                            window.open(t, "Share", "menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=500, width=600");
                        },
                    },
                    {
                        key: "openMail",
                        value: function (t, e) {
                            window.location = "mailto:?subject=" + encodeURIComponent(t) + "&body=" + encodeURIComponent(e);
                        },
                    },
                    { key: "destroy", value: function () {} },
                ]),
                i
            );
        })(c),
        se = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return d(this, i), ((n = e.call(this, t)).events = { click: { prev: "prev", next: "next" } }), n;
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            this.swiper = new Swiper(this.el, { loop: !0, slidesPerView: 1, speed: 600 });
                        },
                    },
                    {
                        key: "prev",
                        value: function () {
                            this.swiper.slidePrev();
                        },
                    },
                    {
                        key: "next",
                        value: function () {
                            this.swiper.slideNext();
                        },
                    },
                ]),
                i
            );
        })(c),
        oe = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                return d(this, i), e.call(this, t);
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            new SplitText(this.el, { type: null !== this.getData("type") ? this.getData("type") : "lines" });
                        },
                    },
                ]),
                i
            );
        })(c),
        re = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                var n;
                return d(this, i), ((n = e.call(this, t)).events = { click: "trigger" }), n;
            }
            return (
                m(i, [
                    { key: "init", value: function () {} },
                    {
                        key: "trigger",
                        value: function (t) {
                            this.call("open", { provider: this.el.getAttribute("data-embed-provider"), html: this.el.getAttribute("data-embed-html"), id: this.el.getAttribute("data-embed-id") }, "Popup");
                        },
                    },
                ]),
                i
            );
        })(c),
        ae = (function (t) {
            p(i, t);
            var e = w(i);
            function i(t) {
                return d(this, i), e.call(this, t);
            }
            return (
                m(i, [
                    {
                        key: "init",
                        value: function () {
                            var t = this;
                            window.isMobile ||
                                ((this.ammoReloadValue = 30),
                                (this.fireIsAvailable = !0),
                                (this.$health = this.$("health")[0]),
                                (this.$ammo = this.$("ammo")[0]),
                                (this.ammoValue = window.savedAmmo ? window.savedAmmo : this.ammoReloadValue),
                                (this.$ammo.innerText = this.pad(this.ammoValue, 2)),
                                this.ammoValue <= 10 && this.el.classList.add("has-low-ammo"),
                                (this.clickBind = this.click.bind(this)),
                                document.addEventListener("click", this.clickBind),
                                (this.clickElementsBind = this.onLinkClick.bind(this)),
                                (this.clickElements = document.querySelectorAll("a, button, .js-click-element")),
                                this.clickElements.forEach(function (e) {
                                    e.addEventListener("click", t.clickElementsBind);
                                }));
                        },
                    },
                    {
                        key: "tick",
                        value: function () {
                            this.date.setTime(this.date.getTime() - 1e3), (this.$minutes.innerText = this.pad(this.date.getMinutes(), 2)), (this.$seconds.innerText = this.pad(this.date.getSeconds(), 2));
                        },
                    },
                    {
                        key: "click",
                        value: function (t) {
                            this.fireIsAvailable &&
                                (this.ammoValue > 0 && (this.ammoValue--, (this.$ammo.innerText = this.pad(this.ammoValue, 2))),
                                0 === this.ammoValue && (this.disableFire(), this.call("fly", "Llama")),
                                10 == this.ammoValue && this.hasLowAmmo(),
                                (window.savedAmmo = this.ammoValue));
                        },
                    },
                    {
                        key: "reloadAmmo",
                        value: function () {
                            (this.ammoValue = this.ammoReloadValue), (this.$ammo.innerText = this.pad(this.ammoValue, 2)), this.el.classList.remove("has-low-ammo"), (window.savedAmmo = this.ammoValue);
                        },
                    },
                    {
                        key: "enableFire",
                        value: function () {
                            this.fireIsAvailable = !0;
                        },
                    },
                    {
                        key: "disableFire",
                        value: function () {
                            this.fireIsAvailable = !1;
                        },
                    },
                    {
                        key: "hasLowAmmo",
                        value: function () {
                            this.disableFire(), this.call("sayHello", "Llama"), this.el.classList.add("has-low-ammo");
                        },
                    },
                    {
                        key: "onLinkClick",
                        value: function (t) {
                            var e = document.querySelector(".js-impact").cloneNode(!0);
                            e.classList.add("c-ui_impact"), (e.style.top = "".concat(t.clientY, "px")), (e.style.left = "".concat(t.clientX, "px")), (e.style.display = "block"), x.appendChild(e);
                            var i = e.querySelectorAll("span"),
                                n = new gsap.timeline();
                            i.forEach(function (t, e) {
                                e <= 4 && n.to(t, { duration: 0.6, x: 150 * Math.random() - 75, y: 150 * Math.random() - 75, rotate: 360 * Math.random() - 180, alpha: 1 }, 0);
                            }),
                                setTimeout(function () {
                                    e.classList.add("is-animated");
                                }, 100),
                                setTimeout(function () {
                                    e.remove();
                                }, 1e3);
                        },
                    },
                    {
                        key: "updateHealth",
                        value: function (t) {
                            A(this.$health, "scaleX(".concat(t));
                        },
                    },
                    {
                        key: "pad",
                        value: function (t, e, i) {
                            return (i = i || "0"), (t += "").length >= e ? t : new Array(e - t.length + 1).join(i) + t;
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            var t = this;
                            window.isMobile ||
                                this.clickElements.forEach(function (e) {
                                    e.removeEventListener("click", t.clickElementsBind);
                                });
                        },
                    },
                ]),
                i
            );
        })(c),
        le = Object.freeze({
            __proto__: null,
            Accordion: C,
            Cursor: T,
            Form: L,
            GlImage: B,
            KonamiCode: j,
            Llama: D,
            Load: H,
            Menu: W,
            MenuButton: F,
            Popup: Y,
            Scroll: te,
            Shapes: ie,
            Share: ne,
            Slider: se,
            Split: oe,
            TriggerPopup: re,
            Ui: ae,
        }),
        ce = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var he = (function (t, e) {
        return t((e = { exports: {} }), e.exports), e.exports;
    })(function (t) {
        var e, i;
        (e = ce),
            (i = function () {
                function t(t, e, i) {
                    if (i) {
                        var n = document.createDocumentFragment(),
                            s = !e.hasAttribute("viewBox") && i.getAttribute("viewBox");
                        s && e.setAttribute("viewBox", s);
                        for (var o = i.cloneNode(!0); o.childNodes.length; ) n.appendChild(o.firstChild);
                        t.appendChild(n);
                    }
                }
                function e(e) {
                    (e.onreadystatechange = function () {
                        if (4 === e.readyState) {
                            var i = e._cachedDocument;
                            i || (((i = e._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = e.responseText), (e._cachedTarget = {})),
                                e._embeds.splice(0).map(function (n) {
                                    var s = e._cachedTarget[n.id];
                                    s || (s = e._cachedTarget[n.id] = i.getElementById(n.id)), t(n.parent, n.svg, s);
                                });
                        }
                    }),
                        e.onreadystatechange();
                }
                function i(t) {
                    for (var e = t; "svg" !== e.nodeName.toLowerCase() && (e = e.parentNode); );
                    return e;
                }
                return function (n) {
                    var s,
                        o = Object(n),
                        r = window.top !== window.self;
                    s =
                        "polyfill" in o
                            ? o.polyfill
                            : /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) ||
                              (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 ||
                              (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537 ||
                              (/\bEdge\/.(\d+)\b/.test(navigator.userAgent) && r);
                    var a = {},
                        l = window.requestAnimationFrame || setTimeout,
                        c = document.getElementsByTagName("use"),
                        h = 0;
                    s &&
                        (function n() {
                            for (var r = 0; r < c.length; ) {
                                var u = c[r],
                                    d = u.parentNode,
                                    f = i(d),
                                    m = u.getAttribute("xlink:href") || u.getAttribute("href");
                                if ((!m && o.attributeName && (m = u.getAttribute(o.attributeName)), f && m)) {
                                    if (s)
                                        if (!o.validate || o.validate(m, f, u)) {
                                            d.removeChild(u);
                                            var p = m.split("#"),
                                                v = p.shift(),
                                                y = p.join("#");
                                            if (v.length) {
                                                var g = a[v];
                                                g || ((g = a[v] = new XMLHttpRequest()).open("GET", v), g.send(), (g._embeds = [])), g._embeds.push({ parent: d, svg: f, id: y }), e(g);
                                            } else t(d, f, document.getElementById(y));
                                        } else ++r, ++h;
                                } else ++r;
                            }
                            (!c.length || c.length - h > 0) && l(n, 67);
                        })();
                };
            }),
            t.exports ? (t.exports = i()) : (e.svg4everybody = i());
    });
    var ue = new h({ modules: le });
    function de() {
        ue.init(ue),
            (function () {
                he();
                var t = window.wpcf7,
                    e = window.jQuery;
                e &&
                    t &&
                    !t.enhanced &&
                    ((t.enhanced = !0),
                    (t._initForm = t.initForm),
                    (t.initForm = function (i) {
                        (i = e(i)),
                            t._initForm(i),
                            i.each(function () {
                                this.dataset.wpcf7 = "1";
                            });
                    }),
                    (t.toggleSubmit = function (t, i) {
                        var n = e(t),
                            s = e(":submit", n);
                        void 0 === i
                            ? n.hasClass("wpcf7-acceptance-as-validation") ||
                              (s.prop("disabled", !1),
                              e(".wpcf7-acceptance", n).each(function () {
                                  var t = e(this),
                                      i = e("input:checkbox", t);
                                  if (!t.hasClass("optional") && ((t.hasClass("invert") && i.is(":checked")) || (!t.hasClass("invert") && !i.is(":checked")))) return s.prop("disabled", !0), !1;
                              }))
                            : s.prop("disabled", !i);
                    }));
            })(),
            k.classList.add("is-first-load"),
            setTimeout(function () {
                k.classList.add("is-loaded"),
                    k.classList.add("is-ready"),
                    k.classList.remove("is-loading"),
                    setTimeout(function () {
                        k.classList.add("is-animated");
                    }, 1200);
            }, 800);
    }
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
})();
