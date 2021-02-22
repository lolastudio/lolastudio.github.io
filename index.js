let limit = 10;
let ratio = 4;
let fps = 60;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test((navigator || {}).userAgent)) {
    limit = 6;
    // ratio = 6;
    fps = 40;
}

let objects = [];
let renderer = new Renderer({
    pixelratio: ratio,
    fps: fps,
    tick: (delta) => {
        for (let i = 0; i < objects.length; i++) {
            objects[i].tick(delta);
        }
    }
});

for (let i = 0; i < limit; i++) {
    objects.push(new Random(renderer));
}

renderer.loop();
