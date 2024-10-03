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
    },
    switchKey: 32
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
//switches background from black to white
function changeBg(event){
    if (event.keyCode === bg.switchKey) {
    if (bg.fill === bg.fills.black) {
        bg.fill = bg.fills.white;
    }
    else {
        bg.fill = bg.fills.black;
    }
}
}