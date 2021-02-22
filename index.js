let objects = [];
let renderer = new Renderer({
    pixelratio: 4,
    fps: 60,
    tick: (delta) => {
        for (let i = 0; i < objects.length; i++) {
            objects[i].tick(delta);
        }
    }
});

for (let i = 0; i < 10; i++) {
    objects.push(new Random(renderer));
}

renderer.loop();
