/**
 * Nadia
 * Variable explanation
 * 
 * WTF is a variable and how to use it
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640, 480);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);

    //circle
    push();
    fill(mouseX, mouseY, 0);
    noStroke();
    ellipse(mouseX, mouseY, mouseX, mouseY);
    pop();
}