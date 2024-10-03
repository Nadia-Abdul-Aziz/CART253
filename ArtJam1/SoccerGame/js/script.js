/**
 * SoccerGame
 * Nadia Abdul Aziz
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/


function setup() {
    createCanvas(900, 650);
    rectMode(CENTER);
}
/**
 * 
*/

function draw() {
    drawGrass();

    push();
    stroke(255, 255, 255);
    strokeWeight(5);
    fill(50, 0);

    //Frame outline
    rect(width / 2, height / 2, width - 20, height - 20);

    //Middle of the field circle
    const arcSizeX = 200;
    const arcSizeY = 200;
    arc(width / 2, height - 15, arcSizeX, arcSizeY, PI, TWO_PI);

    //Goal outline
    const rectPositionY = 85;
    const rectWidth = 400;
    const rectHeight = 150;
    push();
    fill("green");
    rect(width / 2, rectPositionY, rectWidth, rectHeight);
    pop();

    //Penalty arc
    const penaltyPositionY = rectPositionY + rectHeight / 2;
    const penaltySizeX = 200;
    const penaltySizeY = 200;
    arc(width / 2, penaltyPositionY, penaltySizeX, penaltySizeY, 0, PI);
    pop();
}


//Draws full field of grass
function drawGrass() {
    drawBg();
};

function drawLine() {

};

//Draws background
function drawBg() {
    const back = "green";
    background(back);
};
