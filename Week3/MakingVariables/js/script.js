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
 * canvas
*/
function setup() {
    createCanvas(480, 480);
}


/**
 * CHEEEEEEEEEEEEEEEEEEEESE
*/
function draw() {
    background(backgroundColor);

    push();
    noStroke();
    fill(fillColor);
    ellipse(cheeseX, cheeseY, cheeseHole);
    pop();
}