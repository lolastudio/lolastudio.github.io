let bounds;
fit();

const positions = [];
const heights = {};
let row = 0;
let per_row = 3;
let h_offset = 40;
let w_offset = 100;
function onload(img) {
    setTimeout(() => {
        if (positions[row] && positions[row].length >= per_row) { row++; }
        if (!positions[row]) { positions.push([]) }
        img.width = Math.floor((bounds.width - w_offset) / 3.5);
        img.classList.add('__active');
        randomRotation(img);

        let pos = positions[row].push(img);
        if (row === 0 && pos === 2) {
            positions[row][pos - 1] = null;
            pos = positions[row].push(img)
            console.log(positions);
        }

        let left = w_offset + ((pos - 1) * Math.floor(bounds.width * .3));
        img.style.left = `${left}px`;
        let top_offset = (heights[row - 1] || 0) + h_offset;
        if (row === 0) top_offset += window.innerHeight / 4;

        if (!heights[row] || top_offset + img.height > heights[row]) heights[row] = top_offset + img.height;
        img.style.top = `${top_offset + (Math.random() * heights[row] / 4)}px`;
        img.animate = true;
        img.addEventListener('mousedown', evt => { evt.preventDefault(); onImageDown(evt, img) });
        img.addEventListener('mousemove', evt => { evt.preventDefault(); });
        img.addEventListener('mouseup', evt => { evt.preventDefault(); onImageUp(evt, img) });
    }, 0)
}

let class_timeout;
function onImageDown(evt, img) {
    clearTimeout(class_timeout);
    img.dragging = true;
    img.classList.add('ease');
    document.last_dragged = img;
}

function onImageUp(evt, img) {
    img.dragging = false;
    class_timeout = setTimeout(() => {
        img.classList.remove('ease');
    }, 250);
}

function fit() {
    bounds = document.body.getBoundingClientRect();
    document.querySelector('.js-bg').style.height = `${bounds.height}px`;
}

let max_rotation = 20;
function randomRotation(img) {
    let rand = Math.random();
    let rotation = rand < .4 ? 1 : -1 * (rand * max_rotation);
    img.style.transform = `rotateZ(${rotation}deg)`
    img.rotation = rotation;
}

document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    document.last_event = event;
}

document.onmouseup = () => {
    document.last_dragged.dragging = false;
    class_timeout = setTimeout(() => {
        document.classList.remove('ease');
    }, 250);
}

let images = Array.from(document.querySelectorAll('.js-bg img'));
images.sort((a, b) => {
    return Math.sin(Math.random()) - Math.cos(Math.random());
})

for (let i = 0; i < images.length; i++) {
    if (images[i].complete) {
        onload(images[i])
    }
    else {
        images[i].onload = () => {
            onload(images[i])
        }
    }
}

function animate() {
    window.requestAnimationFrame(delta => {
        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.animate && !img.dragging) {
                if (!img.direction) { images[i].direction = { x: Math.random(), y: Math.random(), force: Math.random() } }

                let left = +(img.style.left.split('px').join(''));
                left += Math.sin(delta / (2000 * img.direction.force)) * img.direction.x / 4;
                img.style.left = `${left}px`;

                let top = +(img.style.top.split('px').join(''));
                top += Math.cos(delta / (1000 * img.direction.force)) * img.direction.y / 4;
                img.style.top = `${top}px`;

                img.rotation += Math.sin(delta / (2000 * img.direction.force)) / 20;
                img.style.transform = `rotateZ(${img.rotation}deg)`
            }

            if (img.dragging) {
                console.log(document.last_event.pageX)
                img.style.left = `${document.last_event.pageX - (img.width / 2)}px`;
                img.style.top = `${document.last_event.pageY - (img.height / 2)}px`;
            }
        }
        animate();
    });
}

animate();