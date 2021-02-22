// Mostly based from https://github.com/processing/p5.js/blob/master/src/math/p5.Vector.js

class Vector {
    constructor(pos = {}) {
        let { x, y, z } = pos;
        this.value = { x: x || 0, y: y || 0, z: z || 0 };
        return this;
    }

    set(vector) {
        let v = {};
        if (vector.value) v = vector.value;
        else v = vector;

        this.value.x = v.x || this.value.x;
        this.value.y = v.y || this.value.y;
        this.value.z = v.z || this.value.z;

        return this;
    }

    add(vector) {
        let v = {};
        if (vector.value) v = vector.value;
        else v = vector;

        this.value.x += v.x || 0;
        this.value.y += v.y || 0;
        this.value.z += v.z || 0;

        return this;
    }

    sub(vector) {
        let v = {};
        if (vector.value) v = vector.value;
        else v = vector;
        this.value.x -= v.x || 0;
        this.value.y -= v.y || 0;
        this.value.z -= v.z || 0;

        return this;
    }

    copy(v = this) {
        return new Vector({ ...v.value });
    }

    mag() {
        const x = this.value.x,
            y = this.value.y,
            z = this.value.z;
        const magSq = x * x + y * y + z * z;
        return Math.sqrt(magSq);
    };

    dist(v) {
        if (v.value) {
            return v
                .copy()
                .sub(this)
                .mag();
        }
        else {
            return new Vector(v).sub(this).mag();
        }
    }

    diff(v) {
        return this.copy().sub(v);
    }

    limit(max) {
        const mSq = this.magSq();
        if (mSq > max * max) {
            this.div(this, Math.sqrt(mSq)) //normalize it
                .mult(max);
        }
        return this;
    };

    magSq() {
        const x = this.value.x;
        const y = this.value.y;
        const z = this.value.z;
        return x * x + y * y + z * z;
    };

    setMag(n) {
        return this.normalize().mult(n);
    }

    normalize() {
        const len = this.mag();
        // here we multiply by the reciprocal instead of calling 'div()'
        // since div duplicates this zero check.
        if (len !== 0) this.mult(1 / len);
        return this;
    };

    mag(vecT = this) {
        const x = vecT.value.x,
            y = vecT.value.y,
            z = vecT.value.z;
        const magSq = x * x + y * y + z * z;
        return Math.sqrt(magSq);
    };

    mult(x, y, z) {
        if (arguments.length === 1) {
            this.value.x *= x;
            this.value.y *= x;
            this.value.z *= x;
        }
        if (arguments.length === 2) {
            this.value.x *= x;
            this.value.y *= y;
        }
        if (arguments.length === 3) {
            this.value.x *= x;
            this.value.y *= y;
            this.value.z *= z;
        }

        return this;
    };
}
