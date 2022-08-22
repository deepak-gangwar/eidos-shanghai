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
})(c)