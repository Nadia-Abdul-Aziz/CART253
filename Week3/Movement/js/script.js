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
};

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640, 480)
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background('black');

    // move bird
    bird.x = bird.x + 1;
    bird.y = bird.y - 2;

    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(bird.x, bird.y, bird.size);
    pop();
}