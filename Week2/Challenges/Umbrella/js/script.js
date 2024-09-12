/**
 * Umbrella
 * Nadia Abdul Aziz
 * 
 * Attempt at the umbrella from challenges
 */

"use strict";

/**
 * Draws canvas
*/
function setup() {
    createCanvas(800, 800);
}


/**
 * Draws the umbrella, handle and stem
*/
function draw() {
    background(255, 0, 0);

    fill(0, 0, 255);
    noStroke();
    ellipse(400, 400, 600, 600);

    fill(255, 0, 0);
    ellipse(200, 400, 200, 200);
    ellipse(400, 400, 200, 200);
    ellipse(600, 400, 200, 200);

    arc(400, 400, 602, 602, 0, PI);

    strokeWeight(20);
    stroke('black');
    line(400, 300, 400, 600);

    stroke(255, 255, 0);
    arc(450, 600, 100, 200, 0, PI);
}