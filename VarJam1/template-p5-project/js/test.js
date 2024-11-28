function setup() {
    createCanvas(100, 100, WEBGL);

    describe('A white triangle spins around on a gray canvas.');
}

function draw() {
    background(200);

    // Rotate around the y-axis.
    rotateY(frameCount * 0.01);

    // Draw the triangle.
    triangle(-20, 25, 8, -30, 36, 25);
}