/**
 * Plain JS events
 * Nadia
 * 
 * event handling without p5
 */

"use strict";

//info abt bg fills
const bg = {
    fill: "black",
    fills: {
        black: "black",
        white: "white"
    }
}
/**
 * create canvas
*/
function setup() {
    createCanvas(400,400);

    window.addEventListener("keydown", changeBg);
}


/**
 * draws background
*/
function draw() {
    background(bg.fill);
}

function changeBg(){
    
}