/**
 * Drawing
 * Nadia Abdul Aziz
 * 
 * Practicing more functions within draw
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    colorMode(HSB);
    background(250, 100, 50);
    colorMode(RGB);

    push();
    fill(50, 0.0);
    stroke(255);
    ellipse(320, 320, 500);
    pop();

    push();
    fill('white');
    noStroke();
    ellipse(320, 320, 300);
    pop();

    push();
    fill(50, 0.0);
    colorMode(HSB);
    stroke(250, 100, 50);
    ellipse(320, 320, 200);
    pop()

    push();
    colorMode(HSB);
    fill(250, 100, 50);
    ellipse(320, 320, 100);
    pop();

    push();
    
    strokeWeight(2)
    pop();
}