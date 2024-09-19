/**
 * Thinking like a computer with variables
 * Pippin Barr
 * 
 * A shape moves slowly across the screen
 */

"use strict";

// prevents making variables without using let

// We set the frame-rate with this
const rate = 2;
// if will not change, put it as constant

// The shade of the sky (starts out at night)
let skyShade = 0;
//DO NOT USE VAR INSTEAD OF LET!!

// Our turtle that will move across the canvas
let turtle = {
    // Position, will set in setup
    x: undefined,
    y: undefined,
    // How big is the turtle circle
    size: 50,
    // How many pixels it moves per frame
    speed: 10
};

/**
 * Create the canvas, set up the turtle's position
*/
function setup() {
    createCanvas(600, 600);

    // Set the framerate
    frameRate(rate);

    // Position the turtle at the bottom left
    turtle.x = 0;
    turtle.y = height;
    // if height of canvas changes, turtle height will also change
};

/**
 * Move and draw the turtle
*/
function draw() {
    // Make it lighter
    skyShade = skyShade + 10;
    // every frame adds 10

    // The sky
    background(skyShade);

    // Move the turtle
    turtle.x += turtle.speed;

    // Draw the turtle (it walks with its head inside its shell okay?)
    ellipse(turtle.x, turtle.y, turtle.size);
};