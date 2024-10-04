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

//Loading ball
//function preload() {
//img = loadImage('/assets/ball.png');
//}

// Soccer Ball Variables
let ball = {
    ballXPosition: 450,
    ballYPosition: 325,
    ballSpeed: 4,
    ballDirX: 1,
    ballDirY: 2,
};

//Paddle Variables
let paddle = {
    x: undefined,
    y: undefined,
    sizeX: 100,
    sizeY: 20,
}

/** Creates Canvas & dictates rectangle mode, defining paddle.y */

function setup() {
    createCanvas(900, 650);
    rectMode(CENTER);
    imageMode(CENTER);

    paddle.y = height - 20;
}


/** Creates the background visuals, paddle, goal and ball */

function draw() {
    drawGrass();
    drawPaddle();
    drawBall();
    collisions();
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
    paddle.x = constrain(mouseX, 60, 840);
    rect(paddle.x, paddle.y, paddle.sizeX, paddle.sizeY);
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
    push();
    colorMode(HSB)
    let bgColor = {
        h: 150,
        s: 100,
        b: map(paddle.x, 60, 840, 50, 30),
    };

    background(bgColor.h, bgColor.s, bgColor.b);
    pop();
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

function collisions() {

    //collision of ball with field edge
    if (ball.ballXPosition >= width - 20) {
        ball.ballDirX = ball.ballDirX * -1 //Direction changes in X on the right side of the field
    }

    if (ball.ballXPosition <= 20) {
        ball.ballDirX = ball.ballDirX * -1 // Direction change but the left side of the field
    }

    //collision of ball against top edge (not goal)
    if (ball.ballYPosition <= 20) {
        ball.ballDirY = ball.ballDirY * -1 //Direction change downwards
    }
    //collision of ball against paddle (Used tutorial as reference with a lot of tweaks??? It works???? Kinda???)
    if (ball.ballYPosition + 10 >= paddle.y && ball.ballXPosition >= paddle.x - paddle.sizeX / 2 && ball.ballXPosition <= paddle.x + paddle.sizeX / 2) {
        ball.ballDirY = ball.ballDirY * -1; // Reverse the Y direction when the ball hits the paddle
    }
};


