class Physics {
    constructor(options, ) {
        this.options = Object.assign(this.default, options);
        this.vel = new Vector();
        this.acc = new Vector();
        this.pos = new Vector(this.options.position);
        this.dec = new Vector();
        this.fric = new Vector();
    }

    get default() {
        return {
            radius: 10,
            max_acc: {
                x: .5, y: .5, z: .5
            },
            max_vel: {
                x: .5, y: .5, z: .5
            },
            friction: {
                coeficient: 0.05
            },
            acceleration: {
                decay: .05
            },
            position: { x: 0, y: 0, z: 0 }
        }
    }

    set(key, value) {
        this.options[key] = value;
    }

    tick(ctx, canvas) {
        this.calculate();
    }

    applyForce(velocity = { x: 0, y: 0, z: 0 }, max = this.options.max_acc) {
        velocity = this.limit(velocity, max);
        this.acc.add(velocity);
    }

    calculate() {
        this.decay();
        let acc = this.limit(this.acc.value, this.options.max_acc);
        this.vel.add(acc);
        let vel = this.limit(this.vel.value, this.options.max_vel);
        vel = this.friction(vel);
        this.vel.set(vel);
        this.pos.add(vel);
    }

    decay() {
        this.dec.set(this.acc);
        this.dec.mult(-this.options.acceleration.decay);
        this.acc.add(this.dec);
        this.acc = new Vector(this.limit(this.acc.value, this.options.max_acc))
    }

    friction(vel) {
        this.fric.set(vel);
        this.fric.mult(-this.options.friction.coeficient);
        vel = new Vector(vel);
        vel.add(this.fric);
        return vel;
    }

    limit(obj, limit) {
        obj = Object.assign({ x: 0, y: 0, z: 0 }, obj);

        for (let axis in obj) {
            if (obj[axis] > limit[axis]) obj[axis] = limit[axis];
            if (obj[axis] < -limit[axis]) obj[axis] = -limit[axis];
        }

        return obj;
    }
}