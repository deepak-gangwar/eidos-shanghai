const vertexShader = `\n    precision highp float;\n    precision highp int;\n    attribute vec2 uv;\n    attribute vec3 position;\n    attribute vec3 normal;\n    uniform mat4 modelViewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat3 normalMatrix;\n\n    uniform sampler2D maskTexture;\n    uniform float speed;\n    uniform float scale;\n    uniform vec2 maskPosition;\n    varying vec2 maskUv;\n    varying vec2 vUv;\n    varying vec3 vNormal;\n\n    varying vec3 newPosition;\n    varying vec4 maskColor;\n\n    void main() {\n\n        // vNormal = normalize(normalMatrix * normal);\n\n        vUv = uv;\n\n        newPosition = vec3(position.x , position.y , position.z);\n\n        maskUv = uv + maskPosition;\n\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);\n    }\n`
const fragmentShader = `\n    precision highp float;\n    precision highp int;\n    uniform sampler2D texture;\n    uniform sampler2D maskTexture;\n    uniform float speed;\n\n    varying vec2 vUv;\n    varying vec3 vNormal;\n    varying vec3 newPosition;\n    uniform vec2 maskPosition;\n    varying vec2 maskUv;\n\n    void main() {\n\n        vec3 normal = normalize(vNormal);\n        vec4 textureColor = texture2D(texture, vUv);\n        // vec4 maskColor = texture2D(maskTexture, maskUv);\n\n        // textureColor.a = maskColor.r;\n\n        gl_FragColor.rgb = textureColor.rgb;\n\n        float distord = 0.2;\n        float intensity = - speed * 8.;\n        float distordLeft = distord + ((vUv.y * 2.) * (-intensity * (maskPosition.y - 0.5)));\n        float distordRight = distord + ((vUv.y * 2.) * (intensity * (maskPosition.y - 0.5)));\n\n        // Cool bubbly/curvy effect\n        //float distordLeft = distord + (sin((vUv.y + maskPosition.y - 0.5) * 3.14) * (intensity));\n        //float distordRight = distord + (sin((vUv.y + maskPosition.y - 0.5) * 3.14) * (- intensity));\n\n        float maskLeft = 1. - smoothstep(vUv.x - 0.001, vUv.x + 0.001, (maskPosition.x - distordLeft) < 1.0 - (distordLeft * 2.0) ? maskPosition.x - distordLeft : 1.0 - (distordLeft * 2.0));\n        float maskRight = smoothstep(vUv.x - 0.001, vUv.x + 0.001, (maskPosition.x + distordRight) > (distordRight * 2.0) ? maskPosition.x + distordRight : distordRight * 2.0 );\n\n        float mask = min(maskLeft, maskRight);\n\n        gl_FragColor.a = max(mask,-.1);\n\n        // FOR IOS LOOOOOL\n        gl_FragColor.rgb *= gl_FragColor.a;\n\n    }\n`

function lerp(t, e, i) {
    return (1 - i) * t + i * e;
}

class Gl {
    constructor() {
        // this.isMobile = window.isMobile
        if(!window.isIE) {
            // window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", function () {
            //     this.isMobile = !0;
            // })
        }

        // this all stuff below has to go inside the above if()
        this.el.classList.add('is-loading')
        this.maskSrc = this.getData("mask-src")
        this.gap = this.getData("gap")
        
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
        this.BCR = this.el.getBoundingClientRect()
        this.planeBCR = { 
            width: 1, 
            height: 1, 
            x: 0, 
            y: 0 
        }

        this.inView = true
        this.isLoaded = false
        this.isRenderable = true
        
        this.maskPosition = new Vec2(1, 0)
        this.mouse = new Vec2(-0.5, -0.5)
        
        this.now = 0
        this.settings = { 
            factor: 0, 
            factorAim: this.getData("factor"), 
            speed: 0 
        }

        this.$wrap = null
        this.$media = null
    }

    bind() {
        ['initShape', 'render']
        .forEach(fn => this[fn] = this[fn].bind(this))
    }

    init() {
        if(!window.isIE) {
            this.$wrap = this.$("wrap")[0]

            if (this.$wrap) {
                this.$media = this.$("media")[0]

                if (this.$media) {
                    this.renderer = new Renderer({ dpr: 1, antialias: !0, premultiplyAlpha: !1, alpha: !0 })
                    this.renderer.setSize(this.BCR.width, this.BCR.height)
                    this.gl = this.renderer.gl
                    this.gl.clearColor(247 / 255, 245 / 255, 248 / 255, 1)
                    this.$wrap.appendChild(this.gl.canvas)

                    this.isMobile
                    this.initScene()
                    this.initCamera()
                    this.initShape()
                    this.addEventListeners()

                } else {
                    S && console.debug("GLImage.init:", "Skipping module. Missing media.")
                }
            } else {
                S && console.debug("GLImage.init:", "Skipping module. Missing wrapper.")
            }
        }
    }

    trigger(t) {
        if(!window.isIE) {
            cancelAnimationFrame(this.raf)
            if(t.way === "enter") {
                this.render(this.now)
                this.isRenderable = true
            } else {
                this.isRenderable = false
                gsap.to(this.settings, 0.6, { speed: 0 })
            }
        }
    }

    initScene() {
        this.scene = new Transform()
    }

    initCamera() {
        this.fov = 75
        this.camera = new Camera(this.glElement, { fov: this.fov })
        this.camera.position.set(0, 0, 1)
    }

    initShape() {
        this.geometry = new Plane(this.gl, { width: 1, height: 1, widthSegments: 10, heightSegments: 10 })
        this.texture = new Texture(this.gl, { minFilter: this.gl.LINEAR })

        // var texture = new Texture(this.gl, { minFilter: this.gl.LINEAR }),
        // image = new Image();
        const texture = new Texture(this.gl, { minFilter: this.gl.LINEAR })
        const image = new Image()
        
        image.src = this.maskSrc
        image.onload = function () {
            texture.image = image

            if(this.$media instanceof HTMLVideoElement) {
                this.$media.load()
                this.$media.play()
            }

            this.program = new Program(this.gl, {
                vertex: vertexShader,
                fragment: fragmentShader,
                uniforms: { 
                    maskTexture: { value: texture }, 
                    maskPosition: { value: new Vec2(1, 0) }, 
                    texture: { value: this.texture }, 
                    speed: { value: this.settings.speed } 
                },
            })

            this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program })

            this.updateSize()
            this.isLoaded = true
            this.el.classList.remove('is-loading')
            setTimeout(function () {
                this.resize()
            }, 1000)
            
            // return this.isMobile
        }
    }

    calculateUnitSize(z) {
        let e = (this.fov * Math.PI) / 180,
            i = 2 * Math.tan(e / 2) * z
        return { width: i * this.camera.aspect, height: i }
    }

    updateSize() {
        this.camUnit = this.calculateUnitSize(this.camera.position.z)
        this.planeBCR.width = this.camUnit.width - this.camUnit.width * (this.gap / 100)
        this.planeBCR.height = this.planeBCR.width / this.camera.aspect

        this.geometry = new Plane(this.gl, { width: this.planeBCR.width, height: this.planeBCR.height, widthSegments: 100, heightSegments: 100 })
        this.mesh.geometry = this.geometry

        this.gl.canvas.style.width = `${this.BCR.width}px`
        this.gl.canvas.style.height = `${this.BCR.height}px`
    }

    moseenter(e) {
        this.isRenderable = true
        this.formatPosition({ 
            x: (e.clientX - this.BCR.left) / this.BCR.width, 
            y: (e.clientY - this.BCR.top) / this.BCR.height, 
            obj: this.mouse 
        })
        this.formatPosition({ 
            x: (e.clientX - this.BCR.left) / this.BCR.width, 
            y: (e.clientY - this.BCR.top) / this.BCR.height, 
            obj: this.maskPosition 
        })
    }

    mouseleave() {}

    mousemove(e) {
        this.formatPosition({ 
            x: (e.clientX - this.BCR.left) / this.BCR.width, 
            y: (e.clientY - this.BCR.top) / this.BCR.height, 
            obj: this.mouse 
        })
        this.formatPosition({ 
            x: (e.clientX - this.BCR.left) / this.BCR.width, 
            y: (e.clientY - this.BCR.top) / this.BCR.height, 
            obj: this.maskPosition 
        })
    }

    formatPosition(pos) {
        pos.obj.x = pos.x
        pos.obj.y = pos.y
    }

    render(t) {
        this.raf = requestAnimationFrame(function (t) {
            return this.render(t);
        })

        if (this.isLoaded) {
            if (this.isRenderable) {
                this.settings.speed = (this.maskPosition.x - this.program.uniforms.maskPosition.value.x) / (t - this.now)

                if(this.settings.speed > 0.01) {
                    this.settings.speed = 0.01
                }
                if(this.settings.speed < -0.01) {
                    this.settings.speed = -0.01
                }
                
                // I THINK M() IS A LERP FUNCTION
                this.program.uniforms.maskPosition.value.x = lerp(this.program.uniforms.maskPosition.value.x, this.maskPosition.x, 0.085)
                this.program.uniforms.maskPosition.value.y = lerp(this.program.uniforms.maskPosition.value.y, this.maskPosition.y, 0.085)
                
                if(!isNaN(this.settings.speed)) {
                    this.program.uniforms.speed.value = lerp(this.program.uniforms.speed.value, this.settings.speed, 0.2)
                }
                
                if (this.$media instanceof HTMLVideoElement) {
                    if(this.$media.readyState >= this.$media.HAVE_ENOUGH_DATA) {
                        if(!this.texture.image) {
                            this.texture.image = this.$media
                            this.texture.needsUpdate = true
                        }
                    }
                } else if (this.$media instanceof HTMLImageElement) {
                    if(!this.texture.image) {
                        this.texture.image = this.$media
                        this.texture.needsUpdate = true
                    }
                }
                
                this.renderer.render({ scene: this.mesh, camera: this.camera })
            }
        }
            
        // not sure if this should come inside the if statement
        this.now = t
    }

    resize() {
        const bounds = this.el.getBoundingClientRect()

        if(!(this.BCR && this.BCR.top == bounds.top && this.BCR.height == bounds.height)) {
            this.BCR = bounds
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight
            this.renderer.setSize(this.BCR.width, this.BCR.height)
            this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height })
            this.updateSize()
        }
    }

    scroll() {
        const bounds = this.el.getBoundingClientRect()

        if(!(this.BCR && this.BCR.top == bounds.top && this.BCR.height == bounds.height)) {
            this.BCR = bounds
        }
    }

    addEventListeners() {
        this.scrollBind = this.scroll.bind(this)
        document.addEventListener("scroll", this.scrollBind)
        this.resizeBind = this.resize.bind(this)
        window.addEventListener("resize", this.resizeBind)
        this.mousemoveBind = this.mousemove.bind(this)
        window.addEventListener("mousemove", this.mousemoveBind)
    }

    removeEventListeners() {
        window.removeEventListener("resize", this.resizeBind)
        document.removeEventListener("scroll", this.scrollBind)
        window.addEventListener("mousemove", this.mousemoveBind)
    }

    destroy() {
        cancelAnimationFrame(this.raf)
        this.removeEventListeners()
    }
}