/**
 * movement
 * nadia
 * 
 * how stuff moves
 */

"use strict";

let bird = {
    x: 120,
    y: 480,
    size: 50,
    velocity: {
        x: 0,
        y: 0,
    },
    minVelocity: {
        x: -3,
        y: -2,
    },
    maxVelocity: {
        x: 3,
        y: 2,
    },
    accel: {
        x: 0.025,
        y: -0.05,
    },
};



/**
 * canvas
*/
function setup() {
    createCanvas(640, 480)
}


/**
 * borb flying
*/
function draw() {
    background('black');

    // speed limit

    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);

    // acceleration 

    bird.velocity.x += + bird.accel.x;
    bird.velocity.y += + bird.accel.y;

    // move bird
    bird.x += + bird.velocity.x;
    bird.y += + bird.velocity.y;

    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(bird.x, bird.y, bird.size);
    pop();
}