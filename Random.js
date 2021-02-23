class Random {
    constructor(renderer) {
        let types = [THREE.BoxGeometry, THREE.ConeGeometry, THREE.CylinderGeometry, THREE.DodecahedronGeometry, THREE.IcosahedronGeometry, THREE.OctahedronGeometry, THREE.SphereGeometry, THREE.TetrahedronGeometry, THREE.TorusKnotGeometry]
        this.geometry = new types[Math.floor(types.length * Math.random())];

        const colors = new Uint8Array(3);        
        for (let c = 0; c <= colors.length; c++) {
            colors[c] = (c / colors.length) * 256;
        }
        colors[0] = 90;
        colors[1] = 120;
        colors[2] = 140;
        console.log(colors);

        this.gradientMap = new THREE.DataTexture(colors, colors.length, 1, THREE.LuminanceFormat);
        this.gradientMap.minFilter = THREE.NearestFilter;
        this.gradientMap.magFilter = THREE.NearestFilter;
        this.gradientMap.generateMipmaps = false;

        this.material = new THREE.MeshToonMaterial({
            color: this.randomColor(),
            // wireframe: true,
            wireframeLinejoin: 'miter',
            gradientMap: this.gradientMap
        });

        
        this.object = new THREE.Mesh(this.geometry, this.material);
        this.setScale();
        this.position = new Physics({ 
            position: this.randomPosition(),
            acceleration: {
                decay: .1
            },
            max_vel: {
                x: .01, y: .01, z: .01
            }
        });

        this.object.material.transparent = true;
        this.direction = { x: Math.random() - .5, y: Math.random() - .5 };
        this.speed = .001 * Math.random();
        this.time = 0;

        this.frustum = new THREE.Frustum();
        this.cameraViewProjectionMatrix = new THREE.Matrix4();
        this.renderer = renderer;

        renderer.scene.add(this.object);
    }

    setScale() {
        let scale = (Math.random() * ((window.innerWidth / window.innerHeight) / 2));
        if (scale < .5) scale = .5;
        this.object.scale.set(scale, scale, scale);
    }

    tick(delta) {
        this.object.rotation.y += this.speed * 20;
        this.object.rotation.x += this.speed * 20;
        this.object.material.opacity < 1 ? this.object.material.opacity += .025 : null;

        this.position.applyForce({ x: this.direction.x / 10e3, y: this.direction.y / 10e3 });
        this.position.tick();
        this.object.position.x = this.position.pos.value.x;
        this.object.position.y = this.position.pos.value.y;
        this.object.position.z = this.position.pos.value.z;

        this.cameraViewProjectionMatrix.multiplyMatrices(this.renderer.camera.projectionMatrix, this.renderer.camera.matrixWorldInverse);
        this.frustum.setFromProjectionMatrix(this.cameraViewProjectionMatrix);
        if (this.frustum.intersectsObject(this.object) === false) {
            this.position = new Physics({ position: this.randomPosition() });
            this.direction = { x: Math.random() - .5, y: Math.random() - .5 };
            this.object.position.x = this.position.pos.value.x;
            this.object.position.y = this.position.pos.value.y;
            this.object.position.z = this.position.pos.value.z;
            
            this.setScale();
            this.speed = .001 * Math.random();

            // console.log(5 - this.position.pos.value.z, this.position.pos.value.z);
            this.material = new THREE.MeshToonMaterial({
                color: this.randomColor(),
                // wireframe: true,
                wireframeLinejoin: 'miter',
                gradientMap: this.gradientMap
            });
            this.object.material = this.material;

            this.object.material.transparent = true;
            this.object.material.opacity = 0;
        }
    }

    randomPosition() {
        let ratio = (window.innerWidth / window.innerHeight);
        return { x: (Math.random() - .5) * ratio * 10, y: (Math.random() - .5) * ratio * 10, z: (Math.random() - .5) * ratio * 10 };
    }

    randomColor() {
        const colors = ['#efc967', '#dd523c', '#deb45f', '#7500f9', '#29abe2', '#73b24f', '#2d3436'];
        return colors[Math.floor(colors.length * Math.random())];
    }
}