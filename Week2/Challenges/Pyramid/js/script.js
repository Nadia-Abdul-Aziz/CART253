/**
 * Pyramid
 * Nadia Abdul Aziz
 * 
 * Attempt at the pyramid from challenges
 */

"use strict";

/**
 * Draw canvas
*/
function setup() {
    createCanvas(800, 800);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(100, 200, 255);

    fill(255, 255, 0);
    noStroke();
    ellipse(600, 900, 800, 800);
    ellipse(100, 700, 800, 800);

    fill(100, 100, 50)
    triangle(400, 300, 200, 600, 500, 700);
    fill(50);
    triangle(400, 300, 500, 700, 550, 550);
}