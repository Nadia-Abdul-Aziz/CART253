/**
 * SoccerGame
 * Nadia Abdul Aziz
 * 
 * Tentative soccer type game
 */

"use strict";

/**
 * Creates Canvas & dictates rectangle mode
*/
function setup() {
    createCanvas(900, 650);
    rectMode(CENTER);
}

/**
 * Creates the background visuals, paddle, goal and ball
*/
function draw() {
    drawGrass();
}


//////////ALL FUNCTIONS FOR THE BACKGROUND FIELD

//Draws full field of grass
function drawGrass() {
    drawBg();
    drawLine();
};

//Draws background
function drawBg() {
    const back = "green";
    background(back);
};

//Draws field lines
function drawLine() {

    push();
    stroke(255, 255, 255);
    strokeWeight(5);
    fill(50, 0);

    drawMiddleArc();
    drawFrame();
    drawGoalOutline();

    pop();
};

function drawFrame() {
    //Frame outline
    rect(width / 2, height / 2, width - 20, height - 20);
};

function drawMiddleArc() {
    //Middle of the field circle
    const arcSizeX = 200;
    const arcSizeY = 200;
    arc(width / 2, height - 15, arcSizeX, arcSizeY, PI, TWO_PI);
};

function drawGoalOutline() {
    //Goal outline
    const rectPositionY = 85;
    const rectWidth = 400;
    const rectHeight = 150;
    rect(width / 2, rectPositionY, rectWidth, rectHeight);

    //Penalty arc
    const penaltyPositionY = rectPositionY + rectHeight / 2;
    const penaltySizeX = 200;
    const penaltySizeY = 200;
    arc(width / 2, penaltyPositionY, penaltySizeX, penaltySizeY, 0, PI);
    pop();
};


