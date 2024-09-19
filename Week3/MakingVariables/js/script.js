/**
 * Variables
 * Nadia
 * 
 * Making these things
 */

"use strict";

//variables

let cheeseHole = 100

let cheeseX = 400

let cheeseY = 100

let fillColor = 'black'

let backgroundColor = 'yellow'


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(480, 480);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(backgroundColor);

    push();
    noStroke();
    fill(fillColor);
    ellipse(cheeseX, cheeseY, cheeseHole);
    pop();
}