/**
 * Chain
 * Nadia Abdul Aziz
 * 
 * Attempt to draw chain from challenges
 */

"use strict";

/**
 * Draws canvas
*/
function setup() {
    createCanvas(800, 800);
}


/**
 * Draws ellipses of chain + borders
*/
function draw() {
    background(255, 255, 0);
    fill(51, 0);
    strokeWeight(40);
    ellipse(400, 0, 200, 300);
    ellipse(400, 200, 200, 300);
    ellipse(400, 400, 200, 300);
    ellipse(400, 600, 200, 300);
    ellipse(400, 800, 200, 300);
}