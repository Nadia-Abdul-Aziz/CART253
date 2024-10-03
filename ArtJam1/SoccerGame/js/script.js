/**
 * SoccerGame
 * Nadia Abdul Aziz
 * 
 * Tentative soccer type game
 */

"use strict";

/** Loading ball image
 *  Consulted p5.js documentation: https://p5js.org/reference/p5/preload/
*/
//function preload() {
//img = loadImage('/assets/ball.png');
//}

/**
 * Creates Canvas & dictates rectangle mode
*/
function setup() {
    createCanvas(900, 650);
    rectMode(CENTER);
    imageMode(CENTER);
}

/**
 * Creates the background visuals, paddle, goal and ball
*/

let ball = {
    ballXPosition: 450,
    ballYPosition: 325,
    ballSpeed: 2,
    ballDirX: 3,
    ballDirY: -1,
};

function draw() {
    drawGrass();
    drawPaddle();
    drawBall();

    //collision of ball with field edge
    if (ball.ballXPosition >= width - 20) {
        ball.ballDirX = ball.ballDirX * -1 //Direction changes in X
    }

    if (ball.ballXPosition <= 20) {
        ball.ballDirX = ball.ballDirX * -1 // Direction change but the other side of the field
    }

    if (ball.ballYPosition <= 20) {
        ball.ballDirY = ball.ballDirY * -1 //direction change in Y
    }
    //Paddle collision with ball (Is this the right way to do this?????)
};

function drawBall() {
    push();
    noStroke();

    // Move in X dir
    ball.ballXPosition += (ball.ballDirX * ball.ballSpeed);
    // Move in Y dir
    ball.ballYPosition += (ball.ballDirY * ball.ballSpeed);

    ellipse(ball.ballXPosition, ball.ballYPosition, 30);
    pop();
}

function drawPaddle() {
    push();
    noStroke();
    let paddle = {
        x: mouseX,
        sizeX: 100,
        sizeY: 20,
    }


    paddle.x = constrain(paddle.x, 60, 840);
    rect(paddle.x, height - 20, paddle.sizeX, paddle.sizeY);
    pop();
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
};


