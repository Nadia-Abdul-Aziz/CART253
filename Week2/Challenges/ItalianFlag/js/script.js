/**
 * Italian Flag
 * Nadia Abdul Aziz
 * 
 * An attempt to make the italian flag
 */

"use strict";

/**
 * Creates the canvas of the flag
*/
function setup() {
    createCanvas(800, 800);
}


/**
 * Draws background + rectangles for the italian flag + adds colors
*/
function draw() {
    background(100, 150, 255);
    fill(0, 255, 0);
    noStroke();
    rect(100, 200, 200, 400);
    noStroke();
    fill(255, 255, 255);
    rect(300, 200, 200, 400);
    fill(255, 0, 0);
    noStroke();
    rect(500, 200, 200, 400);
}