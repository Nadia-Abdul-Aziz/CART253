/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let back = {
    r: 160,
    g: 180,
    b: 200,
};
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225,
    }
};

let bird = {
    x: 0,
    y: 100,
    size: 10,
    speed: 0.25,
    fill: 'blue',
};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {

    // mr furious turning red
    mrFurious.fill.g += -1;
    mrFurious.fill.g = constrain(mrFurious.fill.g, 0, 255);
    mrFurious.fill.b += -1;
    mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255);

    // background turning to night
    back.r += -2;
    back.r = constrain(back.r, 0, 255);
    back.g += -2;
    back.g = constrain(back.g, 0, 255);
    back.b += -2;
    back.b = constrain(back.b, 0, 255);

    // move borb

    bird.x += 2
    bird.y += 1

    //harlem shake

    const x = mrFurious.x + random(-3, 3);
    const y = mrFurious.y + random(-3, 3);

    //shake more over time

    x = + random(-3, 3);
    y = + random(-3, 3);

    background(back.r, back.g, back.b);

    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(x, y, mrFurious.size);
    pop();

    // borb
    push();
    noStroke();
    fill(bird.fill);
    rect(bird.x, bird.y, bird.size);

}