/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 225,
        g: 225,
        b: 225,
    }
};

let sky = {
    //color
    r: 160,
    g: 180,
    b: 200,
};

let borb = {
    x: 0,
    y: 0,
    size: 25,
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
    // Draw background
    sky.r = sky.r - 1;
    sky.g = sky.g - 1;
    sky.b = sky.b - 1;
    background(sky.r, sky.g, sky.b);

    // Draw Mr. Furious as a coloured circle
    furious();

    //Draw borb
    bird();
}

function furious() {
    push();
    noStroke();

    mrFurious.fill.g = mrFurious.fill.g - 1;
    mrFurious.fill.b = mrFurious.fill.b - 1;

    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);

    const x = mrFurious.x + random(-borb.x, borb.y);
    const y = mrFurious.y + random(-borb.x, borb.y);
    
    ellipse(x, y, mrFurious.size);

    pop();
}

function bird() {
    push();
    noStroke();
    fill('yellow');

    borb.x = borb.x + 1;
    borb.x = constrain(borb.x, 0, 150);
    borb.y = borb.y + 1;
    borb.y = constrain(borb.y, 0, 150);

    ellipse(borb.x, borb.y, borb.size);
    pop();
}