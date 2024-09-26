/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/

let back = {
    colorOff: "black",
    colorOn: "grey",
}

let light = {
    onFill: "yellow",
    offFill: "grey",
}

const rectangle = {
    l: 200,
    w: 50,
    x: width / 2,
    y: length / 4,
}

function setup() {
    createCanvas(400, 400);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    drawBg()
    drawLight();
    drawLamp();
}

//draws background 
// changes color based on whether light is on or off
function drawBg() {
    background(back.colorOff);
};

function drawLight() {
    push();
    fill(light.offFill);
    ellipse(width / 2, height / 2, 100);
    pop();
}
function drawLight() {
    push();
    fill("white");
    rect(rectangle.x, rectangle.y, rectangle.l, rectangle.w)
    pop();
}