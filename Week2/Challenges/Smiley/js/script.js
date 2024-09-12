/**
 * Smiley
 * Nadia Abdul Aziz
 * 
 * Attempt at making the smiley face from challenges
 */

"use strict";

/**
 * Draws canvas
*/
function setup() {
    createCanvas(800, 800);
}


/**
 * Draws ellipses for body and face + background
*/
function draw() {
    background(255, 255, 0);
    fill(51, 0);
    strokeWeight(20);
    ellipse(400, 400, 700, 700);

    fill('black');
    ellipse(300, 250, 50, 100);
    ellipse(500, 250, 50, 100);

    fill(51, 0)
    strokeWeight(20)
    arc(400, 400, 400, 400, 0, PI);
    //?????? DONT UNDERSTAND

}