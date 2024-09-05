/**
 * Git Workflow Example
 * Pippin Barr
 * 
 * Some sample code for playing with version control.
 * Draws a pyramid in the centre of the canvas and a
 * red circle at the user's mouse position.
 */

"use strict";

/**
 * Create a canvas, hides the cursor
*/
function setup() {
    // A 640x480 canvas
    createCanvas(800, 640);

    // Don't show the cursor
    noCursor();
}

/**
 * Draws a top-down view of a pyramid and also a red circle
 * at the position of the user's cursor
*/
function draw() {
    // Make the background Red (specified as RGB)
    background(0, 255, 200);

    // Draw a pyramid
    // How many levels for the pyramid
    const levels = 35;
    // Loop through every level (backwards)
    for (let level = levels; level > 0; level--) {
        // Draw this layer
        push();
        // Set the grey shade of the level based on its number
        // e.g. level 1 will get a shade of 255 (white), 
        // level 10 will be 10(dark grey)
        const shade = map(level, 1, levels, 10, 255);
        // No line around the levels
        noStroke();
        // Set the fill colour to our shade (RGB)
        fill(shade, 255, 200);
        // Draw rectangles from the centre
        rectMode(CENTER);
        // Draw the rectangle in the centre of the canvas
        // (400, 320) with a size based on the level
        // e.g. level 1 will be a 48x48 rectangle and
        // level 10 will be a 480x480 rectangle
        rect(400, 320, level * 30, level * 15);
        pop();
    }

    // Draw a red circle at the position of the mouse
    push();
    // No line around the shape
    noStroke();
    // Make it red (RGB)
    fill(0, 255, 200);
    // Draw a 100x100 circle at the mouse position
    ellipse(mouseX, mouseY, 200, 20);
    pop();
}