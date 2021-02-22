class Renderer {
    constructor(options) {
        this.options = Object.assign(this.default, options);
        this.last_delta = 0;
        this.dom();
        this.loop = this.loop.bind(this);
        this.options.fps_ms = 1e3 / this.options.fps;
        window.addEventListener('resize', () => {
            this.onWindowResize();
        }, false);
    }

    get default() {
        return {
            pixelratio: 1,
            fps: 60
        }
    }

    dom() {
        console.log(window.innerWidth);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.webgl = new THREE.WebGLRenderer({ antialias: this.options.pixelratio > 1 ? false : true });
        this.webgl.setSize(window.innerWidth / this.options.pixelratio, window.innerHeight / this.options.pixelratio, false);
        this.webgl.domElement.width = window.innerWidth / this.options.pixelratio;
        this.webgl.domElement.height = window.innerHeight / this.options.pixelratio;
        document.body.appendChild(this.webgl.domElement);

        this.world();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.webgl.setSize(window.innerWidth / this.options.pixelratio, window.innerHeight / this.options.pixelratio, false);
        this.webgl.domElement.width = window.innerWidth / this.options.pixelratio;
        this.webgl.domElement.height = window.innerHeight / this.options.pixelratio;
    }

    world() {
        this.scene.background = new THREE.Color(0xF8A5C2);
        const lights = [];
        lights[0] = new THREE.DirectionalLight(0xffffff, 2, 0);
        lights[1] = new THREE.DirectionalLight(0xffffff, 1, 0);
        lights[2] = new THREE.DirectionalLight(0xffffff, 1, 0);

        lights[0].position.set(10, 10, 10);
        lights[0].rotation.x = -45;
        lights[0].rotation.z = -45;
        lights[0].rotation.y = 60;

        // lights[1].position.set(100, 200, 100);
        // lights[2].position.set(-100, -200, -100);

        this.scene.add(lights[0]);
        // this.scene.add(lights[1]);
        // this.scene.add(lights[2]);
    }

    render(delta) {
        this.webgl.render(this.scene, this.camera);
        if (this.options.tick) this.options.tick(delta);
    }

    loop(delta = 0) {
        requestAnimationFrame(this.loop);
        let time_diff = (delta - this.last_delta);
        if (this.options.step) this.options.step(delta, time_diff);
        if (time_diff >= this.options.fps_ms) {
            this.render(delta);
            this.last_delta = delta;
        }
    }
}